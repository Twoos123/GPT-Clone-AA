import fs from "fs/promises";
import path from "path";
import { remixViteOptions } from "../remix";
import type { GadgetPluginOptions } from "./types";
import { getInternalFrontendConfig } from "./utils";
export declare enum FrontendType {
    Remix = "remix",
    Vite = "vite"
}
export declare const frontendTypeIndicatorFilePath: string;
declare const maybeGetPluginByName: (name: string, plugin: any) => any;
export declare const getFrontendTypeByPluginsUsed: (config: Record<string, any>) => FrontendType;
export declare const doesViteConfigHasGadgetPlugin: (config: Record<string, any>) => boolean;
export declare const getViteConfig: (config: any, { command, mode, isSsrBuild }: {
    command: "serve" | "build";
    mode: "development" | "production";
    isSsrBuild?: boolean;
}, options: {
    plugin?: GadgetPluginOptions;
    params: {
        assetsBucketDomain: string;
        applicationId: string;
        productionEnvironmentId: string;
        developmentEnvironmentVariables: Record<string, string>;
        productionEnvironmentVariables: Record<string, string>;
    };
}) => Promise<void>;
interface HtmlTagDescriptor {
    tag: string;
    attrs: Record<string, string | boolean>;
    children?: string;
}
export declare const getHtmlTags: (options: {
    hasAppBridgeV4: boolean;
    hasBigCommerceConnection: boolean;
    assetsDomain: string;
}, devMode: boolean) => HtmlTagDescriptor[];
export declare const buildDefinesMap: (env: Record<string, string | undefined>, mode: "development" | "production") => Record<string, string>;
export declare const VITE_PUBLIC_ENV_PREFIXES: string[];
