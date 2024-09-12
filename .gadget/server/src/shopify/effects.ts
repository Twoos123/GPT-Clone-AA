import { GadgetRecord } from "@gadgetinc/api-client-core";
import {
  FieldType,
  LINK_PARAM,
  getActionContextFromLocalStorage,
  getCurrentContext,
  internalModelManagerForModel,
  maybeGetActionContextFromLocalStorage,
} from "../effects";
import { InvalidActionInputError, MisconfiguredActionError, PermissionDeniedError } from "../errors";
import { Globals } from "../globals";
import { AppTenancyKey } from "../tenancy";
import type { AnyParams, FieldMetadata, ModelDescriptor } from "../types";
import { assert } from "../utils";

export const ShopifyShopState = {
  Installed: { created: "installed" },
  Uninstalled: { created: "uninstalled" },
};

export const ShopifySyncState = {
  Created: "created",
  Running: "running",
  Completed: "completed",
  Errored: "errored",
};

export const ShopifyBulkOperationState = {
  Created: "created",
  Completed: "completed",
  Canceled: "canceled",
  Failed: "failed",
  Expired: "expired",
};

export const ShopifySellingPlanGroupProductVariantState = {
  Started: "started",
  Created: "created",
  Deleted: "deleted",
};

export const ShopifySellingPlanGroupProductState = {
  Started: "started",
  Created: "created",
  Deleted: "deleted",
};

/**
 * The following is used to power shopifySync model.
 * Learn more about syncing visit our docs: https://docs.gadget.dev/guides/plugins/shopify/syncing-shopify-data#syncing
 */
export async function shopifySync(params: AnyParams, record: GadgetRecord<any>): Promise<void> {
  const context = getActionContextFromLocalStorage();
  const effectAPIs = context.effectAPIs;

  const syncRecord: { syncSince?: Date; id: bigint; shopId: string; models: any; force: boolean } = assert(
    record,
    "cannot start a shop sync from this action"
  );

  const shopId = assert(syncRecord.shopId, "a shop is required to start a sync");

  if (!syncRecord.models || (Array.isArray(syncRecord.models) && syncRecord.models.every((m) => typeof m == "string"))) {
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
      Globals.logger.error({ error, connectionSyncId: syncRecord.id }, "an error occurred starting shop sync");
      throw error;
    }
  } else {
    throw new InvalidActionInputError("Models must be an array of api identifiers");
  }
}

export async function abortSync(params: AnyParams, record: GadgetRecord<any>): Promise<void> {
  const context = getActionContextFromLocalStorage();
  const effectAPIs = context.effectAPIs;

  const syncRecord: { id: bigint } = assert(record, "a record is required to abort a shop sync");

  const syncId = assert(syncRecord.id, "a sync id is required to start a sync");

  if (!params.errorMessage) {
    record.errorMessage = "Sync aborted";
  }

  Globals.logger.info({ userVisible: true, connectionSyncId: syncId }, "aborting sync");

  try {
    await effectAPIs.abortSync(syncId.toString());
  } catch (error) {
    Globals.logger.error({ error, connectionSyncId: syncId }, "an error occurred aborting sync");
    throw error;
  }
}

/**
 * Applicable for multi-tenant Shopify apps(public apps), or Shopify Customer Extension apps
 * Enforces that the given record is only accessible by the current shop or customer
 *
 * For new records: sets the the current session's `shopId` to the record. If the tenant is a customer then will set the current sessions' customerId to the record.
 * For existing records: Verifies the record objects `shopId` and/or `customerId` matches the one from the current session.
 *
 * *
 * @param params - incoming data validated against the current `shopId`
 * @param record - record used to validate or set the `shopId` on
 * @param {Object} options - Additional options for cross-shop or cross-customer validation
 * @param {string} options.shopBelongsToField - Specifies which related model is used for cross-shop validation.
 * @param {string} options.customerBelongsToField - Specifies which related model is used for cross-customer validation.
 * @param {boolean} options.enforceCustomerTenancy - Whether or not to enforce customer tenacy. Defaults to true.
 */
