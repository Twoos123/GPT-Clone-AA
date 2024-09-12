import { remixViteOptions } from "../remix";
import { FrontendType } from "./helpers";

const getDefaultProductionBaseUrl = (assetsBucketDomain: string, applicationId: string, productionEnvironmentId: string): string => {
  return `https://${assetsBucketDomain}/a/${applicationId}/${productionEnvironmentId}`;
};
/** A descriptor object that describes how different Gadget frontend types work for our use when building vite configs */
type InternalFrontendConfig = {
  distPath: string;
  manifestFilePath: string;
  productionBaseUrl: (assetsBucketDomain: string, applicationId: string, productionEnvironmentId: string) => string;
};

export const BaseRemixFrontendConfig: InternalFrontendConfig = {
  distPath: `${remixViteOptions.buildDirectory}/client`,
  manifestFilePath: `${remixViteOptions.buildDirectory}/.vite/client-manifest.json`,
  productionBaseUrl: (assetsBucketDomain: string, applicationId: string, productionEnvironmentId: string) => {
    return `${getDefaultProductionBaseUrl(assetsBucketDomain, applicationId, productionEnvironmentId)}/`;
  },
};

export const BaseViteFrontendConfig: InternalFrontendConfig = {
  distPath: ".gadget/vite-dist",
  manifestFilePath: ".gadget/vite-dist/manifest.json",
  productionBaseUrl: getDefaultProductionBaseUrl,
};

/**
 * Get the frontend config for the given framework type.
 */
export const getInternalFrontendConfig = (frameworkType: FrontendType): InternalFrontendConfig => {
  switch (frameworkType) {
    case FrontendType.Remix:
      return BaseRemixFrontendConfig;

    case FrontendType.Vite:
      return BaseViteFrontendConfig;

    default:
      throw new Error(`Unknown frontend type detected: ${frameworkType}`);
  }
};

/**
 * Get the frontend type from the given indicator file content.
 */
export const getFrontendType = (indicatorFileContent: string): FrontendType => {
  if (Object.values(FrontendType).includes(indicatorFileContent as any)) {
    return indicatorFileContent as FrontendType;
  }

  throw new Error(`Unknown frontend type detected: ${indicatorFileContent}`);
};
