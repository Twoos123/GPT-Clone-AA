import type {
  ActionFunctionMetadata,
  AnyActionFunction,
  AnyModelFinderMetadata,
  AnyModelManager,
  BaseFindOptions,
  FieldSelection,
  FindManyOptions,
  GadgetConnection,
  GadgetRecord,
  VariablesOptions,
} from "@gadgetinc/api-client-core";
import { actionRunner, findManyRunner, findOneByFieldRunner, findOneRunner, globalActionRunner } from "@gadgetinc/api-client-core";

/**
 * The metadata that we need for building the runtime version of a finderoperation
 * Excludes the type-time only keys
 */
export type AnyModelFinderRuntimeMetadata = Omit<AnyModelFinderMetadata, "schemaType" | "optionsType" | "variablesType" | "selectionType">;

/**
 * The metadata that we need for building the runtime version of a finder operation
 * Excludes the type-time only keys
 */
export type AnyActionFunctionRuntimeMetadata = Omit<
  ActionFunctionMetadata<any, any, any, any, any, any>,
  "schemaType" | "optionsType" | "variablesType" | "selectionType"
>;

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

export type ModelManagerOperation =
  | FindOneOperation
  | MaybeFindOneOperation
  | FindManyOperation
  | FindFirstOperation
  | MaybeFindFirstOperation
  | FindOneByFieldOperation
  | MaybeFindOneByFieldOperation
  | SingletonGetOperation
  | ActionOperation
  | BulkActionOperation
  | StubbedActionOperation;

/**
 * Construct a model manager class out of the metadatas generated on the server
 **/
