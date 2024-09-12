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
var Chat_exports = {};
__export(Chat_exports, {
  ChatManager: () => ChatManager,
  DefaultChatSelection: () => DefaultChatSelection
});
module.exports = __toCommonJS(Chat_exports);
var import_api_client_core = require("@gadgetinc/api-client-core");
var import_support = require("../support.js");
const DefaultChatSelection = {
  "__typename": true,
  "createdAt": true,
  "id": true,
  "name": true,
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
;
const apiIdentifier = "chat";
const pluralApiIdentifier = "chats";
async function createChat(variables, options) {
  const newVariables = (0, import_support.disambiguateActionParams)(
    this["create"],
    void 0,
    variables
  );
  return await (0, import_api_client_core.actionRunner)(
    this,
    "createChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      "chat": {
        value: newVariables.chat,
        required: false,
        type: "CreateChatInput"
      }
    },
    options,
    null,
    false
  );
}
async function updateChat(id, variables, options) {
  const newVariables = (0, import_support.disambiguateActionParams)(
    this["update"],
    id,
    variables
  );
  return await (0, import_api_client_core.actionRunner)(
    this,
    "updateChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      id: {
        value: id,
        required: true,
        type: "GadgetID"
      },
      "chat": {
        value: newVariables.chat,
        required: false,
        type: "UpdateChatInput"
      }
    },
    options,
    null,
    false
  );
}
async function deleteChat(id, options) {
  return await (0, import_api_client_core.actionRunner)(
    this,
    "deleteChat",
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
async function nameChat(id, variables, options) {
  const newVariables = (0, import_support.disambiguateActionParams)(
    this["name"],
    id,
    variables
  );
  return await (0, import_api_client_core.actionRunner)(
    this,
    "nameChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
      id: {
        value: id,
        required: true,
        type: "GadgetID"
      },
      "chat": {
        value: newVariables.chat,
        required: false,
        type: "NameChatInput"
      },
      "firstMessage": {
        value: newVariables.firstMessage,
        required: false,
        type: "String"
      }
    },
    options,
    null,
    false
  );
}
class ChatManager {
  constructor(connection) {
    this.connection = connection;
    /**
    * Finds one chat by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findOne = Object.assign(
      async (id, options) => {
        return await (0, import_api_client_core.findOneRunner)(
          this,
          "chat",
          id,
          DefaultChatSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "chat",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultChatSelection
      }
    );
    /**
    * Finds one chat by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.maybeFindOne = Object.assign(
      async (id, options) => {
        const record = await (0, import_api_client_core.findOneRunner)(
          this,
          "chat",
          id,
          DefaultChatSelection,
          apiIdentifier,
          options,
          false
        );
        return record.isEmpty() ? null : record;
      },
      {
        type: "maybeFindOne",
        findByVariableName: "id",
        operationName: "chat",
        modelApiIdentifier: "chat",
        defaultSelection: DefaultChatSelection
      }
    );
    /**
    * Finds many chat. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findMany = Object.assign(
      async (options) => {
        return await (0, import_api_client_core.findManyRunner)(
          this,
          "chats",
          DefaultChatSelection,
          "chat",
          options
        );
      },
      {
        type: "findMany",
        operationName: "chats",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultChatSelection
      }
    );
    /**
    * Finds the first matching chat. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
    **/
    this.findFirst = Object.assign(
      async (options) => {
        const list = await (0, import_api_client_core.findManyRunner)(
          this,
          "chats",
          DefaultChatSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          true
        );
        return list[0];
      },
      {
        type: "findFirst",
        operationName: "chats",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultChatSelection
      }
    );
    /**
    * Finds the first matching chat. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
    **/
    this.maybeFindFirst = Object.assign(
      async (options) => {
        const list = await (0, import_api_client_core.findManyRunner)(
          this,
          "chats",
          DefaultChatSelection,
          apiIdentifier,
          { ...options, first: 1, last: void 0, before: void 0, after: void 0 },
          false
        );
        return (list == null ? void 0 : list[0]) ?? null;
      },
      {
        type: "maybeFindFirst",
        operationName: "chats",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultChatSelection
      }
    );
    /**
    * Finds one chat by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
    **/
    this.findById = Object.assign(
      async (value, options) => {
        return await (0, import_api_client_core.findOneByFieldRunner)(
          this,
          "chats",
          "id",
          value,
          DefaultChatSelection,
          apiIdentifier,
          options
        );
      },
      {
        type: "findOne",
        findByVariableName: "id",
        operationName: "chats",
        modelApiIdentifier: apiIdentifier,
        defaultSelection: DefaultChatSelection
      }
    );
    this.create = Object.assign(
      createChat,
      {
        type: "action",
        operationName: "createChat",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultChatSelection,
        variables: {
          "chat": {
            required: false,
            type: "CreateChatInput"
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
          (input) => (0, import_support.disambiguateActionParams)(
            this["create"],
            void 0,
            input
          )
        );
        return await (0, import_api_client_core.actionRunner)(
          this,
          "bulkCreateChats",
          DefaultChatSelection,
          "chat",
          "chats",
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
        operationName: "bulkCreateChats",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "chats",
        isBulk: true,
        defaultSelection: DefaultChatSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkCreateChatsInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    this.update = Object.assign(
      updateChat,
      {
        type: "action",
        operationName: "updateChat",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultChatSelection,
        variables: {
          id: {
            required: true,
            type: "GadgetID"
          },
          "chat": {
            required: false,
            type: "UpdateChatInput"
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
          (input) => (0, import_support.disambiguateActionParams)(
            this["update"],
            void 0,
            input
          )
        );
        return await (0, import_api_client_core.actionRunner)(
          this,
          "bulkUpdateChats",
          DefaultChatSelection,
          "chat",
          "chats",
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
        operationName: "bulkUpdateChats",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "chats",
        isBulk: true,
        defaultSelection: DefaultChatSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkUpdateChatsInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    this.delete = Object.assign(
      deleteChat,
      {
        type: "action",
        operationName: "deleteChat",
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
        return await (0, import_api_client_core.actionRunner)(
          this,
          "bulkDeleteChats",
          null,
          "chat",
          "chats",
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
        operationName: "bulkDeleteChats",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "chats",
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
    this.name = Object.assign(
      nameChat,
      {
        type: "action",
        operationName: "nameChat",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: apiIdentifier,
        isBulk: false,
        defaultSelection: DefaultChatSelection,
        variables: {
          id: {
            required: true,
            type: "GadgetID"
          },
          "chat": {
            required: false,
            type: "NameChatInput"
          },
          "firstMessage": {
            required: false,
            type: "String"
          }
        },
        hasAmbiguousIdentifier: false,
        /** @deprecated -- effects are dead, long live AAC */
        hasCreateOrUpdateEffect: true,
        paramOnlyVariables: ["firstMessage"],
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
    /**
    * Executes the bulkName action with the given inputs.
    */
    this.bulkName = Object.assign(
      async (inputs, options) => {
        const fullyQualifiedInputs = inputs.map(
          (input) => (0, import_support.disambiguateActionParams)(
            this["name"],
            void 0,
            input
          )
        );
        return await (0, import_api_client_core.actionRunner)(
          this,
          "bulkNameChats",
          DefaultChatSelection,
          "chat",
          "chats",
          true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkName"].variables["inputs"]
            }
          },
          options,
          null,
          false
        );
      },
      {
        type: "action",
        operationName: "bulkNameChats",
        namespace: null,
        modelApiIdentifier: apiIdentifier,
        modelSelectionField: "chats",
        isBulk: true,
        defaultSelection: DefaultChatSelection,
        variables: {
          inputs: {
            required: true,
            type: "[BulkNameChatsInput!]"
          }
        },
        hasReturnType: false,
        acceptsModelInput: true
      }
    );
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChatManager,
  DefaultChatSelection
});
//# sourceMappingURL=Chat.js.map
