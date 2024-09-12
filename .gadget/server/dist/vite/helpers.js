"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var helpers_exports = {};
__export(helpers_exports, {
  FrontendType: () => FrontendType,
  VITE_PUBLIC_ENV_PREFIXES: () => VITE_PUBLIC_ENV_PREFIXES,
  buildDefinesMap: () => buildDefinesMap,
  doesViteConfigHasGadgetPlugin: () => doesViteConfigHasGadgetPlugin,
  frontendTypeIndicatorFilePath: () => frontendTypeIndicatorFilePath,
  getFrontendTypeByPluginsUsed: () => getFrontendTypeByPluginsUsed,
  getHtmlTags: () => getHtmlTags,
  getViteConfig: () => getViteConfig
});
module.exports = __toCommonJS(helpers_exports);
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_remix = require("../remix");
var import_utils = require("./utils");
var FrontendType = /* @__PURE__ */ ((FrontendType2) => {
  FrontendType2["Remix"] = "remix";
  FrontendType2["Vite"] = "vite";
  return FrontendType2;
})(FrontendType || {});
const frontendTypeIndicatorFilePath = ".gadget/FRONTEND_TYPE";
const maybeGetPluginByName = (name, plugin) => {
  if (plugin && "name" in plugin && plugin.name === name) {
    return plugin;
  }
};
const getFrontendTypeByPluginsUsed = (config) => {
  let type = "vite" /* Vite */;
  const hasRemixPlugin = config.plugins?.some((pluginOptions) => {
    if (Array.isArray(pluginOptions)) {
      return pluginOptions.some((plugin) => maybeGetPluginByName("remix", plugin));
    } else {
      return !!maybeGetPluginByName("remix-virtual-modules", pluginOptions);
    }
  });
  if (hasRemixPlugin) {
    type = "remix" /* Remix */;
  }
  return type;
};
const doesViteConfigHasGadgetPlugin = (config) => {
  return config.plugins?.some((plugin) => {
    return !!maybeGetPluginByName("gadget-vite-plugin", plugin);
  }) ?? false;
};
const getViteConfig = async (config, { command, mode, isSsrBuild }, options) => {
  const { assetsBucketDomain, applicationId, productionEnvironmentId } = options.params;
  const type = getFrontendTypeByPluginsUsed(config);
  const frontendConfig = (0, import_utils.getInternalFrontendConfig)(type);
  config.envPrefix = VITE_PUBLIC_ENV_PREFIXES;
  config.build = {
    ...config.build,
    manifest: true
  };
  if (!isSsrBuild) {
    const vars = mode === "development" ? options.params.developmentEnvironmentVariables : options.params.productionEnvironmentVariables;
    for (const [key, value] of Object.entries(vars)) {
      process.env[key] = value;
    }
    config.define = { ...buildDefinesMap(vars, mode), ...config.define };
  }
  switch (type) {
    case "vite" /* Vite */:
      config.build = {
        ...config.build,
        outDir: "./.gadget/vite-dist",
        emptyOutDir: true
      };
      break;
    default:
      break;
  }
  if (command === "build") {
    await import_promises.default.mkdir(".gadget", { recursive: true });
    await import_promises.default.writeFile(frontendTypeIndicatorFilePath, type);
    config.base = frontendConfig.productionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId);
    if (type === "remix" /* Remix */) {
      const parentDirectory = import_path.default.join(import_remix.remixViteOptions.buildDirectory, "..");
      await import_promises.default.mkdir(parentDirectory, { recursive: true });
      await import_promises.default.writeFile(import_path.default.join(parentDirectory, "package.json"), `{"type": "module"}`);
    }
  }
};
const getHtmlTags = (options, devMode) => {
  const tags = [];
  if (options.hasAppBridgeV4) {
    tags.push({
      tag: "script",
      attrs: {
        src: `https://cdn.shopify.com/shopifycloud/app-bridge.js`,
        "data-api-key": "%SHOPIFY_API_KEY%"
      }
    });
  }
  if (options.hasBigCommerceConnection) {
    tags.push({
      tag: "script",
      attrs: {
        src: `https://cdn.bigcommerce.com/jssdk/bc-sdk.js`
      }
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
      `
    });
    tags.push({
      tag: "script",
      attrs: {
        async: true,
        crossorigin: true,
        src: `https://${options.assetsDomain}/assets/devHarness.min.js`
      }
    });
  }
  return tags;
};
const buildDefinesMap = (env, mode) => {
  const defines = {
    // this one pesky env var changes based on the requester at runtime, so we can't define it statically at build time. we rely on it being injected into the global scope by the serving layer. it is important that this more specific define is before the catch-all process.env define below
    "process.env.GADGET_PUBLIC_SHOPIFY_APP_URL": "globalThis.gadgetPublicShopifyAppUrl"
  };
  for (const [key, value] of Object.entries(env)) {
    if (value) {
      defines[`process.env.${key}`] = JSON.stringify(value);
    }
  }
  if (mode === "production") {
    defines["process.env"] = JSON.stringify(env);
  }
  return defines;
};
const VITE_PUBLIC_ENV_PREFIXES = ["GADGET_PUBLIC_", "VITE_", "GADGET_APP", "GADGET_ENV"];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FrontendType,
  VITE_PUBLIC_ENV_PREFIXES,
  buildDefinesMap,
  doesViteConfigHasGadgetPlugin,
  frontendTypeIndicatorFilePath,
  getFrontendTypeByPluginsUsed,
  getHtmlTags,
  getViteConfig
});
//# sourceMappingURL=helpers.js.map
