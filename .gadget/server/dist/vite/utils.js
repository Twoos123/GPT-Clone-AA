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
var utils_exports = {};
__export(utils_exports, {
  BaseRemixFrontendConfig: () => BaseRemixFrontendConfig,
  BaseViteFrontendConfig: () => BaseViteFrontendConfig,
  getFrontendType: () => getFrontendType,
  getInternalFrontendConfig: () => getInternalFrontendConfig
});
module.exports = __toCommonJS(utils_exports);
var import_remix = require("../remix");
var import_helpers = require("./helpers");
const getDefaultProductionBaseUrl = (assetsBucketDomain, applicationId, productionEnvironmentId) => {
  return `https://${assetsBucketDomain}/a/${applicationId}/${productionEnvironmentId}`;
};
const BaseRemixFrontendConfig = {
  distPath: `${import_remix.remixViteOptions.buildDirectory}/client`,
  manifestFilePath: `${import_remix.remixViteOptions.buildDirectory}/.vite/client-manifest.json`,
  productionBaseUrl: (assetsBucketDomain, applicationId, productionEnvironmentId) => {
    return `${getDefaultProductionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId)}/`;
  }
};
const BaseViteFrontendConfig = {
  distPath: ".gadget/vite-dist",
  manifestFilePath: ".gadget/vite-dist/manifest.json",
  productionBaseUrl: getDefaultProductionBaseUrl
};
const getInternalFrontendConfig = (frameworkType) => {
  switch (frameworkType) {
    case import_helpers.FrontendType.Remix:
      return BaseRemixFrontendConfig;
    case import_helpers.FrontendType.Vite:
      return BaseViteFrontendConfig;
    default:
      throw new Error(`Unknown frontend type detected: ${frameworkType}`);
  }
};
const getFrontendType = (indicatorFileContent) => {
  if (Object.values(import_helpers.FrontendType).includes(indicatorFileContent)) {
    return indicatorFileContent;
  }
  throw new Error(`Unknown frontend type detected: ${indicatorFileContent}`);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseRemixFrontendConfig,
  BaseViteFrontendConfig,
  getFrontendType,
  getInternalFrontendConfig
});
//# sourceMappingURL=utils.js.map
