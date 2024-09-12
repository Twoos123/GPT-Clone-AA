import { remixViteOptions } from "../remix";
import { FrontendType } from "./helpers";
declare const getDefaultProductionBaseUrl: (assetsBucketDomain: string, applicationId: string, productionEnvironmentId: string) => string;
type InternalFrontendConfig = {
    distPath: string;
    manifestFilePath: string;
    productionBaseUrl: (assetsBucketDomain: string, applicationId: string, productionEnvironmentId: string) => string;
};
export declare const BaseRemixFrontendConfig: InternalFrontendConfig;
export declare const BaseViteFrontendConfig: InternalFrontendConfig;
export declare const getInternalFrontendConfig: (frameworkType: FrontendType) => InternalFrontendConfig;
export declare const getFrontendType: (indicatorFileContent: string) => FrontendType;
