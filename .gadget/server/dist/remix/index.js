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
var remix_exports = {};
__export(remix_exports, {
  remixViteOptions: () => remixViteOptions
});
module.exports = __toCommonJS(remix_exports);
const remixViteOptions = {
  buildDirectory: ".gadget/remix-dist/build",
  appDirectory: "web"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  remixViteOptions
});
//# sourceMappingURL=index.js.map
