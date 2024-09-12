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
var effects_exports = {};
__export(effects_exports, {
  FieldType: () => FieldType,
  LINK_PARAM: () => LINK_PARAM,
  applyParams: () => applyParams,
  changedAttributes: () => changedAttributes,
  createGadgetRecord: () => createGadgetRecord,
  deleteRecord: () => deleteRecord,
  doesVersionSupportSourceControl: () => doesVersionSupportSourceControl,
  getActionContextFromLocalStorage: () => getActionContextFromLocalStorage,
  getBelongsToRelationParams: () => getBelongsToRelationParams,
  getCurrentContext: () => getCurrentContext,
  getModelByApiIdentifier: () => getModelByApiIdentifier,
  getModelByTypename: () => getModelByTypename,
  internalModelManagerForModel: () => internalModelManagerForModel,
  internalModelManagerForTypename: () => internalModelManagerForTypename,
  legacySetUser: () => legacySetUser,
  legacySuccessfulAuthentication: () => legacySuccessfulAuthentication,
  legacyUnsetUser: () => legacyUnsetUser,
  maybeGetActionContextFromLocalStorage: () => maybeGetActionContextFromLocalStorage,
  save: () => save,
  transitionState: () => transitionState,
  writableAttributes: () => writableAttributes
});
module.exports = __toCommonJS(effects_exports);
var import_api_client_core = require("@gadgetinc/api-client-core");
var import_errors = require("./errors");
var import_globals = require("./globals");
var import_metadata = require("./metadata");
var import_utils = require("./utils");
function getBelongsToRelationParams(model, params) {
  const belongsToParams = {};
  for (const field of Object.values(model.fields)) {
    if (field.fieldType != "BelongsTo")
      continue;
    const modelParams = typeof params[model.apiIdentifier] === "object" ? params[model.apiIdentifier] : void 0;
    const belongsToParam = modelParams && typeof modelParams[field.apiIdentifier] === "object" ? modelParams[field.apiIdentifier] : void 0;
    const belongsToId = belongsToParam?.[LINK_PARAM] !== void 0 ? belongsToParam[LINK_PARAM] : belongsToParam?.id;
    if (belongsToId !== void 0) {
      belongsToParams[`${field.apiIdentifier}Id`] = belongsToId;
    }
  }
  return belongsToParams;
}
function createGadgetRecord(apiIdentifier, data) {
  const model = getModelByApiIdentifier(apiIdentifier);
  return new import_api_client_core.GadgetRecord({
    ...data,
    __typename: model.graphqlTypeName
  });
}
function applyParams(params, record) {
  const model = getModelByTypename(record.__typename);
  Object.assign(record, params[model.apiIdentifier], getBelongsToRelationParams(model, params));
}
const internalModelManagerForModel = (api, apiIdentifier, namespace) => {
  const modelPath = [...namespace, apiIdentifier];
  const manager = import_globals.Globals.platformModules.lodash().get(api, ["internal", ...modelPath]);
  if (!manager) {
    throw new import_errors.InternalError(
      `Gadget needs but can't find an internal model manager for ${modelPath.join(
        "."
      )} on the API client -- has it finished regenerating or was it recently removed?`
    );
  }
  return manager;
};
const internalModelManagerForTypename = (api, typename) => {
  const model = getModelByTypename(typename);
  return internalModelManagerForModel(api, model.apiIdentifier, model.namespace);
};
async function save(record) {
  const context = maybeGetActionContextFromLocalStorage();
  const api = (0, import_utils.assert)(context ? context.api : getCurrentContext().api, "api client is missing from the current context");
  const model = getModelByTypename(record.__typename);
  await (await import_globals.Globals.modelValidator(model.key)).validate({ api, logger: import_globals.Globals.logger }, record);
  const internalModelManager = internalModelManagerForTypename(api, record.__typename);
  let result;
  if ("createdAt" in record && record.createdAt) {
    result = await internalModelManager.update(record.id, {
      [model.apiIdentifier]: changedAttributes(model, record)
    });
  } else {
    result = await internalModelManager.create({
      [model.apiIdentifier]: writableAttributes(model, record)
    });
  }
  Object.assign(record, { ...result });
  record.flushChanges(import_api_client_core.ChangeTracking.SinceLastPersisted);
}
async function deleteRecord(record) {
  const context = maybeGetActionContextFromLocalStorage();
  const api = (0, import_utils.assert)(context ? context.api : getCurrentContext().api, "api client is missing from the current context");
  const scope = context ? context.scope : {};
  const id = (0, import_utils.assert)(record.id, `record.id not set on record in scope, has the record been persisted?`);
  const internalModelManager = internalModelManagerForTypename(api, record.__typename);
  await internalModelManager.delete(id);
  scope.recordDeleted = true;
}
function transitionState(record, transition) {
  const model = getModelByTypename(record.__typename);
  const isShopifyModel = model.apiIdentifier === "shopifyShop" || model.apiIdentifier === "shopifySync" || model.apiIdentifier === "shopifyBulkOperation";
  if (isShopifyModel && doesVersionSupportSourceControl()) {
    return;
  }
  const stringRecordState = typeof record.state === "string" ? record.state : JSON.stringify(record.state);
  const stringTransitionFrom = typeof transition.from === "string" ? transition.from : JSON.stringify(transition.from);
  if (transition.from && stringRecordState !== stringTransitionFrom) {
    throw new import_errors.InvalidStateTransitionError(void 0, {
      state: record.state,
      expectedFrom: transition.from
    });
  }
  record.state = transition.to;
}
function legacySetUser() {
  const context = getActionContextFromLocalStorage();
  if (!context.scope.authenticatedUser) {
    throw new import_errors.UserNotSetOnSessionError(
      "The authenticated user could not be saved to the session when logging in. Make sure the user has a role assigned to them."
    );
  }
  if (!context.session) {
    throw new import_errors.NoSessionForAuthenticationError(
      "Unable to authenticate because the request was made with no session in context to transition."
    );
  }
  context.session.set("user", { [LINK_PARAM]: context.scope.authenticatedUser.id });
}
function legacyUnsetUser() {
  const context = getActionContextFromLocalStorage();
  if (!context.session) {
    throw new import_errors.NoSessionForAuthenticationError("Unable to unset users on session because the request was made with no session.");
  }
  context.session.delete("user");
}
async function legacySuccessfulAuthentication(params) {
  const context = getActionContextFromLocalStorage();
  const { api, scope } = context;
  const manager = api.internal.user;
  const user = (await manager.findMany({ filter: { email: { equals: params.email } } }))[0];
  let result = false;
  if (user && params.password && user.password?.hash) {
    if (await import_globals.Globals.platformModules.bcrypt().compare(params.password, user.password.hash)) {
      scope.authenticatedUser = user;
      result = true;
    }
  }
  import_globals.Globals.logger.info({ email: params.email, userId: user?.id, result }, "login attempt");
  if (!result) {
    throw new Error("Invalid email or password");
  }
}
function doesVersionSupportSourceControl() {
  return import_globals.Globals.platformModules.compareVersions().satisfies(import_metadata.frameworkVersion, ">=1.0.0");
}
function getActionContextFromLocalStorage() {
  return (0, import_utils.assert)(import_globals.actionContextLocalStorage.getStore(), "this effect function should only be called from within an action");
}
function maybeGetActionContextFromLocalStorage() {
  return import_globals.actionContextLocalStorage.getStore();
}
function getCurrentContext() {
  return (0, import_utils.assert)(import_globals.Globals.requestContext.get("requestContext"), "no gadget context found on request");
}
const LINK_PARAM = "_link";
function writableAttributes(model, record) {
  const fieldsByApiIdentifier = import_globals.Globals.platformModules.lodash().keyBy(Object.values(model.fields), "apiIdentifier");
  return import_globals.Globals.platformModules.lodash().pickBy(record, (v, k) => {
    const field = fieldsByApiIdentifier[k];
    if (!field)
      return false;
    const isRelationshipField = field.fieldType === "HasMany" /* HasMany */ || field.fieldType === "HasOne" /* HasOne */ || field.fieldType === "HasManyThrough" /* HasManyThrough */;
    if (isRelationshipField && v === null) {
      return false;
    }
    return field.internalWritable;
  });
}
function changedAttributes(model, record) {
  const changes = record.changes();
  const attributes = Object.keys(changes).reduce((attrs, key) => {
    attrs[key] = record[key];
    return attrs;
  }, {});
  return writableAttributes(model, attributes);
}
const getModelByApiIdentifier = (apiIdentifier) => {
  const typename = import_metadata.modelListIndex[`api:${apiIdentifier}`];
  if (!typename) {
    throw new import_errors.InternalError(`Model ${apiIdentifier} not found in available model metadata`, {
      availableApiIdentifiers: Object.keys(import_metadata.modelListIndex)
    });
  }
  return getModelByTypename(typename);
};
const getModelByTypename = (typename) => {
  if (!typename) {
    throw new import_errors.InternalError(`No typename found on record, __typename must be set for accessing model metadata`);
  }
  const model = import_metadata.modelsMap[typename];
  if (!model) {
    throw new import_errors.InternalError(`Model with typename ${typename} not found in available model metadata`, {
      availableTypenames: Object.keys(import_metadata.modelsMap)
    });
  }
  return model;
};
var FieldType = /* @__PURE__ */ ((FieldType2) => {
  FieldType2["ID"] = "ID";
  FieldType2["Number"] = "Number";
  FieldType2["String"] = "String";
  FieldType2["Enum"] = "Enum";
  FieldType2["RichText"] = "RichText";
  FieldType2["DateTime"] = "DateTime";
  FieldType2["Email"] = "Email";
  FieldType2["URL"] = "URL";
  FieldType2["Money"] = "Money";
  FieldType2["File"] = "File";
  FieldType2["Color"] = "Color";
  FieldType2["Password"] = "Password";
  FieldType2["Computed"] = "Computed";
  FieldType2["HasManyThrough"] = "HasManyThrough";
  FieldType2["BelongsTo"] = "BelongsTo";
  FieldType2["HasMany"] = "HasMany";
  FieldType2["HasOne"] = "HasOne";
  FieldType2["Boolean"] = "Boolean";
  FieldType2["Model"] = "Model";
  FieldType2["Object"] = "Object";
  FieldType2["Array"] = "Array";
  FieldType2["JSON"] = "JSON";
  FieldType2["Code"] = "Code";
  FieldType2["EncryptedString"] = "EncryptedString";
  FieldType2["Vector"] = "Vector";
  FieldType2["Any"] = "Any";
  FieldType2["Null"] = "Null";
  FieldType2["RecordState"] = "RecordState";
  FieldType2["RoleAssignments"] = "RoleAssignments";
  return FieldType2;
})(FieldType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldType,
  LINK_PARAM,
  applyParams,
  changedAttributes,
  createGadgetRecord,
  deleteRecord,
  doesVersionSupportSourceControl,
  getActionContextFromLocalStorage,
  getBelongsToRelationParams,
  getCurrentContext,
  getModelByApiIdentifier,
  getModelByTypename,
  internalModelManagerForModel,
  internalModelManagerForTypename,
  legacySetUser,
  legacySuccessfulAuthentication,
  legacyUnsetUser,
  maybeGetActionContextFromLocalStorage,
  save,
  transitionState,
  writableAttributes
});
//# sourceMappingURL=effects.js.map
