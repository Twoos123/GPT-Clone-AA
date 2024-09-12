import type { RequestContext } from "@fastify/request-context";
import { AnyClient } from "@gadgetinc/api-client-core";
import { AsyncLocalStorage } from "async_hooks";
import type { Logger } from "./AmbientContext";
import type { AnyActionContext, AnyAmbientContext, AnyEffectContext, AnyGlobalActionContext } from "./types";
export declare const actionContextLocalStorage: AsyncLocalStorage<AnyActionContext | AnyGlobalActionContext | AnyEffectContext>;
declare module "@fastify/request-context" {
    interface RequestContextData {
        requestContext: AnyAmbientContext | AnyActionContext | AnyGlobalActionContext | AnyEffectContext;
    }
}
declare const platformModuleRequirer: <T = any>(name: string) => (() => any);
export interface SettableGlobals {
    logger: Logger;
    modelValidator: (modelKey: string) => Promise<any>;
    requestContext: RequestContext;
    platformRequire: typeof require;
    api: AnyClient;
}
export type GlobalSetter = (globals: SettableGlobals) => void;
export declare const Globals: {
    api: AnyClient;
    modelValidator: (modelKey: string) => Promise<any>;
    requestContext: RequestContext;
    logger: Logger;
    platformRequire: typeof require;
    set: GlobalSetter;
    platformModules: {
        lodash: () => any;
        bcrypt: () => any;
        compareVersions: () => any;
    };
};
