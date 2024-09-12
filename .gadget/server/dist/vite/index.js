"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var vite_exports = {};
__export(vite_exports, {
  gadget: () => gadget
});
module.exports = __toCommonJS(vite_exports);
var import_helpers = require("./helpers");
const gadget = (options) => {
  return {
    name: "gadget-vite-plugin",
    config: async (config, env) => {
      return await (0, import_helpers.getViteConfig)(config, env, {
        plugin: options,
        params: {
          assetsBucketDomain: "app-assets.gadget.dev",
          applicationId: "163232",
          productionEnvironmentId: "326843",
          developmentEnvironmentVariables: { "GADGET_APP": "aa-gpt-clone", "GADGET_ENV": "development", "GADGET_PUBLIC_APP_SLUG": "aa-gpt-clone", "GADGET_PUBLIC_APP_ENV": "development" },
          productionEnvironmentVariables: { "GADGET_APP": "aa-gpt-clone", "GADGET_ENV": "production", "GADGET_PUBLIC_APP_SLUG": "aa-gpt-clone", "GADGET_PUBLIC_APP_ENV": "production" }
        }
      });
    },
    transformIndexHtml: {
      order: "pre",
      handler: (html, { server }) => {
        const tags = (0, import_helpers.getHtmlTags)({
          hasAppBridgeV4: false,
          hasBigCommerceConnection: false,
          assetsDomain: "assets.gadget.dev"
        }, !!server);
        return tags;
      }
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  gadget
});
//# sourceMappingURL=index.js.map