export const buildModelManager = (
  apiIdentifier: string,
  pluralApiIdentifier: string,
  defaultSelection: FieldSelection,
  operationGroup: ModelManagerOperation[] | readonly ModelManagerOperation[]
): AnyModelManager => {
  const modelManagerClass = class {
    constructor(public readonly connection: GadgetConnection) {}
  } as unknown as { prototype: AnyModelManager; new (connection: GadgetConnection): AnyModelManager };
  Object.defineProperty(modelManagerClass, "name", { value: `${apiIdentifier}Manager` });

  for (const operation of operationGroup) {
    switch (operation.type) {
      case "maybeFindOne":
      case "findOne": {
        const throwOnRecordNotFound = !operation.type.startsWith("maybe");

        if ("functionName" in operation) {
          (modelManagerClass.prototype as any)[operation.functionName] = Object.assign(function (
            this: AnyModelManager,
            value: string,
            options?: BaseFindOptions
          ) {
            return findOneByFieldRunner(
              this,
              operation.operationName,
              operation.findByField,
              value,
              defaultSelection,
              apiIdentifier,

              options,
              throwOnRecordNotFound,
              operation.namespace
            );
          },
          operation as unknown as AnyModelFinderMetadata);
        } else {
          modelManagerClass.prototype[operation.type] = Object.assign(function (
            this: AnyModelManager,
            id: string,
            options?: BaseFindOptions
          ) {
            const response = findOneRunner(
              this,
              apiIdentifier,
              id,
              defaultSelection,
              apiIdentifier,
              options,
              throwOnRecordNotFound,
              operation.namespace
            );
            return forEachMaybeLiveResponse(response, (record: GadgetRecord<any>) => (record.isEmpty() ? null : record));
          },
          operation as unknown as AnyModelFinderMetadata);
        }
        break;
      }

      case "findMany": {
        modelManagerClass.prototype.findMany = Object.assign(function (this: AnyModelManager, options?: FindManyOptions) {
          return findManyRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, undefined, operation.namespace);
        }, operation as unknown as AnyModelFinderMetadata);
        break;
      }
      case "maybeFindFirst":
      case "findFirst": {
        modelManagerClass.prototype[operation.type] = Object.assign(function (this: AnyModelManager, options?: BaseFindOptions) {
          const response = findManyRunner(
            this,
            pluralApiIdentifier,
            defaultSelection,
            apiIdentifier,
            {
              ...options,
              first: 1,
              last: undefined,
              before: undefined,
              after: undefined,
            },
            operation.type != "maybeFindFirst",
            operation.namespace
          );
          return forEachMaybeLiveResponse(response, (list: GadgetRecord<any>[]) => list?.[0] ?? null);
        }, operation as unknown as AnyModelFinderMetadata);
        break;
      }

      case "get": {
        (modelManagerClass.prototype as any).get = Object.assign(function (this: AnyModelManager, options?: BaseFindOptions) {
          return findOneRunner(
            this,
            operation.operationName,
            undefined,
            defaultSelection,
            apiIdentifier,
            options,
            undefined,
            operation.namespace
          );
        }, operation as unknown as AnyModelFinderMetadata);
        break;
      }
      case "action": {
        if (operation.isBulk) {
          const bulkInvokedByIDOnly = !!operation.variables["ids"];

          (modelManagerClass.prototype as any)[operation.functionName] = Object.assign(async function (
            this: AnyModelManager,
            inputs: string[] | Record<string, unknown>[],
            options?: BaseFindOptions
          ) {
            let variables;
            if (bulkInvokedByIDOnly) {
              variables = {
                ids: {
                  ...operation.variables["ids"],
                  value: inputs,
                },
              };
            } else {
              variables = {
                inputs: {
                  ...operation.variables["inputs"],
                  value: (inputs as Record<string, unknown>[]).map((input) =>
                    disambiguateActionParams((this as any)[(operation as BulkActionOperation).singleActionFunctionName], undefined, input)
                  ),
                },
              };
            }

            return await actionRunner(
              this,
              operation.operationName,
              operation.isDeleter ? null : defaultSelection,
              apiIdentifier,
              operation.modelSelectionField,
              true,
              variables,
              options,
              operation.namespace,
              operation.hasReturnType as any
            );
          },
          operation as unknown as AnyModelFinderMetadata);
        } else {
          const hasId = !!operation.variables["id"];
          const hasOthers = Object.keys(operation.variables).filter((key) => key != "id").length > 0;
          (modelManagerClass.prototype as any)[operation.functionName] = Object.assign(async function (
            this: AnyModelManager,
            ...args: (string | Record<string, unknown> | BaseFindOptions)[]
          ) {
            const [variables, options] = actionArgs(operation, hasId, hasOthers, args);

            return await actionRunner(
              this,
              operation.operationName,
              operation.isDeleter ? null : defaultSelection,
              apiIdentifier,
              operation.modelSelectionField,
              false,
              variables,
              options,
              operation.namespace,
              operation.hasReturnType as any
            );
          },
          operation as unknown as AnyModelFinderMetadata);
        }
        break;
      }
      case "stubbedAction": {
        (modelManagerClass.prototype as any)[operation.functionName] = Object.assign(function (this: AnyModelManager, ..._args: any) {
          throw new Error(operation.errorMessage);
        }, operation as unknown as AnyModelFinderMetadata);
        break;
      }
    }
  }

  return modelManagerClass as any;
};

export const buildGlobalAction = (
  client: { connection: GadgetConnection },
  operation: GlobalActionOperation | StubbedActionOperation
): AnyActionFunction => {
  if (operation.type == "stubbedAction") {
    return Object.assign((..._args: any[]) => {
      throw new Error(operation.errorMessage);
    }, operation) as any;
  } else {
    return Object.assign(async (variables: Record<string, any> = {}) => {
      const resultVariables: VariablesOptions = {};
      for (const [name, variable] of Object.entries(operation.variables)) {
        resultVariables[name] = {
          value: variables[name],
          ...variable,
        };
      }

      return await globalActionRunner(client.connection, operation.operationName, resultVariables, operation.namespace);
    }, operation) as any;
  }
};

