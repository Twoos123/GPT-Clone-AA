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
        return _StateMapper.StateMapper;
    },
    _doStateTransition: function() {
        return _doStateTransition;
    },
    checkCanExecute: function() {
        return checkCanExecute;
    },
    computeStateHistory: function() {
        return computeStateHistory;
    },
    computeStateValueFor: function() {
        return computeStateValueFor;
    },
    doStateTransition: function() {
        return doStateTransition;
    },
    isStateHistoryValue: function() {
        return _StateMapper.isStateHistoryValue;
    },
    isStateValue: function() {
        return _StateMapper.isStateValue;
    },
    persistStateTransition: function() {
        return persistStateTransition;
    },
    possibleTransitionStates: function() {
        return possibleTransitionStates;
    },
    updateState: function() {
        return updateState;
    }
});
const _errors = require("../errors");
const _globals = require("../globals");
const _StateMapper = require("./StateMapper");
const possibleTransitionStates = ({ record, model }, mapper)=>{
    const state = record.state;
    if (state) {
        const stateValue = mapper.mapApiIdentifiersToStorageValue(state);
        return _globals.Globals.platformModules.lodash().map((0, _StateMapper.flattenStateValue)(stateValue), (key)=>mapper.stateKeyToData(key));
    } else if (model.stateChart.initialChildStateKey) {
        const startState = mapper.stateKeyToData(model.stateChart.initialChildStateKey);
        return [
            startState
        ];
    }
    return [];
};
const checkCanExecute = (context, mapper)=>{
    const receivingState = _globals.Globals.platformModules.lodash().find(possibleTransitionStates(context, mapper), [
        "blob.key",
        context.transition.fromStateKey
    ]);
    if (!receivingState) {
        const { record: { state } } = context;
        let stateName = "<unknown>";
        if (_globals.Globals.platformModules.lodash().isString(state)) {
            stateName = state;
        } else if (_globals.Globals.platformModules.lodash().isObjectLike(state)) {
            stateName = JSON.stringify(state);
        } else if (context.model.stateChart.initialChildStateKey) {
            const initialStateKey = context.model.stateChart.initialChildStateKey;
            const state = _globals.Globals.platformModules.lodash().find(context.model.stateChart.childStates, {
                key: initialStateKey
            });
            if (state) {
                stateName = state.name;
            }
        }
        let errorMessage = `Invalid action for the ${context.model.apiIdentifier} model. Unable to execute the "${context.action.apiIdentifier}" action in state "${stateName}".`;
        if (context.action.apiIdentifier == "logInViaEmail") {
            errorMessage = `Invalid action for the ${context.model.apiIdentifier} model. This session is already logged in for ${context.params.email}.`;
        }
        throw new _errors.NoTransitionError(errorMessage);
    }
};
const computeStateHistory = (history, state)=>{
    const newHistory = history ? _globals.Globals.platformModules.lodash().cloneDeep(history) : {
        current: ""
    };
    const path = [];
    while(_globals.Globals.platformModules.lodash().isObject(state)){
        const [current, newState] = Object.entries(state)[0];
        path.push("current");
        _globals.Globals.platformModules.lodash().set(newHistory, path, current);
        path.pop();
        path.push("children");
        path.push(current);
        state = newState;
    }
    path.push("current");
    _globals.Globals.platformModules.lodash().set(newHistory, path, state);
    return newHistory;
};
const computeStateValueFor = (history, state, mapper)=>{
    // This will be the "path" to the penultimate state in the state value we return. For example, if the state value we
    // return is `{ a: { b: "c" } }`, the path will be `["a", "b"]`.
    const path = _globals.Globals.platformModules.lodash().clone(state.path);
    // A path to dig into the historical value. The historical value nests every state under "children", hence the `flatMap`.
    const historyPath = path.flatMap((segment)=>[
            "children",
            segment
        ]);
    while(state.blob.initialChildStateKey){
        // Rule (2) above
        if (state.blob.restoreHistory) {
            // The value we potentially want to restore is under the "current" key in the history value, so temporarily push "current" into the
            // path so we can grab it, but pop it again because we may recurse further.
            historyPath.push("current");
            const apiIdentifier = _globals.Globals.platformModules.lodash().get(history, historyPath);
            historyPath.pop();
            // Rules (1) and (3) above. If there's no historical value, the `get` above will return undefined, and no child state should
            // have an undefined API identifier, so we'll hit the break below.
            const maybeChildState = _globals.Globals.platformModules.lodash().find(state.blob.childStates, {
                apiIdentifier
            });
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
    // Now that we've went as deep into history as possible, initial the rest of the nested states with the initial states
    while(state.blob.initialChildStateKey){
        path.push(state.blob.apiIdentifier);
        state = mapper.stateKeyToData(state.blob.initialChildStateKey);
    }
    // Special case for a root state, just return the API identifier. For example, if the created state has no nested states, the
    // actual state value will be `"created"`, not `{ created: ??? }`.
    if (_globals.Globals.platformModules.lodash().isEmpty(path)) {
        return state.apiIdentifier;
    }
    // `set` will ensure all intermediate objects are initialized. So `set({}, ['a', 'b'], 'c')` will give us `{ a: { b: "c" } }`
    return _globals.Globals.platformModules.lodash().set({}, path, state.apiIdentifier);
};
const _doStateTransition = (currentHistory, currentState, toState, mapper, record)=>{
    const newHistory = computeStateHistory(currentHistory, currentState);
    // It's important that we use the new history value here, instead of `recordStateHistory`, in case of a self transition. The historical
    // value contains the position we were in _previously_. That means that if we did a self transition, we'd revert to the previous state
    // (if it were different than the current state).
    const newState = computeStateValueFor(newHistory, toState, mapper);
    record.state = newState;
    record.stateHistory = newHistory;
    return {
        newState,
        newHistory
    };
};
const doStateTransition = (context, mapper)=>{
    const toState = mapper.stateKeyToData(context.transition.toStateKey);
    const currentState = _globals.Globals.platformModules.lodash().cloneDeep(context.record.state);
    const currentHistory = _globals.Globals.platformModules.lodash().cloneDeep(context.record.stateHistory);
    return _doStateTransition(currentHistory, currentState, toState, mapper, context.record);
};
const persistStateTransition = async (newState, newHistory, context)=>{
    if (context.record.changed("state") || context.record.changed("stateHistory")) {
        await updateState(context, newState, newHistory);
    }
};
const updateState = async ({ api, model, record, scope, logger }, newState, stateHistory)=>{
    if (record.id && !scope.recordDeleted) {
        await api.internal[model.apiIdentifier].update(record.id, {
            [model.apiIdentifier]: {
                state: newState,
                stateHistory
            }
        });
        logger.debug("updated record state");
    }
};
