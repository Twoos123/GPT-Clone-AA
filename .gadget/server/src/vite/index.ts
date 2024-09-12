import { getHtmlTags, getViteConfig } from "./helpers";
import { GadgetPluginOptions } from "./types";

/**
 * Vite plugin that is used to configure the Vite build process for the Gadget application.
 */
export const gadget = (options?: GadgetPluginOptions) => {
  return {
    name: "gadget-vite-plugin",
    config: async (config: any, env: any) => {
      return await getViteConfig(config, env, {
        plugin: options,
        params: {
          assetsBucketDomain: "app-assets.gadget.dev",
          applicationId: "163232",
          productionEnvironmentId: "326843",
          developmentEnvironmentVariables: {"GADGET_APP":"aa-gpt-clone","GADGET_ENV":"development","GADGET_PUBLIC_APP_SLUG":"aa-gpt-clone","GADGET_PUBLIC_APP_ENV":"development"},
          productionEnvironmentVariables: {"GADGET_APP":"aa-gpt-clone","GADGET_ENV":"production","GADGET_PUBLIC_APP_SLUG":"aa-gpt-clone","GADGET_PUBLIC_APP_ENV":"production"},
        },
      });
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html: string, { server }: any) => {
        const tags = getHtmlTags({
          hasAppBridgeV4: false,
          hasBigCommerceConnection: false,
          assetsDomain: "assets.gadget.dev"
        }, !!server);

        return tags;
      }
    }
  } as any;
}