/**
 * Maps the variables passed from a call to the client to the variables the GraphQL API is expecting
 *
 * For actions which accept a model input, the GraphQL API expects the variables to be passed like
 *  id: 123,
 *  widget: { fieldA: "a", fieldB: "b" },
 *  extraParam: "C"
 *
 * For convenience, we allow actions to be invoked like
 *   await api.widget.update("123", {fieldA: "a", fieldB: "b", extraParam: "C"})
 *
 * This function re-nests the model input variables under a key for the model's api identifier, being careful to leave root level params alone.
 **/
function disambiguateActionParams<Action extends AnyActionFunctionRuntimeMetadata>(
  action: Action,
  idValue: string | undefined,
  variables: Record<string, any> = {}
): Record<string, any> {
  if (action.hasAmbiguousIdentifier) {
    if (Object.keys(variables).some((key) => !action.paramOnlyVariables?.includes(key) && key !== action.modelApiIdentifier)) {
      throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
    }
  }

  let newVariables: Record<string, any>;
  const idVariable = Object.entries(action.variables).find(([key, value]) => key === "id" && value.type === "GadgetID");

  if ((action as any).acceptsModelInput || action.hasCreateOrUpdateEffect) {
    if (
      (action.modelApiIdentifier in variables &&
        typeof variables[action.modelApiIdentifier] === "object" &&
        variables[action.modelApiIdentifier] !== null) ||
      !action.variables[action.modelApiIdentifier]
    ) {
      newVariables = variables;
    } else {
      newVariables = {
        [action.modelApiIdentifier]: {},
      };
      for (const [key, value] of Object.entries(variables)) {
        if (action.paramOnlyVariables?.includes(key)) {
          newVariables[key] = value;
        } else {
          if (idVariable && key === idVariable[0]) {
            newVariables["id"] = value;
          } else {
            newVariables[action.modelApiIdentifier][key] = value;
          }
        }
      }
    }
  } else {
    newVariables = variables;
  }

  newVariables["id"] ??= idValue as any;

  return newVariables;
}

/** Split out the arguments to a call to an action */
function actionArgs(
  operation: AnyActionFunctionRuntimeMetadata,
  hasId: boolean,
  hasOthers: boolean,
  args: (string | Record<string, unknown> | BaseFindOptions)[]
): [variables: VariablesOptions, options?: BaseFindOptions] {
  let id: string | undefined = undefined;
  let params: Record<string, unknown> | undefined = undefined;

  if (hasId) {
    id = args.shift() as string | undefined;
  }
  if (hasOthers) {
    params = args.shift() as Record<string, unknown> | undefined;
  }
  const options = args.shift() as BaseFindOptions;

  let unambiguousParams = params;
  if (id || params) {
    unambiguousParams = disambiguateActionParams(operation, id, params);
  }

  const resultVariables: VariablesOptions = {};
  for (const [name, variable] of Object.entries(operation.variables)) {
    resultVariables[name] = {
      value: name == "id" ? id : unambiguousParams?.[name],
      ...variable,
    };
  }

  return [resultVariables, options];
}

/** Given a result from a finder function that is either a promise for one value or an async iterator over many values, transform each value using a function, returning the same cardinality as the input */
function forEachMaybeLiveResponse<Item, Result>(response: AsyncIterable<Item>, transform: (item: Item) => Result): AsyncIterable<Result>;
function forEachMaybeLiveResponse<Item, Result>(response: Promise<Item>, transform: (item: Item) => Result): Promise<Result>;
function forEachMaybeLiveResponse<Item, Result>(
  response: AsyncIterable<Item> | Promise<Item>,
  transform: (item: Item) => Result
): AsyncIterable<Result> | Promise<Result> {
  if (Symbol.asyncIterator in response) {
    return {
      [Symbol.asyncIterator]: async function* () {
        for await (const item of response) {
          yield transform(item);
        }
      },
    };
  } else {
    return response.then(transform);
  }
}
