import type { AnyClient, InternalModelManager, RecordData } from "@gadgetinc/api-client-core";
import { ChangeTracking, GadgetRecord } from "@gadgetinc/api-client-core";
import { InternalError, InvalidStateTransitionError, NoSessionForAuthenticationError, UserNotSetOnSessionError } from "./errors";
import { Globals, actionContextLocalStorage } from "./globals";
import { frameworkVersion, modelListIndex, modelsMap } from "./metadata";
import type {
  AnyActionContext,
  AnyAmbientContext,
  AnyEffectContext,
  AnyGlobalActionContext,
  AnyParams,
  ModelMetadata,
  NotYetTyped,
} from "./types";
import { assert } from "./utils";

export function getBelongsToRelationParams(model: ModelMetadata, params: Record<string, any>): Record<string, any> {
  const belongsToParams: Record<string, any> = {};

  for (const field of Object.values(model.fields) as any[]) {
    if (field.fieldType != "BelongsTo") continue;
    const modelParams = typeof params[model.apiIdentifier] === "object" ? params[model.apiIdentifier] : undefined;
    const belongsToParam =
      modelParams && typeof modelParams[field.apiIdentifier] === "object" ? modelParams[field.apiIdentifier] : undefined;
    const belongsToId = belongsToParam?.[LINK_PARAM] !== undefined ? belongsToParam[LINK_PARAM] : belongsToParam?.id;
    if (belongsToId !== undefined) {
      belongsToParams[`${field.apiIdentifier}Id`] = belongsToId;
    }
  }

  return belongsToParams;
}

export function createGadgetRecord<Shape>(apiIdentifier: string, data: Shape): GadgetRecord<Shape & { __typename: string }> {
  const model = getModelByApiIdentifier(apiIdentifier);
  return new GadgetRecord({
    ...data,
    __typename: model.graphqlTypeName,
  });
}

/**
 * Applies incoming API params (your model’s fields) to a record
 *
 * @param params - data passed from API calls, webhook events, or direct user inputs.
 * @param record - object used to pass params to
 */
export function applyParams(params: AnyParams, record: GadgetRecord<any>): void {
  const model = getModelByTypename(record.__typename);
  Object.assign(record, params[model.apiIdentifier], getBelongsToRelationParams(model, params));
}

/**
 * Get the internal model manager for the model from its maybe-namespaced spot
 */
export const internalModelManagerForModel = (api: AnyClient, apiIdentifier: string, namespace: string[]): InternalModelManager => {
  const modelPath = [...namespace, apiIdentifier];
  const manager: InternalModelManager | undefined = Globals.platformModules.lodash().get(api, ["internal", ...modelPath]);
  if (!manager) {
    throw new InternalError(
      `Gadget needs but can't find an internal model manager for ${modelPath.join(
        "."
      )} on the API client -- has it finished regenerating or was it recently removed?`
    );
  }

  return manager;
};

/**
 * Get the internal model manager for the model from its maybe-namespaced spot
 */
export const internalModelManagerForTypename = (api: AnyClient, typename: string): InternalModelManager => {
  const model = getModelByTypename(typename);

  return internalModelManagerForModel(api, model.apiIdentifier, model.namespace);
};

/**
 * Saves record to the database:
 * 1. Checks field validations of a given record, then saves the record to the database.
 * 2. Uses your apps Internal API to persist data. This API quickly interacts with data without running any business logic.
 *
 * @param record - object saved to the database
 */
export async function save(record: GadgetRecord<any>): Promise<void> {
  const context = maybeGetActionContextFromLocalStorage();
  const api = assert(context ? context.api : getCurrentContext().api, "api client is missing from the current context");
  const model = getModelByTypename(record.__typename);

  await (await Globals.modelValidator(model.key)).validate({ api, logger: Globals.logger }, record);

  const internalModelManager = internalModelManagerForTypename(api, record.__typename);

  let result: GadgetRecord<any>;

  if ("createdAt" in record && record.createdAt) {
    result = await internalModelManager.update(record.id, {
      [model.apiIdentifier]: changedAttributes(model, record),
    });
  } else {
    result = await internalModelManager.create({
      [model.apiIdentifier]: writableAttributes(model, record),
    });
  }

  Object.assign(record, { ...result });
  record.flushChanges(ChangeTracking.SinceLastPersisted);
}

/**
 * Deletes record from the database.
 *
 * @param record - object deleted from the database
 */
export async function deleteRecord(record: GadgetRecord<any>): Promise<void> {
  const context = maybeGetActionContextFromLocalStorage();

  const api = assert(context ? context.api : getCurrentContext().api, "api client is missing from the current context");
  const scope = context ? context.scope : {};

  const id = assert(record.id, `record.id not set on record in scope, has the record been persisted?`);

  const internalModelManager = internalModelManagerForTypename(api, record.__typename);
  await internalModelManager.delete(id);

  scope.recordDeleted = true;
}

export function transitionState(
  record: GadgetRecord<any>,
  transition: {
    from?: string | Record<string, string>;
    to: string | Record<string, string>;
  }
): void {
  const model = getModelByTypename(record.__typename);
  const isShopifyModel =
    model.apiIdentifier === "shopifyShop" || model.apiIdentifier === "shopifySync" || model.apiIdentifier === "shopifyBulkOperation";

  if (isShopifyModel && doesVersionSupportSourceControl()) {
    // In apps framework version 1.0.0+, we handle the state transition internally to Shopify models based on the above API identifiers.
    // This function becomes a no-op for those models.
    return;
  }

  const stringRecordState = typeof record.state === "string" ? record.state : JSON.stringify(record.state);
  const stringTransitionFrom = typeof transition.from === "string" ? transition.from : JSON.stringify(transition.from);

  if (transition.from && stringRecordState !== stringTransitionFrom) {
    throw new InvalidStateTransitionError(undefined, {
      state: record.state,
      expectedFrom: transition.from,
    });
  }

  record.state = transition.to;
}

