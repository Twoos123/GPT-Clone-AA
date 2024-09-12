interface ErrorDetails {
    cause?: Error;
    [key: string]: any;
}
declare class GadgetError extends Error {
    causedByUserland: boolean;
    causedByClient: boolean;
    statusCode: number;
    code: string;
    exposeToClient: boolean;
    exposeToSandbox: boolean;
    details?: ErrorDetails;
    logged: boolean;
    cause?: Error;
    constructor(message: string = "An internal error occurred.", details?: ErrorDetails);
}
export interface PermissionDeniedDetails extends ErrorDetails {
    actor?: string | Record<string, any>;
    actorRoleKeys?: string[];
    resource?: Record<string, any>;
}
export declare class PermissionDeniedError extends GadgetError {
    code: "GGT_PERMISSION_DENIED";
    static code: "GGT_PERMISSION_DENIED";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    actor?: string | Record<string, any>;
    actorRoleKeys?: string[];
    resource?: Record<string, any>;
    constructor(message: string = "Permission denied to access this resource.", details: PermissionDeniedDetails = {});
}
export declare class MisconfiguredActionError extends GadgetError {
    code: "GGT_MISCONFIGURED_ACTION";
    static code: "GGT_MISCONFIGURED_ACTION";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "Invalid action configuration, request cannot be processed until this is corrected.", details?: ErrorDetails);
}
export declare class InternalError extends GadgetError {
    code: "GGT_INTERNAL_ERROR";
    static code: "GGT_INTERNAL_ERROR";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "An internal error occurred.", details?: ErrorDetails);
}
export declare class InvalidActionInputError extends GadgetError {
    code: "GGT_INVALID_ACTION_INPUT";
    static code: "GGT_INVALID_ACTION_INPUT";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "Input was invalid for an action", details?: ErrorDetails);
}
export declare class InvalidStateTransitionError extends GadgetError {
    code: "GGT_INVALID_STATE_TRANSITION";
    static code: "GGT_INVALID_STATE_TRANSITION";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "Invalid state transition", details?: ErrorDetails);
}
export declare class UserNotSetOnSessionError extends GadgetError {
    code: "GGT_USER_NOT_SET_ON_SESSION";
    static code: "GGT_USER_NOT_SET_ON_SESSION";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "User not set on session", details?: ErrorDetails);
}
export declare class NoSessionForAuthenticationError extends GadgetError {
    code: "GGT_NO_SESSION_FOR_AUTHENTICATION";
    static code: "GGT_NO_SESSION_FOR_AUTHENTICATION";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "There is no authenticated user in scope.", details?: ErrorDetails);
}
export declare class NoTransitionError extends GadgetError {
    code: "GGT_NO_TRANSITION";
    static code: "GGT_NO_TRANSITION";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "Invalid action", details?: ErrorDetails);
}
export declare class GlobalNotSetError extends GadgetError {
    code: "GGT_GLOBAL_NOT_SET";
    static code: "GGT_GLOBAL_NOT_SET";
    statusCode: number;
    causedByClient: boolean;
    causedByUserland: boolean;
    constructor(message: string = "Globals not yet set", details?: ErrorDetails);
}
