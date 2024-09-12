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
var utils_exports = {};
__export(utils_exports, {
  assert: () => assert,
  default: () => utils_default,
  defaults: () => defaults,
  invert: () => invert,
  isArrayLike: () => isArrayLike,
  isEmpty: () => isEmpty,
  isFunction: () => isFunction,
  isObject: () => isObject,
  isObjectLike: () => isObjectLike,
  isProductionEnvironment: () => isProductionEnvironment,
  isString: () => isString,
  keyBy: () => keyBy,
  pickBy: () => pickBy
});
module.exports = __toCommonJS(utils_exports);
const asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", nullTag = "[object Null]", proxyTag = "[object Proxy]", setTag = "[object Set]", undefinedTag = "[object Undefined]";
const symToStringTag = Symbol.toStringTag;
const nativeObjectToString = Object.prototype.toString;
const hasOwnProperty = Object.prototype.hasOwnProperty;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : nativeObjectToString.call(value);
}
function getRawTag(value) {
  const isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
  let unmasked = false;
  try {
    value[symToStringTag] = void 0;
    unmasked = true;
  } catch (e) {
  }
  const result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
function assert(value, message) {
  if (!value) {
    throw new Error(message ?? "value is not truthy");
  }
  return value;
}
function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  const tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
function isArrayLike(value) {
  return value != null && typeof value.length == "number" && !isFunction(value);
}
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (Array.isArray(value)) {
    return !value.length;
  }
  const tag = baseGetTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}
function isString(value) {
  const type = typeof value;
  return type === "string" || type === "object" && value != null && !Array.isArray(value) && baseGetTag(value) == "[object String]";
}
function keyBy(array, iteratee) {
  return array.reduce((result, value) => {
    if (typeof iteratee === "function") {
      result[iteratee(value)] = value;
    } else if (typeof iteratee === "string") {
      result[value[iteratee]] = value;
    }
    return result;
  }, {});
}
function pickBy(object, predicate) {
  const result = {};
  for (const key in object) {
    if (hasOwnProperty.call(object, key) && predicate(object[key], key)) {
      result[key] = object[key];
    }
  }
  return result;
}
function invert(object) {
  const result = {};
  Object.keys(object).forEach((key) => {
    let value = object[key];
    if (value != null && typeof value.toString !== "function") {
      value = nativeObjectToString.call(value);
    }
    result[value] = key;
  });
  return result;
}
function mapValue(object, iteratee) {
  object = Object(object);
  const result = {};
  Object.keys(object).forEach((key) => {
    result[key] = iteratee(object[key], key, object);
  });
  return result;
}
var utils_default = mapValue;
const defaults = (...args) => args.reverse().reduce((acc, obj) => ({ ...acc, ...obj }), {});
const isProductionEnvironment = () => {
  return process.env.GADGET_ENV === "production";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assert,
  defaults,
  invert,
  isArrayLike,
  isEmpty,
  isFunction,
  isObject,
  isObjectLike,
  isProductionEnvironment,
  isString,
  keyBy,
  pickBy
});
//# sourceMappingURL=utils.js.map
