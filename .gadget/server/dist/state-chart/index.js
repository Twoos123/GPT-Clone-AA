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
var state_chart_exports = {};
__export(state_chart_exports, {
  StateMapper: () => import_StateMapper2.StateMapper,
  _doStateTransition: () => _doStateTransition,
  checkCanExecute: () => checkCanExecute,
  computeStateHistory: () => computeStateHistory,
  computeStateValueFor: () => computeStateValueFor,
  doStateTransition: () => doStateTransition,
  isStateHistoryValue: () => import_StateMapper2.isStateHistoryValue,
  isStateValue: () => import_StateMapper2.isStateValue,
  persistStateTransition: () => persistStateTransition,
  possibleTransitionStates: () => possibleTransitionStates,
  updateState: () => updateState
});
module.exports = __toCommonJS(state_chart_exports);
var import_errors = require("../errors");
var import_globals = require("../globals");
var import_StateMapper = require("./StateMapper");
var import_StateMapper2 = require("./StateMapper");
const possibleTransitionStates = ({ record, model }, mapper) => {
  const state = record.state;
  if (state) {
    const stateValue = mapper.mapApiIdentifiersToStorageValue(state);
    return import_globals.Globals.platformModules.lodash().map((0, import_StateMapper.flattenStateValue)(stateValue), (key) => mapper.stateKeyToData(key));
  } else if (model.stateChart.initialChildStateKey) {
    const startState = mapper.stateKeyToData(model.stateChart.initialChildStateKey);
    return [startState];
  }
  return [];
};
const checkCanExecute = (context, mapper) => {
  const receivingState = import_globals.Globals.platformModules.lodash().find(possibleTransitionStates(context, mapper), ["blob.key", context.transition.fromStateKey]);
  if (!receivingState) {
    const {
      record: { state }
    } = context;
    let stateName = "<unknown>";
    if (import_globals.Globals.platformModules.lodash().isString(state)) {
      stateName = state;
    } else if (import_globals.Globals.platformModules.lodash().isObjectLike(state)) {
      stateName = JSON.stringify(state);
    } else if (context.model.stateChart.initialChildStateKey) {
      const initialStateKey = context.model.stateChart.initialChildStateKey;
      const state2 = import_globals.Globals.platformModules.lodash().find(context.model.stateChart.childStates, { key: initialStateKey });
      if (state2) {
        stateName = state2.name;
      }
    }
    let errorMessage = `Invalid action for the ${context.model.apiIdentifier} model. Unable to execute the "${context.action.apiIdentifier}" action in state "${stateName}".`;
    if (context.action.apiIdentifier == "logInViaEmail") {
      errorMessage = `Invalid action for the ${context.model.apiIdentifier} model. This session is already logged in for ${context.params.email}.`;
    }
    throw new import_errors.NoTransitionError(errorMessage);
  }
};
const computeStateHistory = (history, state) => {
  const newHistory = history ? import_globals.Globals.platformModules.lodash().cloneDeep(history) : { current: "" };
  const path = [];
  while (import_globals.Globals.platformModules.lodash().isObject(state)) {
    const [current, newState] = Object.entries(state)[0];
    path.push("current");
    import_globals.Globals.platformModules.lodash().set(newHistory, path, current);
    path.pop();
    path.push("children");
    path.push(current);
    state = newState;
  }
  path.push("current");
  import_globals.Globals.platformModules.lodash().set(newHistory, path, state);
  return newHistory;
};
const computeStateValueFor = (history, state, mapper) => {
  const path = import_globals.Globals.platformModules.lodash().clone(state.path);
  const historyPath = path.flatMap((segment) => ["children", segment]);
  while (state.blob.initialChildStateKey) {
    if (state.blob.restoreHistory) {
      historyPath.push("current");
      const apiIdentifier = import_globals.Globals.platformModules.lodash().get(history, historyPath);
      historyPath.pop();
      const maybeChildState = import_globals.Globals.platformModules.lodash().find(state.blob.childStates, { apiIdentifier });
      if (maybeChildState) {
        historyPath.push("children");
        historyPath.push(apiIdentifier);
        path.push(apiIdentifier);
        state = mapper.stateKeyToData(maybeChildState.key);
        continue;
      }
    }
    break;
  }
  path.pop();
  while (state.blob.initialChildStateKey) {
    path.push(state.blob.apiIdentifier);
    state = mapper.stateKeyToData(state.blob.initialChildStateKey);
  }
  if (import_globals.Globals.platformModules.lodash().isEmpty(path)) {
    return state.apiIdentifier;
  }
  return import_globals.Globals.platformModules.lodash().set({}, path, state.apiIdentifier);
};
const _doStateTransition = (currentHistory, currentState, toState, mapper, record) => {
  const newHistory = computeStateHistory(currentHistory, currentState);
  const newState = computeStateValueFor(newHistory, toState, mapper);
  record.state = newState;
  record.stateHistory = newHistory;
  return { newState, newHistory };
};
const doStateTransition = (context, mapper) => {
  const toState = mapper.stateKeyToData(context.transition.toStateKey);
  const currentState = import_globals.Globals.platformModules.lodash().cloneDeep(context.record.state);
  const currentHistory = import_globals.Globals.platformModules.lodash().cloneDeep(context.record.stateHistory);
  return _doStateTransition(currentHistory, currentState, toState, mapper, context.record);
};
const persistStateTransition = async (newState, newHistory, context) => {
  if (context.record.changed("state") || context.record.changed("stateHistory")) {
    await updateState(context, newState, newHistory);
  }
};
const updateState = async ({ api, model, record, scope, logger }, newState, stateHistory) => {
  if (record.id && !scope.recordDeleted) {
    await api.internal[model.apiIdentifier].update(record.id, { [model.apiIdentifier]: { state: newState, stateHistory } });
    logger.debug("updated record state");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StateMapper,
  _doStateTransition,
  checkCanExecute,
  computeStateHistory,
  computeStateValueFor,
  doStateTransition,
  isStateHistoryValue,
  isStateValue,
  persistStateTransition,
  possibleTransitionStates,
  updateState
});
//# sourceMappingURL=index.js.map
