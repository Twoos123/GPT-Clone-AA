"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "preventCrossStoreDataAccess", {
    enumerable: true,
    get: function() {
        return preventCrossStoreDataAccess;
    }
});
const _effects = require("../effects");
const _errors = require("../errors");
const _globals = require("../globals");
const _tenancy = require("../tenancy");
async function preventCrossStoreDataAccess(params, record, options) {
    const context = (0, _effects.getActionContextFromLocalStorage)();
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
    const appTenancy = context[_tenancy.AppTenancyKey];
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
        tenantType: "store"
    });
}
const bigcommerceModelKey = (modelName)=>{
    const modelKey = modelName.replaceAll(" ", "");
    return `DataModel-BigCommerce-${modelKey}`;
};
const bigcommerceStoreKey = bigcommerceModelKey("Store");
const validateBelongsToLink = (options)=>{
    const { input, record, params, tenancy, model, relatedModelKey, tenantType, tenantBelongsToField } = options;
    if (relatedModelKey != bigcommerceStoreKey) {
        throw new Error("Validation for tenancy can only be Big Commerce Store");
    }
    // If this effect is being added to the related tenant model (BigCommerce Store), simply compare the record's ID
    if (model.key == relatedModelKey) {
        if (record && String(record.id) !== tenancy.storeId) {
            throw new _errors.PermissionDeniedError();
        }
        return;
    }
    const fieldsIsBelongsToRelatedModel = Object.values(model.fields).filter((f)=>f.fieldType === _effects.FieldType.BelongsTo && f.configuration.relatedModelKey === relatedModelKey);
    if (fieldsIsBelongsToRelatedModel.length === 0) {
        throw new _errors.MisconfiguredActionError(`This model is missing a related ${tenantType} field.`);
    }
    if (fieldsIsBelongsToRelatedModel.length > 1 && !tenantBelongsToField) {
        throw new _errors.MisconfiguredActionError(`This function is missing a related ${tenantType} field option. \`${tenantType}BelongsToField\` is a required option parameter if the model has more than one related ${tenantType} field.`);
    }
    let relatedTenantField = fieldsIsBelongsToRelatedModel[0];
    if (tenantBelongsToField) {
        const selectedField = Object.values(model.fields).find((f)=>f.apiIdentifier === tenantBelongsToField);
        if (!selectedField) {
            throw new _errors.MisconfiguredActionError(`The selected ${tenantType} relation field does not exist.`);
        }
        if (selectedField.fieldType !== _effects.FieldType.BelongsTo || selectedField.configuration.relatedModelKey !== relatedModelKey) {
            throw new _errors.MisconfiguredActionError(`The selected ${tenantType} relation field should be a \`Belongs To\` relationship to the \`BigCommerce ${_globals.Globals.platformModules.lodash().capitalize(tenantType)}\` model.`);
        } else {
            relatedTenantField = selectedField;
        }
    }
    setBelongsToLink(input, record, params, model, relatedTenantField, tenancy.storeId);
};
const setBelongsToLink = (input, record, params, model, relatedField, tenantId)=>{
    // if we're trying to set the params to a store other than the tenant we should reject
    if (_globals.Globals.platformModules.lodash().isObjectLike(input)) {
        const objectInput = input;
        if (objectInput[relatedField.apiIdentifier]) {
            if (String(objectInput[relatedField.apiIdentifier][_effects.LINK_PARAM]) !== tenantId) {
                throw new _errors.PermissionDeniedError();
            }
        } else {
            objectInput[relatedField.apiIdentifier] = {
                [_effects.LINK_PARAM]: tenantId
            };
        }
    } else {
        params[model.apiIdentifier] = {
            [relatedField.apiIdentifier]: {
                [_effects.LINK_PARAM]: tenantId
            }
        };
    }
    if (record) {
        const value = record.getField(relatedField.apiIdentifier);
        // if the record doesn't have a shop set then anyone can update it
        if (value) {
            const recordShopId = typeof value === "object" ? value[_effects.LINK_PARAM] : value;
            if (String(recordShopId) !== tenantId) {
                throw new _errors.PermissionDeniedError();
            }
        } else {
            // we have to re-apply the params to the record to ensure that this still works correctly if it occurs after "applyParams"
            record.setField(relatedField.apiIdentifier, {
                [_effects.LINK_PARAM]: tenantId
            });
        }
    }
};
var TenantType;
