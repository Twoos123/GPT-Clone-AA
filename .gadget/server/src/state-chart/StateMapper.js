"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    StateMapper: function() {
        return StateMapper;
    },
    flattenStateValue: function() {
        return flattenStateValue;
    },
    isStateHistoryValue: function() {
        return isStateHistoryValue;
    },
    isStateValue: function() {
        return isStateValue;
    },
    stateValueFromPath: function() {
        return stateValueFromPath;
    }
});
function _interop_require_wildcard() {
    const data = require("@swc/helpers/_/_interop_require_wildcard");
    _interop_require_wildcard = function() {
        return data;
    };
    return data;
}
const _utils = /*#__PURE__*/ _interop_require_wildcard()._(require("../utils"));
/** Deeply map the keys/values of a state value */ function mapStateValue(state, mapper) {
    if ((0, _utils.isObject)(state)) {
        const result = {};
        for (const [key, value] of Object.entries(state)){
            result[mapper(key)] = mapStateValue(value, mapper);
        }
        return result;
    }
    return mapper(state);
}
/** Deeply map the keys/values of a state history value */ function mapStateHistoryValue(state, mapper) {
    const result = {
        current: mapper(state.current)
    };
    if (state.children) {
        result.children = {};
        for (const [name, history] of Object.entries(state.children)){
            result.children[mapper(name)] = mapStateHistoryValue(history, mapper);
        }
    }
    return result;
}
function isStateValue(value) {
    if ((0, _utils.isString)(value)) {
        return true;
    }
    if (!(0, _utils.isObject)(value)) {
        return false;
    }
    return Object.entries(value).every(([key, value])=>(0, _utils.isString)(key) && isStateValue(value));
}
function isStateHistoryValue(value) {
    if (!(0, _utils.isObject)(value)) {
        return false;
    }
    const record = value;
    if (!("current" in record) || !(0, _utils.isString)(record.current)) {
        return false;
    }
    if ("children" in record && record.children) {
        if (!(0, _utils.isObject)(record.children)) {
            return false;
        }
        return Object.values(record.children).every((v)=>isStateHistoryValue(v));
    }
    return true;
}
class StateMapper {
    model;
    stateKeyToDataMap;
    constructor(model){
        this.model = model;
        this.stateKeyToDataMap = {};
        this.populateStateMaps(model.stateChart.childStates, []);
    }
    mapStorageValueToApiIdentifiers(stateValue) {
        return mapStateValue(stateValue, (key)=>{
            if (key in this.stateKeyToDataMap) {
                return this.stateKeyToDataMap[key].apiIdentifier;
            }
            return key;
        });
    }
    mapApiIdentifiersToStorageValue(stateValue) {
        return mapStateValue(stateValue, (apiIdentifier)=>{
            if (apiIdentifier in this.apiIdentifierToStateKeyMap) {
                return this.apiIdentifierToStateKeyMap[apiIdentifier];
            }
            return apiIdentifier;
        });
    }
    mapStorageHistoryValueToApiIdentifiers(stateHistoryValue) {
        return mapStateHistoryValue(stateHistoryValue, (key)=>{
            if (key in this.stateKeyToDataMap) {
                return this.stateKeyToDataMap[key].apiIdentifier;
            }
            return key;
        });
    }
    mapApiIdentifiersToStorageHistoryValue(stateHistoryValue) {
        return mapStateHistoryValue(stateHistoryValue, (apiIdentifier)=>{
            if (apiIdentifier in this.apiIdentifierToStateKeyMap) {
                return this.apiIdentifierToStateKeyMap[apiIdentifier];
            }
            return apiIdentifier;
        });
    }
    stateKeyToData(stateKey) {
        return (0, _utils.assert)(this.stateKeyToDataMap[stateKey], `state key "${stateKey}" not found in state map`);
    }
    get apiIdentifierToStateKeyMap() {
        return (0, _utils.invert)((0, _utils.default)(this.stateKeyToDataMap, ({ apiIdentifier })=>apiIdentifier));
    }
    populateStateMaps(states, path) {
        for (const state of states){
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
        // Note, we're not throwing a special error here because we're in control of the code that calls this method, and should always pass in a non-empty path
        throw new Error("can't compute state value from an empty path");
    }
    if (path.length == 1) {
        return path[0];
    }
    let index = path.length - 1;
    let stateValue = path[index];
    while(--index >= 0){
        const stateApiIdentifier = path[index];
        stateValue = {
            [stateApiIdentifier]: stateValue
        };
    }
    return stateValue;
}
function flattenStateValue(state) {
    if ((0, _utils.isString)(state)) {
        return [
            state
        ];
    }
    if ((0, _utils.isEmpty)(state)) {
        return [];
    }
    const [key, stateValue] = Object.entries(state)[0];
    return [
        key,
        ...flattenStateValue(stateValue)
    ];
}
