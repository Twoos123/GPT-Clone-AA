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
  preventCrossStoreDataAccess: () => preventCrossStoreDataAccess
});
module.exports = __toCommonJS(effects_exports);
var import_effects = require("../effects");
var import_errors = require("../errors");
var import_globals = require("../globals");
var import_tenancy = require("../tenancy");
async function preventCrossStoreDataAccess(params, record, options) {
  const context = (0, import_effects.getActionContextFromLocalStorage)();
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
  const appTenancy = context[import_tenancy.AppTenancyKey];
  if (appTenancy?.bigcommerce?.storeId === void 0) {
    return;
  }
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
    tenantType: "store" /* Store */
  });
}
const bigcommerceModelKey = (modelName) => {
  const modelKey = modelName.replaceAll(" ", "");
  return `DataModel-BigCommerce-${modelKey}`;
};
const bigcommerceStoreKey = bigcommerceModelKey("Store");
const validateBelongsToLink = (options) => {
  const { input, record, params, tenancy, model, relatedModelKey, tenantType, tenantBelongsToField } = options;
  if (relatedModelKey != bigcommerceStoreKey) {
    throw new Error("Validation for tenancy can only be Big Commerce Store");
  }
  if (model.key == relatedModelKey) {
    if (record && String(record.id) !== tenancy.storeId) {
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
        `The selected ${tenantType} relation field should be a \`Belongs To\` relationship to the \`BigCommerce ${import_globals.Globals.platformModules.lodash().capitalize(tenantType)}\` model.`
      );
    } else {
      relatedTenantField = selectedField;
    }
  }
  setBelongsToLink(input, record, params, model, relatedTenantField, tenancy.storeId);
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
var TenantType = /* @__PURE__ */ ((TenantType2) => {
  TenantType2["Store"] = "store";
  return TenantType2;
})(TenantType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  preventCrossStoreDataAccess
});
//# sourceMappingURL=effects.js.map
