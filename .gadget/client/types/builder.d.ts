import type { ActionFunctionMetadata, AnyActionFunction, AnyModelFinderMetadata, AnyModelManager, FieldSelection, GadgetConnection, VariablesOptions } from "@gadgetinc/api-client-core";
/**
 * The metadata that we need for building the runtime version of a finderoperation
 * Excludes the type-time only keys
 */
export type AnyModelFinderRuntimeMetadata = Omit<AnyModelFinderMetadata, "schemaType" | "optionsType" | "variablesType" | "selectionType">;
/**
 * The metadata that we need for building the runtime version of a finder operation
 * Excludes the type-time only keys
 */
export type AnyActionFunctionRuntimeMetadata = Omit<ActionFunctionMetadata<any, any, any, any, any, any>, "schemaType" | "optionsType" | "variablesType" | "selectionType">;
export type FindOneOperation = {
    type: "findOne";
    findByVariableName: "id";
} & AnyModelFinderRuntimeMetadata;
export type MaybeFindOneOperation = {
    type: "maybeFindOne";
    findByVariableName: "id";
} & AnyModelFinderRuntimeMetadata;
export type FindManyOperation = {
    type: "findMany";
} & AnyModelFinderRuntimeMetadata;
export type FindFirstOperation = {
    type: "findFirst";
} & AnyModelFinderRuntimeMetadata;
export type MaybeFindFirstOperation = {
    type: "maybeFindFirst";
} & AnyModelFinderRuntimeMetadata;
export type FindOneByFieldOperation = {
    type: "findOne";
    findByVariableName: string;
    findByField: string;
    functionName: string;
} & AnyModelFinderRuntimeMetadata;
export type MaybeFindOneByFieldOperation = {
    type: "maybeFindOne";
    findByVariableName: string;
    findByField: string;
    functionName: string;
} & AnyModelFinderRuntimeMetadata;
export type SingletonGetOperation = {
    type: "get";
} & AnyModelFinderRuntimeMetadata;
export type ActionOperation = {
    type: "action";
    functionName: string;
    isBulk: false;
    isDeleter: boolean;
} & AnyActionFunctionRuntimeMetadata;
export type BulkActionOperation = {
    type: "action";
    functionName: string;
    isBulk: true;
    singleActionFunctionName: string;
    isDeleter: boolean;
} & AnyActionFunctionRuntimeMetadata;
export type GlobalActionOperation = {
    type: "globalAction";
    functionName: string;
    operationName: string;
    namespace: string | string[] | null;
    variables: VariablesOptions;
};
export type StubbedActionOperation = {
    type: "stubbedAction";
    functionName: string;
    operationName?: string;
    errorMessage: string;
    modelApiIdentifier?: string;
};
export type ModelManagerOperation = FindOneOperation | MaybeFindOneOperation | FindManyOperation | FindFirstOperation | MaybeFindFirstOperation | FindOneByFieldOperation | MaybeFindOneByFieldOperation | SingletonGetOperation | ActionOperation | BulkActionOperation | StubbedActionOperation;
/**
 * Construct a model manager class out of the metadatas generated on the server
 **/
export declare const buildModelManager: (apiIdentifier: string, pluralApiIdentifier: string, defaultSelection: FieldSelection, operationGroup: ModelManagerOperation[] | readonly ModelManagerOperation[]) => AnyModelManager;
export declare const buildGlobalAction: (client: {
    connection: GadgetConnection;
}, operation: GlobalActionOperation | StubbedActionOperation) => AnyActionFunction;
