import type { RequestContext } from "@fastify/request-context";
import { AnyClient } from "@gadgetinc/api-client-core";
import { AsyncLocalStorage } from "async_hooks";
import type { Logger } from "./AmbientContext";
import type { AnyActionContext, AnyAmbientContext, AnyEffectContext, AnyGlobalActionContext } from "./types";

export const actionContextLocalStorage: AsyncLocalStorage<AnyActionContext | AnyGlobalActionContext | AnyEffectContext> =
  new AsyncLocalStorage<AnyActionContext | AnyGlobalActionContext | AnyEffectContext>();

/**
 * Extend the @fastify/request-context types with Gadget's added reference to the current unit of work's context
 * See https://github.com/fastify/fastify-request-context#typescript
 * */
declare module "@fastify/request-context" {
  interface RequestContextData {
    requestContext: AnyAmbientContext | AnyActionContext | AnyGlobalActionContext | AnyEffectContext;
  }
}

const platformModuleRequirer = <T = any>(name: string): (() => any) => {
  let mod: T = null as any;
  return () => {
    if (!mod) {
      if (!Globals.platformRequire) throw new Error("Globals.platformRequire is not set, has it been injected by the sandbox yet?");
      mod = Globals.platformRequire(name);
    }
    return mod;
  };
};

export interface SettableGlobals {
  logger: Logger;
  modelValidator: (modelKey: string) => Promise<any>;
  requestContext: RequestContext;
  platformRequire: typeof require;
  api: AnyClient;
}

export type GlobalSetter = (globals: SettableGlobals) => void;

export const Globals: {
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
} = {
  /**
   * A globally accessible API client instance, set in `set` by the `AppBridge`.
   * @internal
   */
  api: null as any,
  /**
   * Internal variable to store the model validator function, set in `set` by the `AppBridge`.
   * @internal
   */
  modelValidator: null as any,

  /**
   * Internal variable to store the request context module, set in `set` by the `AppBridge`.
   * @internal
   */
  requestContext: null as any,

  /**
   * @internal
   */
  logger: null as any,

  /**
   * Require function for importing code from the gadget platform context instead of the app's context.
   * @internal
   */
  platformRequire: null as any,

  /**
   * This is used internally to set the globals for this instance of the framework package.
   * @internal
   */
  set: function (this: GlobalSetter, globals: SettableGlobals): void {
    Object.assign(this, globals);
  },

  /**
   * Lazy-loaded modules for use in the framework package from the gadget platform context.
   * @internal
   */
  platformModules: {
    lodash: platformModuleRequirer("lodash"),
    bcrypt: platformModuleRequirer("bcrypt"),
    compareVersions: platformModuleRequirer("compare-versions"),
  },
};

(globalThis as any).GadgetGlobals = Globals;
