import { GadgetRecord } from "@gadgetinc/api-client-core";
import { FieldType, LINK_PARAM, getActionContextFromLocalStorage, getCurrentContext, internalModelManagerForModel, maybeGetActionContextFromLocalStorage } from "../effects";
import { InvalidActionInputError, MisconfiguredActionError, PermissionDeniedError } from "../errors";
import { Globals } from "../globals";
import { AppTenancyKey } from "../tenancy";
import type { AnyParams, FieldMetadata, ModelDescriptor } from "../types";
import { assert } from "../utils";
export declare const ShopifyShopState: {
    readonly Installed: {
        readonly created: string;
    };
    readonly Uninstalled: {
        readonly created: string;
    };
};
export declare const ShopifySyncState: {
    readonly Created: string;
    readonly Running: string;
    readonly Completed: string;
    readonly Errored: string;
};
export declare const ShopifyBulkOperationState: {
    readonly Created: string;
    readonly Completed: string;
    readonly Canceled: string;
    readonly Failed: string;
    readonly Expired: string;
};
export declare const ShopifySellingPlanGroupProductVariantState: {
    readonly Started: string;
    readonly Created: string;
    readonly Deleted: string;
};
export declare const ShopifySellingPlanGroupProductState: {
    readonly Started: string;
    readonly Created: string;
    readonly Deleted: string;
};
export declare async function shopifySync(params: AnyParams, record: GadgetRecord<any>): Promise<void>;
export declare async function abortSync(params: AnyParams, record: GadgetRecord<any>): Promise<void>;
export declare async function preventCrossShopDataAccess(params: AnyParams, record: GadgetRecord<any>, options?: {
    shopBelongsToField?: string;
    customerBelongsToField?: string;
    enforceCustomerTenancy?: boolean;
}): Promise<void>;
declare const validateBelongsToLink: (input: any, record: any, params: AnyParams, tenantId: string, model: ModelDescriptor, relatedModelKey: string, tenantBelongsToField: string | undefined, tenantType: TenantType) => any;
declare const setBelongsToLink: (input: any, record: any, params: AnyParams, model: ModelDescriptor, relatedField: FieldMetadata, tenantId: string) => any;
export declare async function globalShopifySync(params: {
    apiKeys: string[];
    syncSince: string;
    models: string[];
    force: boolean;
    startReason: string;
}): Promise<void>;
declare const enum TenantType {
    Shop = "shop",
    Customer = "customer"
}
declare const shopifyModelKey: (modelName: string) => string;
export declare async function finishBulkOperation(record: GadgetRecord<any>): Promise<void>;
declare const ShopifyShopKey: string;
declare const ShopifyCustomerKey: string;
declare const ShopifyBulkOperationGIDForId: (id: string) => any;
