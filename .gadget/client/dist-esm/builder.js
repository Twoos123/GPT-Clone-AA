import { actionRunner, findManyRunner, findOneByFieldRunner, findOneRunner, globalActionRunner } from "@gadgetinc/api-client-core";
const buildModelManager = (apiIdentifier, pluralApiIdentifier, defaultSelection, operationGroup) => {
  const modelManagerClass = class {
    constructor(connection) {
      this.connection = connection;
    }
  };
  Object.defineProperty(modelManagerClass, "name", { value: `${apiIdentifier}Manager` });
  for (const operation of operationGroup) {
    switch (operation.type) {
      case "maybeFindOne":
      case "findOne": {
        const throwOnRecordNotFound = !operation.type.startsWith("maybe");
        if ("functionName" in operation) {
          modelManagerClass.prototype[operation.functionName] = Object.assign(
            function(value, options) {
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
            operation
          );
        } else {
          modelManagerClass.prototype[operation.type] = Object.assign(
            function(id, options) {
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
              return forEachMaybeLiveResponse(response, (record) => record.isEmpty() ? null : record);
            },
            operation
          );
        }
        break;
      }
      case "findMany": {
        modelManagerClass.prototype.findMany = Object.assign(function(options) {
          return findManyRunner(this, pluralApiIdentifier, defaultSelection, apiIdentifier, options, void 0, operation.namespace);
        }, operation);
        break;
      }
      case "maybeFindFirst":
      case "findFirst": {
        modelManagerClass.prototype[operation.type] = Object.assign(function(options) {
          const response = findManyRunner(
            this,
            pluralApiIdentifier,
            defaultSelection,
            apiIdentifier,
            {
              ...options,
              first: 1,
              last: void 0,
              before: void 0,
              after: void 0
            },
            operation.type != "maybeFindFirst",
            operation.namespace
          );
          return forEachMaybeLiveResponse(response, (list) => list?.[0] ?? null);
        }, operation);
        break;
      }
      case "get": {
        modelManagerClass.prototype.get = Object.assign(function(options) {
          return findOneRunner(
            this,
            operation.operationName,
            void 0,
            defaultSelection,
            apiIdentifier,
            options,
            void 0,
            operation.namespace
          );
        }, operation);
        break;
      }
      case "action": {
        if (operation.isBulk) {
          const bulkInvokedByIDOnly = !!operation.variables["ids"];
          modelManagerClass.prototype[operation.functionName] = Object.assign(
            async function(inputs, options) {
              let variables;
              if (bulkInvokedByIDOnly) {
                variables = {
                  ids: {
                    ...operation.variables["ids"],
                    value: inputs
                  }
                };
              } else {
                variables = {
                  inputs: {
                    ...operation.variables["inputs"],
                    value: inputs.map(
                      (input) => disambiguateActionParams(this[operation.singleActionFunctionName], void 0, input)
                    )
                  }
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
                operation.hasReturnType
              );
            },
            operation
          );
        } else {
          const hasId = !!operation.variables["id"];
          const hasOthers = Object.keys(operation.variables).filter((key) => key != "id").length > 0;
          modelManagerClass.prototype[operation.functionName] = Object.assign(
            async function(...args) {
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
                operation.hasReturnType
              );
            },
            operation
          );
        }
        break;
      }
      case "stubbedAction": {
        modelManagerClass.prototype[operation.functionName] = Object.assign(function(..._args) {
          throw new Error(operation.errorMessage);
        }, operation);
        break;
      }
    }
  }
  return modelManagerClass;
};
const buildGlobalAction = (client, operation) => {
  if (operation.type == "stubbedAction") {
    return Object.assign((..._args) => {
      throw new Error(operation.errorMessage);
    }, operation);
  } else {
    return Object.assign(async (variables = {}) => {
      const resultVariables = {};
      for (const [name, variable] of Object.entries(operation.variables)) {
        resultVariables[name] = {
          value: variables[name],
          ...variable
        };
      }
      return await globalActionRunner(client.connection, operation.operationName, resultVariables, operation.namespace);
    }, operation);
  }
};
function disambiguateActionParams(action, idValue, variables = {}) {
  if (action.hasAmbiguousIdentifier) {
    if (Object.keys(variables).some((key) => !action.paramOnlyVariables?.includes(key) && key !== action.modelApiIdentifier)) {
      throw Error(`Invalid arguments found in variables. Did you mean to use ({ ${action.modelApiIdentifier}: { ... } })?`);
    }
  }
  let newVariables;
  const idVariable = Object.entries(action.variables).find(([key, value]) => key === "id" && value.type === "GadgetID");
  if (action.acceptsModelInput || action.hasCreateOrUpdateEffect) {
    if (action.modelApiIdentifier in variables && typeof variables[action.modelApiIdentifier] === "object" && variables[action.modelApiIdentifier] !== null || !action.variables[action.modelApiIdentifier]) {
      newVariables = variables;
    } else {
      newVariables = {
        [action.modelApiIdentifier]: {}
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
  newVariables["id"] ?? (newVariables["id"] = idValue);
  return newVariables;
}
function actionArgs(operation, hasId, hasOthers, args) {
  let id = void 0;
  let params = void 0;
  if (hasId) {
    id = args.shift();
  }
  if (hasOthers) {
    params = args.shift();
  }
  const options = args.shift();
  let unambiguousParams = params;
  if (id || params) {
    unambiguousParams = disambiguateActionParams(operation, id, params);
  }
  const resultVariables = {};
  for (const [name, variable] of Object.entries(operation.variables)) {
    resultVariables[name] = {
      value: name == "id" ? id : unambiguousParams?.[name],
      ...variable
    };
  }
  return [resultVariables, options];
}
function forEachMaybeLiveResponse(response, transform) {
  if (Symbol.asyncIterator in response) {
    return {
      [Symbol.asyncIterator]: async function* () {
        for await (const item of response) {
          yield transform(item);
        }
      }
    };
  } else {
    return response.then(transform);
  }
}
export {
  buildGlobalAction,
  buildModelManager
};
//# sourceMappingURL=builder.js.map
