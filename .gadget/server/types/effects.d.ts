import type { AnyClient, InternalModelManager, RecordData } from "@gadgetinc/api-client-core";
import { ChangeTracking, GadgetRecord } from "@gadgetinc/api-client-core";
import { InternalError, InvalidStateTransitionError, NoSessionForAuthenticationError, UserNotSetOnSessionError } from "./errors";
import { Globals, actionContextLocalStorage } from "./globals";
import { frameworkVersion, modelListIndex, modelsMap } from "./metadata";
import type { AnyActionContext, AnyAmbientContext, AnyEffectContext, AnyGlobalActionContext, AnyParams, ModelMetadata, NotYetTyped } from "./types";
import { assert } from "./utils";
export declare function getBelongsToRelationParams(model: ModelMetadata, params: Record<string, any>): Record<string, any>;
export declare function createGadgetRecord<Shape>(apiIdentifier: string, data: Shape): GadgetRecord<Shape & {
    __typename: string;
}>;
export declare function applyParams(params: AnyParams, record: GadgetRecord<any>): void;
export declare const internalModelManagerForModel: (api: AnyClient, apiIdentifier: string, namespace: string[]) => InternalModelManager;
export declare const internalModelManagerForTypename: (api: AnyClient, typename: string) => InternalModelManager;
export declare async function save(record: GadgetRecord<any>): Promise<void>;
export declare async function deleteRecord(record: GadgetRecord<any>): Promise<void>;
export declare function transitionState(record: GadgetRecord<any>, transition: {
    from?: string | Record<string, string>;
    to: string | Record<string, string>;
}): void;
export declare function legacySetUser(): void;
export declare function legacyUnsetUser(): void;
export declare async function legacySuccessfulAuthentication(params: AnyParams): Promise<void>;
export declare function doesVersionSupportSourceControl(): boolean;
export declare function getActionContextFromLocalStorage(): AnyActionContext | AnyGlobalActionContext | AnyEffectContext;
export declare function maybeGetActionContextFromLocalStorage(): AnyActionContext | AnyGlobalActionContext | AnyEffectContext | undefined;
export declare function getCurrentContext(): AnyAmbientContext;
export declare const LINK_PARAM: string;
export declare function writableAttributes(model: ModelMetadata, record: GadgetRecord<RecordData>): Record<string, any>;
export declare function changedAttributes(model: ModelMetadata, record: GadgetRecord<RecordData>): Record<string, any>;
export declare const getModelByApiIdentifier: (apiIdentifier: string) => ModelMetadata;
export declare const getModelByTypename: (typename: string) => ModelMetadata;
export declare enum FieldType {
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
    Any = "Any",
    Null = "Null",
    RecordState = "RecordState",
    RoleAssignments = "RoleAssignments"
}