export function legacySetUser(): void {
  const context = getActionContextFromLocalStorage();

  if (!context.scope.authenticatedUser) {
    throw new UserNotSetOnSessionError(
      "The authenticated user could not be saved to the session when logging in. Make sure the user has a role assigned to them."
    );
  }
  if (!context.session) {
    throw new NoSessionForAuthenticationError(
      "Unable to authenticate because the request was made with no session in context to transition."
    );
  }
  context.session.set("user", { [LINK_PARAM]: context.scope.authenticatedUser.id });
}

export function legacyUnsetUser(): void {
  const context = getActionContextFromLocalStorage();

  if (!context.session) {
    throw new NoSessionForAuthenticationError("Unable to unset users on session because the request was made with no session.");
  }
  context.session.delete("user");
}

export async function legacySuccessfulAuthentication(params: AnyParams): Promise<void> {
  const context = getActionContextFromLocalStorage();
  const { api, scope } = context;
  const manager = api.internal.user as InternalModelManager;

  const user = (await manager.findMany({ filter: { email: { equals: params.email } } }))[0];
  let result = false;
  if (user && params.password && user.password?.hash) {
    if (await Globals.platformModules.bcrypt().compare(params.password, user.password.hash)) {
      scope.authenticatedUser = user;
      result = true;
    }
  }
  Globals.logger.info({ email: params.email, userId: user?.id, result }, "login attempt");

  if (!result) {
    throw new Error("Invalid email or password");
  }
}

/**
 * @private helper functions and variables
 */

export function doesVersionSupportSourceControl(): boolean {
  return Globals.platformModules.compareVersions().satisfies(frameworkVersion, ">=1.0.0");
}

/**
 * @private Get action context without `params` and `record` from async local storage.
 */
export function getActionContextFromLocalStorage(): AnyActionContext | AnyGlobalActionContext | AnyEffectContext {
  return assert(actionContextLocalStorage.getStore(), "this effect function should only be called from within an action");
}

/**
 * @private Similar to `getActionContextFromLocalStorage` but returns `undefined` if there is no action context. (i.e. possibly called from a route)
 */
export function maybeGetActionContextFromLocalStorage(): AnyActionContext | AnyGlobalActionContext | AnyEffectContext | undefined {
  return actionContextLocalStorage.getStore();
}

export function getCurrentContext(): AnyAmbientContext {
  return assert(Globals.requestContext.get("requestContext"), "no gadget context found on request");
}

export const LINK_PARAM = "_link";

export function writableAttributes(model: ModelMetadata, record: GadgetRecord<RecordData>): Record<string, any> {
  const fieldsByApiIdentifier = Globals.platformModules.lodash().keyBy(Object.values(model.fields) as NotYetTyped[], "apiIdentifier");
  return Globals.platformModules.lodash().pickBy(record, (v: any, k: any) => {
    const field = fieldsByApiIdentifier[k];
    if (!field) return false;

    const isRelationshipField =
      field.fieldType === FieldType.HasMany || field.fieldType === FieldType.HasOne || field.fieldType === FieldType.HasManyThrough;

    if (isRelationshipField && v === null) {
      return false;
    }

    return field.internalWritable;
  });
}

export function changedAttributes(model: ModelMetadata, record: GadgetRecord<RecordData>): Record<string, any> {
  const changes = record.changes();
  const attributes = Object.keys(changes).reduce((attrs, key) => {
    attrs[key] = record[key];
    return attrs;
  }, {} as any);
  return writableAttributes(model, attributes);
}

export const getModelByApiIdentifier = (apiIdentifier: string): ModelMetadata => {
  const typename = modelListIndex[`api:${apiIdentifier}`];
  if (!typename) {
    throw new InternalError(`Model ${apiIdentifier} not found in available model metadata`, {
      availableApiIdentifiers: Object.keys(modelListIndex),
    });
  }

  return getModelByTypename(typename);
};

export const getModelByTypename = (typename: string): ModelMetadata => {
  if (!typename) {
    throw new InternalError(`No typename found on record, __typename must be set for accessing model metadata`);
  }

  const model = modelsMap[typename];
  if (!model) {
    throw new InternalError(`Model with typename ${typename} not found in available model metadata`, {
      availableTypenames: Object.keys(modelsMap),
    });
  }

  return model;
};

export enum FieldType {
  ID = "ID",
  Number = "Number",
  String = "String",
  Enum = "Enum",
  RichText = "RichText",
  DateTime = "DateTime",
  Email = "Email",
  URL = "URL",
  Money = "Money",
  File = "File",
  Color = "Color",
  Password = "Password",
  Computed = "Computed",
  HasManyThrough = "HasManyThrough",
  BelongsTo = "BelongsTo",
  HasMany = "HasMany",
  HasOne = "HasOne",
  Boolean = "Boolean",
  Model = "Model",
  Object = "Object",
  Array = "Array",
  JSON = "JSON",
  Code = "Code",
  EncryptedString = "EncryptedString",
  Vector = "Vector",
  /**
   * Any value at all.
   * Prefer FieldType.JSON where possible, it's more descriptive.
   */
  Any = "Any",
  Null = "Null",
  RecordState = "RecordState",
  RoleAssignments = "RoleAssignments",
}
