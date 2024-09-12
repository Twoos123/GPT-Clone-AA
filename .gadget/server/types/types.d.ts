import type { AnyClient, GadgetRecord } from "@gadgetinc/api-client-core";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { Logger } from "./AmbientContext";
import type { Session } from "./Session";
import type { JSONTransportConfig, SESTransportConfig, SMTPTransportConfig, SendmailTransportConfig, StreamTransportConfig } from "./nodemailer-transports";
import type { AppTenancy, AppTenancyKey } from "./tenancy";
export interface ActionExecutionScope {
    recordDeleted?: boolean;
    [key: string]: any;
}
export interface RequestData {
    ip: string;
    url: string;
    method: string;
    id: string;
    userAgent?: string;
    headers: Record<string, string | string[] | undefined>;
}
export interface ShopifyWebhookActionTrigger {
    type: "shopify_webhook";
    topic: string;
    payload: Record<string, any>;
    shopId: string;
    retries: number;
}
export interface PublicAPIActionTrigger {
    mutationName: string;
    rootModel?: string;
    rootAction: string;
    rawParams: Record<string, any>;
}
export interface APIActionTrigger extends PublicAPIActionTrigger {
    type: "api";
}
export interface ShopifySyncActionTrigger {
    type: "shopify_sync";
    shopId: string;
    apiVersion: string;
    shopifyScopes: string[];
    syncId?: string;
    syncSince?: string;
    models: string[];
    force: boolean;
    startReason?: string;
}
export interface SchedulerActionTrigger {
    type: "scheduler";
}
export interface BackgroundActionTrigger extends Omit<APIActionTrigger, "type"> {
    type: "background-action";
    attemptNumber: number;
    finalAttempt: boolean;
    id: string;
    priority: string;
    queue?: {
        name: string;
        maxConcurrency: number;
    };
}
export interface ShopifyOAuthActionTrigger {
    type: "shopify_oauth";
}
export interface ShopifyAdminActionTrigger {
    type: "shopify_admin";
}
export interface ShopifyCustomerAccountLoginTrigger {
    type: "shopify_customer_account_login";
}
export interface PlatformTrigger {
    type: "platform";
    reason: string;
}
export interface MockActionTrigger {
    type: "mock";
}
export interface BigCommerceOauthActionTrigger {
    type: "bigcommerce_oauth";
}
export interface BigCommerceUninstallAppTrigger {
    type: "bigcommerce_uninstall";
    signed_payload_jwt: string;
}
export interface BigCommerceRemoveUserAppTrigger {
    type: "bigcommerce_remove_user";
    signed_payload_jwt: string;
}
export interface BigCommerceWebhookActionTrigger {
    type: "bigcommerce_webhook";
    scope: string;
    data: Record<string, any>;
    storeHash: string;
    createdAt: number;
    hash: string;
    retries: number;
}
export interface GoogleOAuthActionTrigger {
    user: {
        given_name: string;
        family_name: string;
        email: string;
        email_verified: string;
        name: string;
        picture: string;
        hd: string;
        locale: string;
    };
    token?: {
        token_type: string;
        id_token: string;
        access_token: string;
        refresh_token?: string;
        expires_in: number;
        scope: string;
    };
}
export interface GoogleOAuthSignInActionTrigger extends GoogleOAuthActionTrigger {
    type: "google_oauth_signin";
}
export interface GoogleOAuthSignUpActionTrigger extends GoogleOAuthActionTrigger {
    type: "google_oauth_signup";
}
export interface GadgetEmailPasswordSignUpTrigger extends PublicAPIActionTrigger {
    type: "user_sign_up";
}
export interface GadgetEmailPasswordSignInTrigger extends PublicAPIActionTrigger {
    type: "user_sign_in";
}
export interface GadgetEmailPasswordResetTrigger extends PublicAPIActionTrigger {
    type: "user_reset_password";
}
export interface GadgetEmailPasswordSendResetTrigger extends PublicAPIActionTrigger {
    type: "user_send_reset_password";
}
export interface GadgetEmailPasswordVerifyTrigger extends PublicAPIActionTrigger {
    type: "user_verify_email";
}
export interface GadgetEmailPasswordSendVerifyTrigger extends PublicAPIActionTrigger {
    type: "user_send_verify_email";
}
export interface GadgetEmailPasswordChangePasswordTrigger extends PublicAPIActionTrigger {
    type: "user_change_password";
}
export interface GadgetUserSignOutTrigger extends PublicAPIActionTrigger {
    type: "user_sign_out";
}
export type ActionTrigger = ShopifyWebhookActionTrigger | APIActionTrigger | ShopifySyncActionTrigger | SchedulerActionTrigger | BackgroundActionTrigger | ShopifyOAuthActionTrigger | ShopifyAdminActionTrigger | ShopifyCustomerAccountLoginTrigger | PlatformTrigger | MockActionTrigger | GoogleOAuthSignInActionTrigger | GoogleOAuthSignUpActionTrigger | GadgetEmailPasswordSignUpTrigger | GadgetEmailPasswordSignInTrigger | GadgetEmailPasswordResetTrigger | GadgetEmailPasswordSendResetTrigger | GadgetEmailPasswordVerifyTrigger | GadgetEmailPasswordSendVerifyTrigger | GadgetEmailPasswordChangePasswordTrigger | GadgetUserSignOutTrigger | BigCommerceOauthActionTrigger | BigCommerceUninstallAppTrigger | BigCommerceRemoveUserAppTrigger | BigCommerceWebhookActionTrigger;
export type ConfigurationVariablesBlob = Record<string, string | null>;
export type FindRecordCondition = Record<string, any>;
export interface BaseRecord {
    __typename?: string;
    id?: string;
    state?: any;
    stateHistory?: any;
    [key: string]: any;
}
export interface AnyBulkRecordLoader {
    loadRecord(apiIdentifier: string, namespace: string[], condition: FindRecordCondition): Promise<GadgetRecord<BaseRecord> | undefined>;
}
export interface ValidationErrors {
    add(field: string, message: string): void;
    get size(): number;
    get empty(): boolean;
    list: {
        apiIdentifier: string;
        message: string;
    }[];
    toJSON(): {
        [apiIdentifier: string]: string[];
    };
}
export interface NotYetTyped {
    [key: string]: any;
}
export interface AnyParams {
    [key: string]: string | number | boolean | object | bigint | null | undefined;
}
export interface ActionDescriptor {
    key: string;
    type: "Action" | "ModelAction";
    apiIdentifier: string;
    timeoutMilliseconds: number;
    hasReturnType: boolean;
}
export interface GlobalActionDescriptor {
    key: string;
    type: "GlobalAction";
    apiIdentifier: string;
    timeoutMilliseconds: number;
    hasReturnType: boolean;
}
export interface ModelDescriptor extends ModelMetadata {
    validator: {
        validate(context: AnyEffectContext, record: GadgetRecord<BaseRecord>): Promise<void>;
    };
}
export interface AnyAmbientContext {
    session: Session | null;
    sessionID: string | null;
    config: ConfigurationVariablesBlob;
    connections: Record<string, unknown>;
    signal: AbortSignal;
    logger: Logger;
    api: AnyClient;
    request?: RequestData;
    id: string;
    willRetry?: boolean;
    currentAppUrl: string;
    emails: GadgetMailer;
    [AppTenancyKey]?: AppTenancy;
    loaders: AnyBulkRecordLoader;
    effectAPIs: any;
    authConfig?: AuthenticationConfiguration;
}
export type GadgetConfig = {
    apiKeys: {
        shopify?: string;
    };
    environment?: string | null;
    env: {
        GADGET_APP: string;
        GADGET_ENV?: string;
        GADGET_PUBLIC_APP_SLUG: string;
        GADGET_PUBLIC_APP_ENV?: string;
        GADGET_PUBLIC_SHOPIFY_APP_URL?: string;
    } & {
        [key: string]: string | undefined;
    };
    shopifyInstallState?: {
        redirectToOauth: boolean;
        isAuthenticated: boolean;
        missingScopes: string[];
    };
    authentication?: Pick<AuthenticationConfiguration, "signInPath" | "redirectOnSuccessfulSignInPath">;
};
export interface AnyRequestContext extends AnyAmbientContext {
    gadgetConfig: GadgetConfig;
    gadgetContext: Record<string, any>;
    currentAppUrl: string;
    request: FastifyRequest;
    reply: FastifyReply;
    applicationIdentity: any | null;
    applicationSessionID?: string | null;
    applicationSession?: Session | null;
    signal: AbortSignal;
}
export interface BaseActionContext extends AnyAmbientContext {
    trigger: ActionTrigger;
    scope: ActionExecutionScope;
    [AppTenancyKey]?: AppTenancy;
}
export interface AnyActionContext extends BaseActionContext {
    type: "action";
    action: ActionDescriptor;
    record: GadgetRecord<BaseRecord>;
    model: ModelDescriptor;
    params: AnyParams;
    phase: "precondition" | "run" | "success" | "failure";
    context: AnyActionContext;
    transition?: {
        type: "Transition";
        key: string;
        actionKey: string;
        fromStateKey: string;
        toStateKey: string;
    };
}
export interface AnyGlobalActionContext extends BaseActionContext {
    type: "global-action";
    action: GlobalActionDescriptor;
    phase: "precondition" | "run" | "success" | "failure";
    params: AnyParams;
    context: AnyGlobalActionContext;
}
export interface AnyEffectContext extends BaseActionContext {
    type: "effect";
    effect: {
        spec: {
            id: string;
        };
        configuration: Record<string, any>;
    };
    params: AnyParams;
    connection?: unknown;
    model?: ModelDescriptor;
    record?: GadgetRecord<BaseRecord>;
}
export interface AnyPreconditionContext extends BaseActionContext {
    type: "precondition";
    condition: {
        spec: {
            id: string;
        };
        configuration: Record<string, any>;
    };
    model?: ModelDescriptor;
    record?: GadgetRecord<BaseRecord>;
    params: AnyParams;
}
export type ActionContextForBlob<T> = T extends {
    type: "Action";
} ? AnyActionContext : T extends {
    type: "GlobalAction";
} ? AnyGlobalActionContext : never;
export interface FieldMetadata {
    fieldType: string;
    key: string;
    name: string;
    apiIdentifier: string;
    configuration: {
        [key: string]: any;
    };
    internalWritable: boolean;
}
export interface ModelMetadata {
    key: string;
    name: string;
    apiIdentifier: string;
    namespace: string[];
    fields: {
        [key: string]: FieldMetadata;
    };
    graphqlTypeName: string;
    stateChart: any;
}
export interface GadgetMailer {
    verifyConnection(): Promise<void>;
    setTransport(transport: SMTPTransportConfig | SendmailTransportConfig | StreamTransportConfig | JSONTransportConfig | SESTransportConfig): void;
    sendMail(mailData: MailData): Promise<void>;
    render(template: string, data: any): string;
}
export interface AuthenticationConfigurationMethod {
    specID: string;
    configuration?: {
        type: "GoogleMethodConfiguration";
        gadgetManagedCredentials: boolean;
        callbackPath: string;
        scopes: string[];
        redirectOnSuccessfulSignInPath?: string | null;
        credentials: {
            clientID?: string;
            clientSecret?: string;
        };
        offlineMode: boolean;
    } | {
        type: "EmailPasswordMethodConfiguration";
    };
}
export interface AuthenticationConfiguration {
    signInPath: string;
    redirectOnForbidden: boolean;
    sessionExpirationMs: number;
    defaultAuthRoles: string[];
    redirectOnSuccessfulSignInPath?: string;
    methods?: AuthenticationConfigurationMethod[];
}
export type MailData = {
    to: string | string[] | Address | Array<string | Address>;
    subject?: string;
    html?: string;
    from?: string | Address;
    sender?: string | Address;
};
export type Address = {
    name: string;
    address: string;
};
