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
  ShopifyBulkOperationState: () => ShopifyBulkOperationState,
  ShopifySellingPlanGroupProductState: () => ShopifySellingPlanGroupProductState,
  ShopifySellingPlanGroupProductVariantState: () => ShopifySellingPlanGroupProductVariantState,
  ShopifyShopState: () => ShopifyShopState,
  ShopifySyncState: () => ShopifySyncState,
  abortSync: () => abortSync,
  finishBulkOperation: () => finishBulkOperation,
  globalShopifySync: () => globalShopifySync,
  preventCrossShopDataAccess: () => preventCrossShopDataAccess,
  shopifySync: () => shopifySync
});
module.exports = __toCommonJS(effects_exports);
var import_effects = require("../effects");
var import_errors = require("../errors");
var import_globals = require("../globals");
var import_tenancy = require("../tenancy");
var import_utils = require("../utils");
const ShopifyShopState = {
  Installed: { created: "installed" },
  Uninstalled: { created: "uninstalled" }
};
const ShopifySyncState = {
  Created: "created",
  Running: "running",
  Completed: "completed",
  Errored: "errored"
};
const ShopifyBulkOperationState = {
  Created: "created",
  Completed: "completed",
  Canceled: "canceled",
  Failed: "failed",
  Expired: "expired"
};
const ShopifySellingPlanGroupProductVariantState = {
  Started: "started",
  Created: "created",
  Deleted: "deleted"
};
const ShopifySellingPlanGroupProductState = {
  Started: "started",
  Created: "created",
  Deleted: "deleted"
};
async function shopifySync(params, record) {
  const context = (0, import_effects.getActionContextFromLocalStorage)();
  const effectAPIs = context.effectAPIs;
  const syncRecord = (0, import_utils.assert)(
    record,
    "cannot start a shop sync from this action"
  );
  const shopId = (0, import_utils.assert)(syncRecord.shopId, "a shop is required to start a sync");
  if (!syncRecord.models || Array.isArray(syncRecord.models) && syncRecord.models.every((m) => typeof m == "string")) {
    try {
      await effectAPIs.sync(
        syncRecord.id.toString(),
        shopId,
        syncRecord.syncSince,
        syncRecord.models,
        syncRecord.force,
        params.startReason
      );
    } catch (error) {
      import_globals.Globals.logger.error({ error, connectionSyncId: syncRecord.id }, "an error occurred starting shop sync");
      throw error;
    }
  } else {
    throw new import_errors.InvalidActionInputError("Models must be an array of api identifiers");
  }
}
async function abortSync(params, record) {
  const context = (0, import_effects.getActionContextFromLocalStorage)();
  const effectAPIs = context.effectAPIs;
  const syncRecord = (0, import_utils.assert)(record, "a record is required to abort a shop sync");
  const syncId = (0, import_utils.assert)(syncRecord.id, "a sync id is required to start a sync");
  if (!params.errorMessage) {
    record.errorMessage = "Sync aborted";
  }
  import_globals.Globals.logger.info({ userVisible: true, connectionSyncId: syncId }, "aborting sync");
  try {
    await effectAPIs.abortSync(syncId.toString());
  } catch (error) {
    import_globals.Globals.logger.error({ error, connectionSyncId: syncId }, "an error occurred aborting sync");
    throw error;
  }
}
async function preventCrossShopDataAccess(params, record, options) {
  const enforceCustomerTenancy = options?.enforceCustomerTenancy ?? true;
  const context = (0, import_effects.getActionContextFromLocalStorage)();
  if (context.type != "effect") {
    throw new Error("Can't prevent cross shop data access outside of an action effect");
  }
  if (!params) {
    throw new Error(
      "The `params` parameter is required in preventCrossShopDataAccess(params, record, options?: { shopBelongsToField: string })"
    );
  }
  if (!record) {
    throw new Error(
      "The `record` parameter is required in preventCrossShopDataAccess(params, record, options?: { shopBelongsToField: string })"
    );
  }
  const model = context.model;
  const appTenancy = context[import_tenancy.AppTenancyKey];
  const shopBelongsToField = options?.shopBelongsToField;
  const customerBelongsToField = options?.customerBelongsToField;
  if (appTenancy?.shopify?.shopId === void 0) {
    return;
  }
  if (!model) {
    return;
  }
  const shopId = String(appTenancy.shopify.shopId);
  const customerId = appTenancy.shopify.customerId ? String(appTenancy.shopify.customerId) : void 0;
  const input = params[model.apiIdentifier];
  validateBelongsToLink(input, record, params, shopId, model, ShopifyShopKey, shopBelongsToField, "shop" /* Shop */);
  if (customerId && enforceCustomerTenancy) {
    validateBelongsToLink(input, record, params, customerId, model, ShopifyCustomerKey, customerBelongsToField, "customer" /* Customer */);
  }
}
const validateBelongsToLink = (input, record, params, tenantId, model, relatedModelKey, tenantBelongsToField, tenantType) => {
  if (relatedModelKey != ShopifyShopKey && relatedModelKey != ShopifyCustomerKey) {
    throw new Error("Validation for tenancy can only be for Shopify Shop or Shopify Customer models");
  }
  if (model.key == relatedModelKey) {
    if (record && String(record.id) !== tenantId) {
      throw new import_errors.PermissionDeniedError();
    }
    return;
  }
  const fieldsIsBelongsToRelatedModel = Object.values(model.fields).filter(
    (f) => f.fieldType === import_effects.FieldType.BelongsTo && f.configuration.relatedModelKey === relatedModelKey
  );
  if (fieldsIsBelongsToRelatedModel.length === 0) {
    throw new import_errors.MisconfiguredActionError(`This model is missing a related ${tenantType} field.`);
  }
  if (fieldsIsBelongsToRelatedModel.length > 1 && !tenantBelongsToField) {
    throw new import_errors.MisconfiguredActionError(
      `This function is missing a related ${tenantType} field option. \`${tenantType}BelongsToField\` is a required option parameter if the model has more than one related ${tenantType} field.`
    );
  }
  let relatedTenantField = fieldsIsBelongsToRelatedModel[0];
  if (tenantBelongsToField) {
    const selectedField = Object.values(model.fields).find((f) => f.apiIdentifier === tenantBelongsToField);
    if (!selectedField) {
      throw new import_errors.MisconfiguredActionError(`The selected ${tenantType} relation field does not exist.`);
    }
    if (selectedField.fieldType !== import_effects.FieldType.BelongsTo || selectedField.configuration.relatedModelKey !== relatedModelKey) {
      throw new import_errors.MisconfiguredActionError(
        `The selected ${tenantType} relation field should be a \`Belongs To\` relationship to the \`Shopify ${import_globals.Globals.platformModules.lodash().capitalize(tenantType)}\` model.`
      );
    } else {
      relatedTenantField = selectedField;
    }
  }
  setBelongsToLink(input, record, params, model, relatedTenantField, tenantId);
};
const setBelongsToLink = (input, record, params, model, relatedField, tenantId) => {
  if (import_globals.Globals.platformModules.lodash().isObjectLike(input)) {
    const objectInput = input;
    if (objectInput[relatedField.apiIdentifier]) {
      if (String(objectInput[relatedField.apiIdentifier][import_effects.LINK_PARAM]) !== tenantId) {
        throw new import_errors.PermissionDeniedError();
      }
    } else {
      objectInput[relatedField.apiIdentifier] = {
        [import_effects.LINK_PARAM]: tenantId
      };
    }
  } else {
    params[model.apiIdentifier] = {
      [relatedField.apiIdentifier]: {
        [import_effects.LINK_PARAM]: tenantId
      }
    };
  }
  if (record) {
    const value = record.getField(relatedField.apiIdentifier);
    if (value) {
      const recordShopId = typeof value === "object" ? value[import_effects.LINK_PARAM] : value;
      if (String(recordShopId) !== tenantId) {
        throw new import_errors.PermissionDeniedError();
      }
    } else {
      record.setField(relatedField.apiIdentifier, {
        [import_effects.LINK_PARAM]: tenantId
      });
    }
  }
};
async function globalShopifySync(params) {
  const context = (0, import_effects.maybeGetActionContextFromLocalStorage)();
  const effectAPIs = (0, import_utils.assert)(
    context ? context.effectAPIs : (0, import_effects.getCurrentContext)().effectAPIs,
    "effect apis is missing from the current context"
  );
  const api = (0, import_utils.assert)(context ? context.api : (0, import_effects.getCurrentContext)().api, "api client is missing from the current context");
  const { apiKeys, syncSince, models, force, startReason } = params;
  const {
    shopModelIdentifier,
    installedViaKeyFieldIdentifier,
    shopifySyncModelApiIdentifier,
    runShopifySyncAction,
    accessTokenIdentifier,
    forceFieldIdentifier
  } = await effectAPIs.getSyncIdentifiers();
  const manager = (0, import_effects.internalModelManagerForModel)(api, shopModelIdentifier, []);
  const pageSize = 250;
  let pageInfo = { first: pageSize, hasNextPage: true };
  const results = [];
  if (apiKeys && apiKeys.length > 0) {
    try {
      while (pageInfo.hasNextPage) {
        const records = await manager.findMany({
          filter: {
            [installedViaKeyFieldIdentifier]: {
              in: apiKeys
            },
            state: {
              inState: "created.installed"
            },
            planName: {
              notIn: ["frozen", "fraudulent", "cancelled"]
            }
          },
          first: pageInfo.first,
          after: pageInfo.endCursor
        });
        results.push(...records);
        pageInfo = records.pagination.pageInfo;
      }
    } catch (error) {
      import_globals.Globals.logger.info({ userVisible: true, error, apiKeys }, "could not get shops for all API keys");
      throw error;
    }
    for (const result of results) {
      if (import_globals.Globals.platformModules.lodash().isEmpty(result[accessTokenIdentifier]) || result.state?.created == "uninstalled") {
        import_globals.Globals.logger.info({ shopId: result.id }, "skipping sync for shop without access token or is uninstalled");
        continue;
      }
      try {
        const shopifySyncModelManager = import_globals.Globals.platformModules.lodash().get(api, runShopifySyncAction.dotNotationPath);
        await shopifySyncModelManager[runShopifySyncAction.apiIdentifier]({
          [shopifySyncModelApiIdentifier]: {
            shop: {
              _link: result.id
            },
            domain: result.domain,
            syncSince,
            models,
            ...forceFieldIdentifier ? { force } : void 0
          },
          startReason
        });
      } catch (error) {
        import_globals.Globals.logger.warn({ userVisible: true, error, shop: result }, "couldn't start sync for shop");
      }
    }
  } else {
    throw new import_errors.InvalidActionInputError("missing at least 1 api key");
  }
}
var TenantType = /* @__PURE__ */ ((TenantType2) => {
  TenantType2["Shop"] = "shop";
  TenantType2["Customer"] = "customer";
  return TenantType2;
})(TenantType || {});
const shopifyModelKey = (modelName) => {
  const modelKey = modelName.replaceAll(" ", "");
  return `DataModel-Shopify-${modelKey}`;
};
async function finishBulkOperation(record) {
  if (!record?.id) {
    import_globals.Globals.logger.warn(`Expected bulk operation record to be present for action`);
    return;
  }
  const context = (0, import_effects.getActionContextFromLocalStorage)();
  const shopifyAPI = await context.connections.shopify.forShopId(record.shopId);
  if (!shopifyAPI) {
    import_globals.Globals.logger.error(`Could not instantiate Shopify client for shop ID ${record.shopId}`);
    return;
  }
  const bulkOperation = (await shopifyAPI.graphql(`query {
        node(id: "${ShopifyBulkOperationGIDForId(record.id)}") {
          ... on BulkOperation {
            id
            status
            errorCode
            createdAt
            completedAt
            objectCount
            fileSize
            url
            type
            partialDataUrl
            rootObjectCount
          }
        }
      }`)).node;
  const { status, errorCode, type } = bulkOperation;
  Object.assign(record, {
    ...bulkOperation,
    status: status?.toLowerCase(),
    errorCode: errorCode?.toLowerCase(),
    type: type?.toLowerCase(),
    id: record.id
  });
}
const ShopifyShopKey = shopifyModelKey("Shop");
const ShopifyCustomerKey = shopifyModelKey("Customer");
const ShopifyBulkOperationGIDForId = (id) => `gid://shopify/BulkOperation/${id}`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShopifyBulkOperationState,
  ShopifySellingPlanGroupProductState,
  ShopifySellingPlanGroupProductVariantState,
  ShopifyShopState,
  ShopifySyncState,
  abortSync,
  finishBulkOperation,
  globalShopifySync,
  preventCrossShopDataAccess,
  shopifySync
});
//# sourceMappingURL=effects.js.map
