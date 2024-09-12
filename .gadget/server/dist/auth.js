"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  generateCode: () => generateCode,
  hashCode: () => hashCode,
  preValidation: () => preValidation
});
module.exports = __toCommonJS(auth_exports);
var import_node_crypto = __toESM(require("node:crypto"));
const generateCode = (numBytes) => {
  return import_node_crypto.default.randomBytes(numBytes ?? 64).toString("hex");
};
const hashCode = (code) => {
  return import_node_crypto.default.createHash("sha256").update(code).digest("hex");
};
const getSessionFromRequest = (request) => {
  if ("applicationSession" in request) {
    return request.applicationSession;
  }
  throw new Error("The request is not a Gadget server request");
};
const preValidation = async (request, reply) => {
  let authenticated = false;
  const applicationSession = getSessionFromRequest(request);
  authenticated = !!applicationSession.get("user");
  if (!authenticated) {
    if (request.gadgetAuth?.redirectToSignIn) {
      await reply.redirect(request.gadgetAuth.signInPath);
    } else {
      await reply.status(403).send();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateCode,
  hashCode,
  preValidation
});
//# sourceMappingURL=auth.js.map