export async function preventCrossShopDataAccess(
  params: AnyParams,
  record: GadgetRecord<any>,
  options?: { shopBelongsToField?: string; customerBelongsToField?: string; enforceCustomerTenancy?: boolean }
): Promise<void> {
  const enforceCustomerTenancy = options?.enforceCustomerTenancy ?? true;
  const context = getActionContextFromLocalStorage();

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
  const appTenancy = context[AppTenancyKey];
  const shopBelongsToField = options?.shopBelongsToField;
  const customerBelongsToField = options?.customerBelongsToField;

  // if there's no tenancy let's continue
  if (appTenancy?.shopify?.shopId === undefined) {
    return;
  }
  // if this effect is not run in the context of a model then it does not apply
  if (!model) {
    return;
  }

  const shopId = String(appTenancy.shopify.shopId);
  const customerId = appTenancy.shopify.customerId ? String(appTenancy.shopify.customerId) : undefined;

  const input = params[model.apiIdentifier];
  validateBelongsToLink(input, record, params, shopId, model, ShopifyShopKey, shopBelongsToField, TenantType.Shop);

  if (customerId && enforceCustomerTenancy) {
    validateBelongsToLink(input, record, params, customerId, model, ShopifyCustomerKey, customerBelongsToField, TenantType.Customer);
  }
}

const validateBelongsToLink = (
  input: any,
  record: any,
  params: AnyParams,
  tenantId: string,
  model: ModelDescriptor,
  relatedModelKey: string,
  tenantBelongsToField: string | undefined,
  tenantType: TenantType
) => {
  if (relatedModelKey != ShopifyShopKey && relatedModelKey != ShopifyCustomerKey) {
    throw new Error("Validation for tenancy can only be for Shopify Shop or Shopify Customer models");
  }
  // If this effect is being added to the related tenant model (Shopify Shop or Shopify Customer), simply compare the record's ID
  if (model.key == relatedModelKey) {
    if (record && String(record.id) !== tenantId) {
      throw new PermissionDeniedError();
    }
    return;
  }

  const fieldsIsBelongsToRelatedModel = Object.values(model.fields).filter(
    (f) => f.fieldType === (FieldType.BelongsTo as string) && f.configuration.relatedModelKey === relatedModelKey
  );

  if (fieldsIsBelongsToRelatedModel.length === 0) {
    throw new MisconfiguredActionError(`This model is missing a related ${tenantType} field.`);
  }

  if (fieldsIsBelongsToRelatedModel.length > 1 && !tenantBelongsToField) {
    throw new MisconfiguredActionError(
      `This function is missing a related ${tenantType} field option. \`${tenantType}BelongsToField\` is a required option parameter if the model has more than one related ${tenantType} field.`
    );
  }
  let relatedTenantField = fieldsIsBelongsToRelatedModel[0];

  if (tenantBelongsToField) {
    const selectedField = Object.values(model.fields).find((f) => f.apiIdentifier === tenantBelongsToField);
    if (!selectedField) {
      throw new MisconfiguredActionError(`The selected ${tenantType} relation field does not exist.`);
    }

    if (selectedField.fieldType !== (FieldType.BelongsTo as string) || selectedField.configuration.relatedModelKey !== relatedModelKey) {
      throw new MisconfiguredActionError(
        `The selected ${tenantType} relation field should be a \`Belongs To\` relationship to the \`Shopify ${Globals.platformModules
          .lodash()
          .capitalize(tenantType)}\` model.`
      );
    } else {
      relatedTenantField = selectedField;
    }
  }

  setBelongsToLink(input, record, params, model, relatedTenantField, tenantId);
};

const setBelongsToLink = (
  input: any,
  record: any,
  params: AnyParams,
  model: ModelDescriptor,
  relatedField: FieldMetadata,
  tenantId: string
) => {
  // if we're trying to set the params to a shop other than the tenant we should reject
  if (Globals.platformModules.lodash().isObjectLike(input)) {
    const objectInput = input as Record<string, any>;
    if (objectInput[relatedField.apiIdentifier]) {
      if (String(objectInput[relatedField.apiIdentifier][LINK_PARAM]) !== tenantId) {
        throw new PermissionDeniedError();
      }
    } else {
      objectInput[relatedField.apiIdentifier] = {
        [LINK_PARAM]: tenantId,
      };
    }
  } else {
    params[model.apiIdentifier] = {
      [relatedField.apiIdentifier]: {
        [LINK_PARAM]: tenantId,
      },
    };
  }

  if (record) {
    const value = record.getField(relatedField.apiIdentifier);
    // if the record doesn't have a shop set then anyone can update it
    if (value) {
      const recordShopId = typeof value === "object" ? value[LINK_PARAM] : value;
      if (String(recordShopId) !== tenantId) {
        throw new PermissionDeniedError();
      }
    } else {
      // we have to re-apply the params to the record to ensure that this still works correctly if it occurs after "applyParams"
      record.setField(relatedField.apiIdentifier, {
        [LINK_PARAM]: tenantId,
      });
    }
  }
};

/**
 * Syncs Shopify models across all models
 *
 * @param params - list of Shopify app credentials to sync data from
 * @param syncSince - starting point for data sync (default: all time)
 * @param models - list of model names to sync data from
 * @param force - enforces syncswithout checking if they're up to date
 * @param startReason - a string reason stored on the created 'shopifySync' records
 */
