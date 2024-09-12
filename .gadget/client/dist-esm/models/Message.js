import {
  actionRunner,
  findManyRunner,
  findOneRunner,
  findOneByFieldRunner
} from "@gadgetinc/api-client-core";
import { disambiguateActionParams } from "../support.js";
const DefaultMessageSelection = {
  "__typename": true,
  "content": true,
  "createdAt": true,
  "id": true,
  "order": true,
  "role": true,
  "updatedAt": true
};
;
;
;
;
;
;
;
;
const apiIdentifier = "message";
const pluralApiIdentifier = "messages";
async function createMessage(variables, options) {
  const newVariables = disambiguateActionParams(
    this["create"],
    void 0,
    variables
  );
  return await actionRunner(
    this,
    "createMessage",
    DefaultMessageSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      "message": {
        value: newVariables.message,
        required: false,
        type: "CreateMessageInput"
      }
    },
    options,
    null,
    false
  );
}
async function updateMessage(id, variables, options) {
  const newVariables = disambiguateActionParams(
    this["update"],
    id,
    variables
  );
  return await actionRunner(
    this,
    "updateMessage",
    DefaultMessageSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      id: {
        value: id,
        required: true,
        type: "GadgetID"
      },
      "message": {
        value: newVariables.message,
        required: false,
        type: "UpdateMessageInput"
      }
    },
    options,
    null,
    false
  );
}
async function deleteMessage(id, options) {
  return await actionRunner(
    this,
    "deleteMessage",
    null,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      id: {
        value: id,
        required: true,
        type: "GadgetID"
      }
    },
    options,
    null,
    false
  );
}
class MessageManager {
  constructor(connection) {
    this.connection = connection;
    /**
    * Finds one message by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findOne = Object.assign(
      async (id, options) => {
        return await findOneRunner(
          this,
          "message",
          id,
          DefaultMessageSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "message",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds one message by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.maybeFindOne = Object.assign(
      async (id, options) => {
        const record = await findOneRunner(
          this,
          "message",
          id,
          DefaultMessageSelection,
          apiIdentifier,
          options,
          false
        );
        return record.isEmpty() ? null : record;
      },
      {
        type: "maybeFindOne",
        findByVariableName: "id",
        operationName: "message",
        modelApiIdentifier: "message",
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds many message. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findMany = Object.assign(
      async (options) => {
        return await findManyRunner(
          this,
          "messages",
          DefaultMessageSelection,
          "message",
          options
        );
      },
      {
        type: "findMany",
        operationName: "messages",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds the first matching message. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "messages",
          DefaultMessageSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          true
        );
        return list[0];
      },
      {
        type: "findFirst",
        operationName: "messages",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds the first matching message. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
    **/
    this.maybeFindFirst = Object.assign(
      async (options) => {
        const list = await findManyRunner(
          this,
          "messages",
          DefaultMessageSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          false
        );
        return list?.[0] ?? null;
      },
      {
        type: "maybeFindFirst",
        operationName: "messages",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds one message by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findById = Object.assign(
      async (value, options) => {
        return await findOneByFieldRunner(
          this,
          "messages",
          "id",
          value,
          DefaultMessageSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "messages",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    /**
    * Finds one message by its order. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findByOrder = Object.assign(
      async (value, options) => {
        return await findOneByFieldRunner(
          this,
          "messages",
          "order",
          value,
          DefaultMessageSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "order",
        operationName: "messages",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultMessageSelection
      }
    );
    this.create = Object.assign(
      createMessage,
      {
        type: "action",
        operationName: "createMessage",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultMessageSelection,
        variables: {
          "message": {
            required: false,
            type: "CreateMessageInput"
          }
        },
        hasAmbiguousIdentifier: false,
        /** @deprecated -- effects are dead, long live AAC */
        hasCreateOrUpdateEffect: true,
        paramOnlyVariables: [],
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    /**
    * Executes the bulkCreate action with the given inputs.
    */
    this.bulkCreate = Object.assign(
      async (inputs, options) => {
        const fullyQualifiedInputs = inputs.map(
          (input) => disambiguateActionParams(
            this["create"],
            void 0,
            input
          )
        );
        return await actionRunner(
          this,
          "bulkCreateMessages",
          DefaultMessageSelection,
          "message",
          "messages",
          true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkCreate"].variables["inputs"]
            }
          },
          options,
          null,
          false
        );
      },
      {
        type: "action",
        operationName: "bulkCreateMessages",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "messages",
        isBulk: true,
        defaultSelection: DefaultMessageSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkCreateMessagesInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    this.update = Object.assign(
      updateMessage,
      {
        type: "action",
        operationName: "updateMessage",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultMessageSelection,
        variables: {
          id: {
            required: true,
            type: "GadgetID"
          },
          "message": {
            required: false,
            type: "UpdateMessageInput"
          }
        },
        hasAmbiguousIdentifier: false,
        /** @deprecated -- effects are dead, long live AAC */
        hasCreateOrUpdateEffect: true,
        paramOnlyVariables: [],
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    /**
    * Executes the bulkUpdate action with the given inputs.
    */
    this.bulkUpdate = Object.assign(
      async (inputs, options) => {
        const fullyQualifiedInputs = inputs.map(
          (input) => disambiguateActionParams(
            this["update"],
            void 0,
            input
          )
        );
        return await actionRunner(
          this,
          "bulkUpdateMessages",
          DefaultMessageSelection,
          "message",
          "messages",
          true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkUpdate"].variables["inputs"]
            }
          },
          options,
          null,
          false
        );
      },
      {
        type: "action",
        operationName: "bulkUpdateMessages",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "messages",
        isBulk: true,
        defaultSelection: DefaultMessageSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkUpdateMessagesInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    this.delete = Object.assign(
      deleteMessage,
      {
        type: "action",
        operationName: "deleteMessage",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: null,
        variables: {
          id: {
            required: true,
            type: "GadgetID"
          }
        },
        hasAmbiguousIdentifier: false,
        /** @deprecated -- effects are dead, long live AAC */
        hasCreateOrUpdateEffect: false,
        paramOnlyVariables: [],
        hasReturnType: false,
        acceptsModelInput: false
      }
    );
    /**
    * Executes the bulkDelete action with the given inputs. Deletes the records on the server.
    */
    this.bulkDelete = Object.assign(
      async (ids, options) => {
        return await actionRunner(
          this,
          "bulkDeleteMessages",
          null,
          "message",
          "messages",
          true,
          {
            ids: {
              value: ids,
              ...this["bulkDelete"].variables["ids"]
            }
          },
          options,
          null,
          false
        );
      },
      {
        type: "action",
        operationName: "bulkDeleteMessages",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "messages",
        isBulk: true,
        defaultSelection: null,
        variables: {
          ids: {
            required: true,
            type: "[GadgetID!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: false
      }
    );
  }
}
export {
  DefaultMessageSelection,
  MessageManager
};
//# sourceMappingURL=Message.js.map
