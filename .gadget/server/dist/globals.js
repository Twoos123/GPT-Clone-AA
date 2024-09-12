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
var globals_exports = {};
__export(globals_exports, {
  Globals: () => Globals,
  actionContextLocalStorage: () => actionContextLocalStorage
});
module.exports = __toCommonJS(globals_exports);
var import_async_hooks = require("async_hooks");
const actionContextLocalStorage = new import_async_hooks.AsyncLocalStorage();
const platformModuleRequirer = (name) => {
  let mod = null;
  return () => {
    if (!mod) {
      if (!Globals.platformRequire)
        throw new Error("Globals.platformRequire is not set, has it been injected by the sandbox yet?");
      mod = Globals.platformRequire(name);
    }
    return mod;
  };
};
const Globals = {
  /**
   * A globally accessible API client instance, set in `set` by the `AppBridge`.
   * @internal
   */
  api: null,
  /**
   * Internal variable to store the model validator function, set in `set` by the `AppBridge`.
   * @internal
   */
  modelValidator: null,
  /**
   * Internal variable to store the request context module, set in `set` by the `AppBridge`.
   * @internal
   */
  requestContext: null,
  /**
   * @internal
   */
  logger: null,
  /**
   * Require function for importing code from the gadget platform context instead of the app's context.
   * @internal
   */
  platformRequire: null,
  /**
   * This is used internally to set the globals for this instance of the framework package.
   * @internal
   */
  set: function(globals) {
    Object.assign(this, globals);
  },
  /**
   * Lazy-loaded modules for use in the framework package from the gadget platform context.
   * @internal
   */
  platformModules: {
    lodash: platformModuleRequirer("lodash"),
    bcrypt: platformModuleRequirer("bcrypt"),
    compareVersions: platformModuleRequirer("compare-versions")
  }
};
globalThis.GadgetGlobals = Globals;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Globals,
  actionContextLocalStorage
});
//# sourceMappingURL=globals.js.map
