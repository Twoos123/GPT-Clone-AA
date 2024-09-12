import type { GadgetRecord } from "@gadgetinc/api-client-core";
import { FieldType, getActionContextFromLocalStorage, LINK_PARAM } from "../effects";
import { MisconfiguredActionError, PermissionDeniedError } from "../errors";
import { Globals } from "../globals";
import type { BigCommerceTenancy } from "../tenancy";
import { AppTenancyKey } from "../tenancy";
import type { AnyParams, FieldMetadata, ModelDescriptor } from "../types";
export declare async function preventCrossStoreDataAccess(params: AnyParams, record: GadgetRecord<any>, options?: {
    storeBelongsToField?: string;
}): Promise<void>;
declare const bigcommerceModelKey: (modelName: string) => string;
declare const bigcommerceStoreKey: string;
declare const validateBelongsToLink: (options: {
    input: any;
    record: any;
    params: AnyParams;
    tenancy: BigCommerceTenancy;
    model: ModelDescriptor;
    relatedModelKey: string;
    tenantBelongsToField?: string | undefined;
    tenantType: TenantType;
}) => any;
declare const setBelongsToLink: (input: any, record: any, params: AnyParams, model: ModelDescriptor, relatedField: FieldMetadata, tenantId: string) => any;
declare const enum TenantType {
    Store = "store"
}