export async function globalShopifySync(params: {
  apiKeys: string[];
  syncSince: string;
  models: string[];
  force: boolean;
  startReason: string;
}): Promise<void> {
  const context = maybeGetActionContextFromLocalStorage();
  const effectAPIs = assert(
    context ? context.effectAPIs : getCurrentContext().effectAPIs,
    "effect apis is missing from the current context"
  );
  const api = assert(context ? context.api : getCurrentContext().api, "api client is missing from the current context");

  const { apiKeys, syncSince, models, force, startReason } = params;

  const {
    shopModelIdentifier,
    installedViaKeyFieldIdentifier,
    shopifySyncModelApiIdentifier,
    runShopifySyncAction,
    accessTokenIdentifier,
    forceFieldIdentifier,
  } = await effectAPIs.getSyncIdentifiers();
  const manager = internalModelManagerForModel(api, shopModelIdentifier, []);

  const pageSize = 250;
  let pageInfo: { first?: number; endCursor?: string; hasNextPage: boolean } = { first: pageSize, hasNextPage: true };
  const results: { id: string; domain: string; state: Record<string, any>; [key: string]: any }[] = [];

  if (apiKeys && apiKeys.length > 0) {
    try {
      while (pageInfo.hasNextPage) {
        const records = await manager.findMany({
          filter: {
            [installedViaKeyFieldIdentifier]: {
              in: apiKeys,
            },
            state: {
              inState: "created.installed",
            },
            planName: {
              notIn: ["frozen", "fraudulent", "cancelled"],
            },
          },
          first: pageInfo.first,
          after: pageInfo.endCursor,
        });
        results.push(...(records as any[]));
        pageInfo = records.pagination.pageInfo;
      }
    } catch (error) {
      Globals.logger.info({ userVisible: true, error, apiKeys }, "could not get shops for all API keys");
      throw error;
    }

    for (const result of results) {
      // skip the sync if there is no accessToken set or if the state is uninstalled
      if (Globals.platformModules.lodash().isEmpty(result[accessTokenIdentifier]) || result.state?.created == "uninstalled") {
        Globals.logger.info({ shopId: result.id }, "skipping sync for shop without access token or is uninstalled");
        continue;
      }

      try {
        const shopifySyncModelManager = Globals.platformModules.lodash().get(api, runShopifySyncAction.dotNotationPath);
        await shopifySyncModelManager[runShopifySyncAction.apiIdentifier]({
          [shopifySyncModelApiIdentifier]: {
            shop: {
              _link: result.id,
            },
            domain: result.domain,
            syncSince,
            models,
            ...(forceFieldIdentifier ? { force } : undefined),
          },
          startReason,
        });
      } catch (error) {
        // log that the sync could not be started for the shop but continue
        Globals.logger.warn({ userVisible: true, error, shop: result }, "couldn't start sync for shop");
      }
    }
  } else {
    throw new InvalidActionInputError("missing at least 1 api key");
  }
}

const enum TenantType {
  Shop = "shop",
  Customer = "customer",
}

const shopifyModelKey = (modelName: string): string => {
  const modelKey = modelName.replaceAll(" ", "");
  return `DataModel-Shopify-${modelKey}`;
};

/**
 * Updates the state of a `bulkOperation` record from Shopify when the operation completes.
 *
 * @param record - the `bulkOperation` record updated
 */
export async function finishBulkOperation(record: GadgetRecord<any>): Promise<void> {
  if (!record?.id) {
    Globals.logger.warn(`Expected bulk operation record to be present for action`);
    return;
  }

  const context = getActionContextFromLocalStorage();
  const shopifyAPI = await (context.connections as Record<string, any>).shopify.forShopId(record.shopId);
  if (!shopifyAPI) {
    Globals.logger.error(`Could not instantiate Shopify client for shop ID ${record.shopId}`);
    return;
  }
  const bulkOperation = (
    await shopifyAPI.graphql(`query {
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
      }`)
  ).node;
  // normalize the mixed upper/lowercase (GraphQL/REST) to lowercase
  const { status, errorCode, type } = bulkOperation;
  Object.assign(record, {
    ...bulkOperation,
    status: status?.toLowerCase(),
    errorCode: errorCode?.toLowerCase(),
    type: type?.toLowerCase(),
    id: record.id,
  });
}

const ShopifyShopKey: string = shopifyModelKey("Shop");
const ShopifyCustomerKey: string = shopifyModelKey("Customer");

const ShopifyBulkOperationGIDForId = (id: string) => `gid://shopify/BulkOperation/${id}`;
