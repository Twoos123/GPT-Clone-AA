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
var StateMapper_exports = {};
__export(StateMapper_exports, {
  StateMapper: () => StateMapper,
  flattenStateValue: () => flattenStateValue,
  isStateHistoryValue: () => isStateHistoryValue,
  isStateValue: () => isStateValue,
  stateValueFromPath: () => stateValueFromPath
});
module.exports = __toCommonJS(StateMapper_exports);
var import_utils = __toESM(require("../utils"));
function mapStateValue(state, mapper) {
  if ((0, import_utils.isObject)(state)) {
    const result = {};
    for (const [key, value] of Object.entries(state)) {
      result[mapper(key)] = mapStateValue(value, mapper);
    }
    return result;
  }
  return mapper(state);
}
function mapStateHistoryValue(state, mapper) {
  const result = {
    current: mapper(state.current)
  };
  if (state.children) {
    result.children = {};
    for (const [name, history] of Object.entries(state.children)) {
      result.children[mapper(name)] = mapStateHistoryValue(history, mapper);
    }
  }
  return result;
}
function isStateValue(value) {
  if ((0, import_utils.isString)(value)) {
    return true;
  }
  if (!(0, import_utils.isObject)(value)) {
    return false;
  }
  return Object.entries(value).every(([key, value2]) => (0, import_utils.isString)(key) && isStateValue(value2));
}
function isStateHistoryValue(value) {
  if (!(0, import_utils.isObject)(value)) {
    return false;
  }
  const record = value;
  if (!("current" in record) || !(0, import_utils.isString)(record.current)) {
    return false;
  }
  if ("children" in record && record.children) {
    if (!(0, import_utils.isObject)(record.children)) {
      return false;
    }
    return Object.values(record.children).every((v) => isStateHistoryValue(v));
  }
  return true;
}
class StateMapper {
  constructor(model) {
    this.model = model;
    this.stateKeyToDataMap = {};
    this.populateStateMaps(model.stateChart.childStates, []);
  }
  mapStorageValueToApiIdentifiers(stateValue) {
    return mapStateValue(stateValue, (key) => {
      if (key in this.stateKeyToDataMap) {
        return this.stateKeyToDataMap[key].apiIdentifier;
      }
      return key;
    });
  }
  mapApiIdentifiersToStorageValue(stateValue) {
    return mapStateValue(stateValue, (apiIdentifier) => {
      if (apiIdentifier in this.apiIdentifierToStateKeyMap) {
        return this.apiIdentifierToStateKeyMap[apiIdentifier];
      }
      return apiIdentifier;
    });
  }
  mapStorageHistoryValueToApiIdentifiers(stateHistoryValue) {
    return mapStateHistoryValue(stateHistoryValue, (key) => {
      if (key in this.stateKeyToDataMap) {
        return this.stateKeyToDataMap[key].apiIdentifier;
      }
      return key;
    });
  }
  mapApiIdentifiersToStorageHistoryValue(stateHistoryValue) {
    return mapStateHistoryValue(stateHistoryValue, (apiIdentifier) => {
      if (apiIdentifier in this.apiIdentifierToStateKeyMap) {
        return this.apiIdentifierToStateKeyMap[apiIdentifier];
      }
      return apiIdentifier;
    });
  }
  stateKeyToData(stateKey) {
    return (0, import_utils.assert)(this.stateKeyToDataMap[stateKey], `state key "${stateKey}" not found in state map`);
  }
  get apiIdentifierToStateKeyMap() {
    return (0, import_utils.invert)((0, import_utils.default)(this.stateKeyToDataMap, ({ apiIdentifier }) => apiIdentifier));
  }
  populateStateMaps(states, path) {
    for (const state of states) {
      path.push(state.apiIdentifier);
      this.stateKeyToDataMap[state.key] = {
        apiIdentifier: state.apiIdentifier,
        blob: state,
        value: stateValueFromPath(path),
        path: path.slice()
      };
      if (state.childStates) {
        this.populateStateMaps(state.childStates, path);
      }
      path.pop();
    }
  }
}
function stateValueFromPath(path) {
  if (path.length == 0) {
    throw new Error("can't compute state value from an empty path");
  }
  if (path.length == 1) {
    return path[0];
  }
  let index = path.length - 1;
  let stateValue = path[index];
  while (--index >= 0) {
    const stateApiIdentifier = path[index];
    stateValue = { [stateApiIdentifier]: stateValue };
  }
  return stateValue;
}
function flattenStateValue(state) {
  if ((0, import_utils.isString)(state)) {
    return [state];
  }
  if ((0, import_utils.isEmpty)(state)) {
    return [];
  }
  const [key, stateValue] = Object.entries(state)[0];
  return [key, ...flattenStateValue(stateValue)];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StateMapper,
  flattenStateValue,
  isStateHistoryValue,
  isStateValue,
  stateValueFromPath
});
//# sourceMappingURL=StateMapper.js.map
