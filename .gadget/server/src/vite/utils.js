"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BaseRemixFrontendConfig: function() {
        return BaseRemixFrontendConfig;
    },
    BaseViteFrontendConfig: function() {
        return BaseViteFrontendConfig;
    },
    getFrontendType: function() {
        return getFrontendType;
    },
    getInternalFrontendConfig: function() {
        return getInternalFrontendConfig;
    }
});
const _remix = require("../remix");
const _helpers = require("./helpers");
const getDefaultProductionBaseUrl = (assetsBucketDomain, applicationId, productionEnvironmentId)=>{
    return `https://${assetsBucketDomain}/a/${applicationId}/${productionEnvironmentId}`;
};
const BaseRemixFrontendConfig = {
    distPath: `${_remix.remixViteOptions.buildDirectory}/client`,
    manifestFilePath: `${_remix.remixViteOptions.buildDirectory}/.vite/client-manifest.json`,
    productionBaseUrl: (assetsBucketDomain, applicationId, productionEnvironmentId)=>{
        return `${getDefaultProductionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId)}/`;
    }
};
const BaseViteFrontendConfig = {
    distPath: ".gadget/vite-dist",
    manifestFilePath: ".gadget/vite-dist/manifest.json",
    productionBaseUrl: getDefaultProductionBaseUrl
};
const getInternalFrontendConfig = (frameworkType)=>{
    switch(frameworkType){
        case _helpers.FrontendType.Remix:
            return BaseRemixFrontendConfig;
        case _helpers.FrontendType.Vite:
            return BaseViteFrontendConfig;
        default:
            throw new Error(`Unknown frontend type detected: ${frameworkType}`);
    }
};
const getFrontendType = (indicatorFileContent)=>{
    if (Object.values(_helpers.FrontendType).includes(indicatorFileContent)) {
        return indicatorFileContent;
    }
    throw new Error(`Unknown frontend type detected: ${indicatorFileContent}`);
};
