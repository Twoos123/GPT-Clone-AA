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
var types_exports = {};
__export(types_exports, {
  BackgroundActionPriority: () => BackgroundActionPriority,
  GadgetFieldType: () => GadgetFieldType
});
module.exports = __toCommonJS(types_exports);
var GadgetFieldType = /* @__PURE__ */ ((GadgetFieldType2) => {
  GadgetFieldType2[GadgetFieldType2["Any"] = 0] = "Any";
  GadgetFieldType2[GadgetFieldType2["Array"] = 1] = "Array";
  GadgetFieldType2[GadgetFieldType2["BelongsTo"] = 2] = "BelongsTo";
  GadgetFieldType2[GadgetFieldType2["Boolean"] = 3] = "Boolean";
  GadgetFieldType2[GadgetFieldType2["Code"] = 4] = "Code";
  GadgetFieldType2[GadgetFieldType2["Color"] = 5] = "Color";
  GadgetFieldType2[GadgetFieldType2["Computed"] = 6] = "Computed";
  GadgetFieldType2[GadgetFieldType2["DateTime"] = 7] = "DateTime";
  GadgetFieldType2[GadgetFieldType2["Email"] = 8] = "Email";
  GadgetFieldType2[GadgetFieldType2["EncryptedString"] = 9] = "EncryptedString";
  GadgetFieldType2[GadgetFieldType2["Enum"] = 10] = "Enum";
  GadgetFieldType2[GadgetFieldType2["File"] = 11] = "File";
  GadgetFieldType2[GadgetFieldType2["HasMany"] = 12] = "HasMany";
  GadgetFieldType2[GadgetFieldType2["HasManyThrough"] = 13] = "HasManyThrough";
  GadgetFieldType2[GadgetFieldType2["HasOne"] = 14] = "HasOne";
  GadgetFieldType2[GadgetFieldType2["ID"] = 15] = "ID";
  GadgetFieldType2[GadgetFieldType2["JSON"] = 16] = "JSON";
  GadgetFieldType2[GadgetFieldType2["Money"] = 17] = "Money";
  GadgetFieldType2[GadgetFieldType2["Null"] = 18] = "Null";
  GadgetFieldType2[GadgetFieldType2["Number"] = 19] = "Number";
  GadgetFieldType2[GadgetFieldType2["Object"] = 20] = "Object";
  GadgetFieldType2[GadgetFieldType2["Password"] = 21] = "Password";
  GadgetFieldType2[GadgetFieldType2["RecordState"] = 22] = "RecordState";
  GadgetFieldType2[GadgetFieldType2["RichText"] = 23] = "RichText";
  GadgetFieldType2[GadgetFieldType2["RoleAssignments"] = 24] = "RoleAssignments";
  GadgetFieldType2[GadgetFieldType2["String"] = 25] = "String";
  GadgetFieldType2[GadgetFieldType2["URL"] = 26] = "URL";
  GadgetFieldType2[GadgetFieldType2["Vector"] = 27] = "Vector";
  return GadgetFieldType2;
})(GadgetFieldType || {});
var BackgroundActionPriority = /* @__PURE__ */ ((BackgroundActionPriority2) => {
  BackgroundActionPriority2[BackgroundActionPriority2["DEFAULT"] = 0] = "DEFAULT";
  BackgroundActionPriority2[BackgroundActionPriority2["HIGH"] = 1] = "HIGH";
  BackgroundActionPriority2[BackgroundActionPriority2["LOW"] = 2] = "LOW";
  BackgroundActionPriority2[BackgroundActionPriority2["PLATFORM"] = 3] = "PLATFORM";
  return BackgroundActionPriority2;
})(BackgroundActionPriority || {});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackgroundActionPriority,
  GadgetFieldType
});
//# sourceMappingURL=types.js.map
