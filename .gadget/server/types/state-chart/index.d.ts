import { NoTransitionError } from "../errors";
import { Globals } from "../globals";
import type { StateData, StateHistoryValue, StateMapper, StateValue } from "./StateMapper";
import { flattenStateValue } from "./StateMapper";
type ActionContext = any;
export declare const possibleTransitionStates: ({ record, model }: ActionContext, mapper: StateMapper) => StateData[];
export declare const checkCanExecute: (context: ActionContext, mapper: StateMapper) => void;
export declare const computeStateHistory: (history: StateHistoryValue, state: StateValue) => StateHistoryValue;
export declare const computeStateValueFor: (history: StateHistoryValue, state: StateData, mapper: StateMapper) => StateValue;
export declare const _doStateTransition: (currentHistory: StateHistoryValue, currentState: StateValue, toState: StateData, mapper: StateMapper, record: any) => {
    newState: StateValue;
    newHistory: StateHistoryValue;
};
export declare const doStateTransition: (context: ActionContext, mapper: StateMapper) => {
    newState: StateValue;
    newHistory: StateHistoryValue;
};
export declare const persistStateTransition: (newState: StateValue, newHistory: StateHistoryValue, context: ActionContext) => Promise<void>;
export declare const updateState: ({ api, model, record, scope, logger }: ActionContext, newState: StateValue, stateHistory: StateHistoryValue) => Promise<void>;
export { isStateHistoryValue, isStateValue, StateMapper } from "./StateMapper";
export type { StateHistoryValue, StateValue, StateValueMap } from "./StateMapper";
