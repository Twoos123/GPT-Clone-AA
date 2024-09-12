import mapValue, { assert, invert, isEmpty, isObject, isString } from "../utils";
export type StateValueMap = {
    [key: string]: StateValue;
};
type ModelBlob = any;
export type StateBlob = any;
export type StateValue = string | StateValueMap;
export type StateHistoryValue = {
    current: string;
    children?: Record<string, StateHistoryValue>;
};
export type StateData = {
    value: StateValue;
    apiIdentifier: string;
    blob: StateBlob;
    path: string[];
};
declare function mapStateValue(state: StateValue, mapper: (key: string) => string): StateValue;
declare function mapStateHistoryValue(state: StateHistoryValue, mapper: (key: string) => string): StateHistoryValue;
export declare function isStateValue(value: any): value is StateValue;
export declare function isStateHistoryValue(value: any): value is StateHistoryValue;
export declare class StateMapper {
    stateKeyToDataMap: {
        [key: string]: StateData;
    };
    constructor(readonly model: ModelBlob);
    mapStorageValueToApiIdentifiers(stateValue: StateValue): StateValue;
    mapApiIdentifiersToStorageValue(stateValue: StateValue): StateValue;
    mapStorageHistoryValueToApiIdentifiers(stateHistoryValue: StateHistoryValue): StateHistoryValue;
    mapApiIdentifiersToStorageHistoryValue(stateHistoryValue: StateHistoryValue): StateHistoryValue;
    public stateKeyToData(stateKey: string): StateData;
    public get apiIdentifierToStateKeyMap(): Record<string, string>;
    public populateStateMaps(states: StateBlob[], path: string[]): void;
}
export declare function stateValueFromPath(path: string[]): StateValue;
export declare function flattenStateValue(state: StateValue): string[];
