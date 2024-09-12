import type { GadgetRecord } from "@gadgetinc/api-client-core";
import { FieldType, getActionContextFromLocalStorage, LINK_PARAM } from "../effects";
import { MisconfiguredActionError, PermissionDeniedError } from "../errors";
import { Globals } from "../globals";
import type { BigCommerceTenancy } from "../tenancy";
import { AppTenancyKey } from "../tenancy";
import type { AnyParams, FieldMetadata, ModelDescriptor } from "../types";

/**
 * Applicable for multi-tenant Store apps(public apps)
 * Enforces that the given record is only accessible by the current store or customer
 * *
 * @param params - incoming data validated against the current `storeHash`
 * @param record - record used to validate or set the `storeHash` on
 */
export async function preventCrossStoreDataAccess(
  params: AnyParams,
  record: GadgetRecord<any>,
  options?: { storeBelongsToField?: string }
): Promise<void> {
  const context = getActionContextFromLocalStorage();

  if (context.type != "effect") {
    throw new Error("Can't prevent cross store data access outside of an action effect");
  }
  if (!params) {
    throw new Error("The `params` parameter is required in preventCrossStoreDataAccess(params, record)");
  }
  if (!record) {
    throw new Error("The `record` parameter is required in preventCrossStoreDataAccess(params, record)");
  }

  const model = context.model;
  const appTenancy = context[AppTenancyKey];

  // if there's no tenancy let's continue
  if (appTenancy?.bigcommerce?.storeId === undefined) {
    return;
  }

  // if this effect is not run in the context of a model then it does not apply
  if (!model) {
    return;
  }

  const input = params[model.apiIdentifier];
  const storeBelongsToField = options?.storeBelongsToField;
  validateBelongsToLink({
    input,
    record,
    params,
    model,
    tenancy: appTenancy.bigcommerce,
    relatedModelKey: bigcommerceStoreKey,
    tenantBelongsToField: storeBelongsToField,
    tenantType: TenantType.Store,
  });
}

const bigcommerceModelKey = (modelName: string): string => {
  const modelKey = modelName.replaceAll(" ", "");
  return `DataModel-BigCommerce-${modelKey}`;
};

const bigcommerceStoreKey: string = bigcommerceModelKey("Store");

const validateBelongsToLink = (options: {
  input: any;
  record: any;
  params: AnyParams;
  tenancy: BigCommerceTenancy;
  model: ModelDescriptor;
  relatedModelKey: string;
  tenantBelongsToField?: string | undefined;
  tenantType: TenantType;
}) => {
  const { input, record, params, tenancy, model, relatedModelKey, tenantType, tenantBelongsToField } = options;
  if (relatedModelKey != bigcommerceStoreKey) {
    throw new Error("Validation for tenancy can only be Big Commerce Store");
  }

  // If this effect is being added to the related tenant model (BigCommerce Store), simply compare the record's ID
  if (model.key == relatedModelKey) {
    if (record && String(record.id) !== tenancy.storeId) {
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
        `The selected ${tenantType} relation field should be a \`Belongs To\` relationship to the \`BigCommerce ${Globals.platformModules
          .lodash()
          .capitalize(tenantType)}\` model.`
      );
    } else {
      relatedTenantField = selectedField;
    }
  }

  setBelongsToLink(input, record, params, model, relatedTenantField, tenancy.storeId);
};

const setBelongsToLink = (
  input: any,
  record: any,
  params: AnyParams,
  model: ModelDescriptor,
  relatedField: FieldMetadata,
  tenantId: string
) => {
  // if we're trying to set the params to a store other than the tenant we should reject
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

const enum TenantType {
  Store = "store",
}
