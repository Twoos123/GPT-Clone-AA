import fs from "fs/promises";
import path from "path";
import { remixViteOptions } from "../remix";
import type { GadgetPluginOptions } from "./types";
import { getInternalFrontendConfig } from "./utils";

export enum FrontendType {
  Remix = "remix",
  Vite = "vite",
}

export const frontendTypeIndicatorFilePath = ".gadget/FRONTEND_TYPE";

const maybeGetPluginByName = (name: string, plugin: any) => {
  if (plugin && "name" in plugin && plugin.name === name) {
    return plugin;
  }
};

export const getFrontendTypeByPluginsUsed = (config: Record<string, any>): FrontendType => {
  let type = FrontendType.Vite;

  /**
   * Check if the vite config has a remix plugin.
   *
   * We need to find several remix-related plugins because the `remix()` plugin has a list of plugins registered, and Vite will recursively resolve the plugins.
   * So, when Vite resolves the config, the `config.plugins` array value changes.
   *
   * For example, the vite config has two plugins: `[gadget(), remix()]`. When Vite runs dev/build command, this `getFrontendTypeByPluginsUsed()` function is actually called more than once.
   *
   * In the first call, the `config.plugins` array value is `[{name: "gadget-vite-plugin", ... }, {name: "remix", ... }]`. The "remix" plugin name is the `remix()` plugin.
   * However, in a second call, the `config.plugins` array value is `[{name: "gadget-vite-plugin", ... }, {name: "remix-virtual-modules", ... }, {name: "remix-hmr-runtime", ... }]`. They are all from the `remix()` plugin, and the "remix" plugin name is no longer in the array.
   */
  const hasRemixPlugin = config.plugins?.some((pluginOptions: any) => {
    if (Array.isArray(pluginOptions)) {
      return pluginOptions.some((plugin) => maybeGetPluginByName("remix", plugin));
    } else {
      return !!maybeGetPluginByName("remix-virtual-modules", pluginOptions);
    }
  });

  if (hasRemixPlugin) {
    type = FrontendType.Remix;
  }

  return type;
};

export const doesViteConfigHasGadgetPlugin = (config: Record<string, any>): boolean => {
  return (
    config.plugins?.some((plugin: any) => {
      return !!maybeGetPluginByName("gadget-vite-plugin", plugin);
    }) ?? false
  );
};

export const getViteConfig = async (
  config: any,
  { command, mode, isSsrBuild }: { command: "serve" | "build"; mode: "development" | "production"; isSsrBuild?: boolean },
  options: {
    plugin?: GadgetPluginOptions;
    params: {
      assetsBucketDomain: string;
      applicationId: string;
      productionEnvironmentId: string;
      developmentEnvironmentVariables: Record<string, string>;
      productionEnvironmentVariables: Record<string, string>;
    };
  }
): Promise<void> => {
  const { assetsBucketDomain, applicationId, productionEnvironmentId } = options.params;

  const type = getFrontendTypeByPluginsUsed(config);
  const frontendConfig = getInternalFrontendConfig(type);

  config.envPrefix = VITE_PUBLIC_ENV_PREFIXES;

  config.build = {
    ...config.build,
    manifest: true,
  };

  // in ssr mode use the real process.env
  if (!isSsrBuild) {
    // set up the defines for our process.env.WHATEVER polyfill (which vite doesn't do on its own)
    const vars = mode === "development" ? options.params.developmentEnvironmentVariables : options.params.productionEnvironmentVariables;
    // merge the decided-upon vars into process.env so vite will use them for `import.meta.env`
    for (const [key, value] of Object.entries(vars)) {
      process.env[key] = value;
    }

    config.define = { ...buildDefinesMap(vars, mode), ...config.define };
  }

  switch (type) {
    case FrontendType.Vite:
      config.build = {
        ...config.build,
        outDir: "./.gadget/vite-dist",
        emptyOutDir: true,
      };
      break;

    default:
      break;
  }

  if (command === "build") {
    await fs.mkdir(".gadget", { recursive: true });
    await fs.writeFile(frontendTypeIndicatorFilePath, type);

    // Serve the assets from the Gadget CDN in production
    config.base = frontendConfig.productionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId);

    // Remix doesn't include the trailing slash in the base URL when building, so we need to add it manually
    if (type === FrontendType.Remix) {
      const parentDirectory = path.join(remixViteOptions.buildDirectory, "..");
      await fs.mkdir(parentDirectory, { recursive: true });
      await fs.writeFile(path.join(parentDirectory, "package.json"), `{"type": "module"}`);
    }
  }
};

interface HtmlTagDescriptor {
  tag: string;
  attrs: Record<string, string | boolean>;
  children?: string;
}

export const getHtmlTags = (
  options: {
    hasAppBridgeV4: boolean;
    hasBigCommerceConnection: boolean;
    assetsDomain: string;
  },
  devMode: boolean
): HtmlTagDescriptor[] => {
  const tags: HtmlTagDescriptor[] = [];

  if (options.hasAppBridgeV4) {
    tags.push({
      tag: "script",
      attrs: {
        src: `https://cdn.shopify.com/shopifycloud/app-bridge.js`,
        "data-api-key": "%SHOPIFY_API_KEY%",
      },
    });
  }

  if (options.hasBigCommerceConnection) {
    tags.push({
      tag: "script",
      attrs: {
        src: `https://cdn.bigcommerce.com/jssdk/bc-sdk.js`,
      },
    });
  }

  if (devMode) {
    tags.push({
      tag: "script",
      attrs: { type: "module" },
      children: `
        if (import.meta.hot) {
          import.meta.hot.on("gadget:viteError", (data) => {
            const event = new CustomEvent("gadget:viteError", {
              detail: data,
            });
            window.dispatchEvent(event);
          });
        }
      `,
    });

    tags.push({
      tag: "script",
      attrs: {
        async: true,
        crossorigin: true,
        src: `https://${options.assetsDomain}/assets/devHarness.min.js`,
      },
    });
  }

  return tags;
};

/** Given a list of environment variables, set up the defines for Vite to replace process.env.FOO with these valuies */
export const buildDefinesMap = (env: Record<string, string | undefined>, mode: "development" | "production"): Record<string, string> => {
  const defines: Record<string, string> = {
    // this one pesky env var changes based on the requester at runtime, so we can't define it statically at build time. we rely on it being injected into the global scope by the serving layer. it is important that this more specific define is before the catch-all process.env define below
    "process.env.GADGET_PUBLIC_SHOPIFY_APP_URL": "globalThis.gadgetPublicShopifyAppUrl",
  };

  // add specific define replacements for env vars that might be used at build time so that we don't interpolate the large env object for every reference every time and bloat the bundle size
  for (const [key, value] of Object.entries(env)) {
    if (value) {
      defines[`process.env.${key}`] = JSON.stringify(value);
    }
  }

  // to support square bracket syntax or Object.keys or what have you in production mode, we also define the whole object this way
  // we do not need to do this in development mode because vite will define process.env as a global variable that we can access as any other object
  if (mode === "production") {
    defines["process.env"] = JSON.stringify(env);
  }

  return defines;
};

export const VITE_PUBLIC_ENV_PREFIXES: string[] = ["GADGET_PUBLIC_", "VITE_", "GADGET_APP", "GADGET_ENV"];
