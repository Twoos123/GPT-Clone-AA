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
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var Session_exports = {};
__export(Session_exports, {
  Session: () => Session
});
module.exports = __toCommonJS(Session_exports);
var _storage;
const _Session = class {
  constructor(_id, obj) {
    this._id = _id;
    this.changedKeys = /* @__PURE__ */ new Set();
    this.ended = false;
    this.touched = false;
    __privateAdd(this, _storage, void 0);
    __privateSet(this, _storage, obj);
  }
  static fromInput(input) {
    if (input) {
      return new _Session(input.id, input);
    }
  }
  get(key) {
    return __privateGet(this, _storage)[key];
  }
  set(key, value) {
    this.changedKeys.add(key);
    __privateGet(this, _storage)[key] = value;
  }
  touch() {
    this.touched = true;
  }
  delete(key) {
    this.changedKeys.add(key);
    __privateGet(this, _storage)[key] = null;
  }
  end() {
    this.changedKeys.add("id");
    this.ended = true;
  }
  clearChanges() {
    this.changedKeys.clear();
  }
  get changed() {
    return this.changedKeys.size > 0;
  }
  toJSON() {
    return __privateGet(this, _storage);
  }
  toChangedJSON() {
    const changes = {};
    for (const key of this.changedKeys) {
      changes[key] = __privateGet(this, _storage)[key];
    }
    return changes;
  }
  get id() {
    return this._id;
  }
  set id(value) {
    this._id = value;
    this.set("id", this._id);
  }
};
let Session = _Session;
_storage = new WeakMap();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Session
});
//# sourceMappingURL=Session.js.map
