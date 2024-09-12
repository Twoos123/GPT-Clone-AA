/** Bag of data details passed to an error */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    GlobalNotSetError: function() {
        return GlobalNotSetError;
    },
    InternalError: function() {
        return InternalError;
    },
    InvalidActionInputError: function() {
        return InvalidActionInputError;
    },
    InvalidStateTransitionError: function() {
        return InvalidStateTransitionError;
    },
    MisconfiguredActionError: function() {
        return MisconfiguredActionError;
    },
    NoSessionForAuthenticationError: function() {
        return NoSessionForAuthenticationError;
    },
    NoTransitionError: function() {
        return NoTransitionError;
    },
    PermissionDeniedError: function() {
        return PermissionDeniedError;
    },
    UserNotSetOnSessionError: function() {
        return UserNotSetOnSessionError;
    }
});
/**
 * Parent class for all the enhanced errors in any gadget-owned package
 */ class GadgetError extends Error {
    /** Was this error caused by the Gadget application's code */ causedByUserland = false;
    /** Was this error caused by the API client calling the Gadget application */ causedByClient = false;
    /** What HTTP status code should be sent when responding with this error */ statusCode = 500;
    /** A GGT_SOMETHING human/machine readable string unique error class name */ code;
    /** If this error is thrown, should we allow its code, message, and details to be sent to the client. Defaults to true for errors with 400 series status codes and false otherwise. */ exposeToClient;
    /** If this error is thrown, should we allow its code, message, and details to be sent to the sandbox. Defaults to true. */ exposeToSandbox;
    /** Optional bag of data about this error */ details;
    /** Was this error already logged? */ logged = false;
    /** Inner error which caused this error */ cause;
    constructor(message = "An internal error occurred.", details){
        super(message);
        this.message = `${this.constructor.code}: ${this.message}`;
        this.details = details;
        if (details?.cause) {
            this.cause = details.cause;
            delete details.cause;
        }
        this.name = this.constructor.name;
    }
}
class PermissionDeniedError extends GadgetError {
    code = "GGT_PERMISSION_DENIED";
    static code = "GGT_PERMISSION_DENIED";
    statusCode = 403;
    causedByClient = true;
    causedByUserland = false;
    actor;
    actorRoleKeys;
    resource;
    constructor(message = "Permission denied to access this resource.", details = {}){
        super(message, details);
        this.actor = details.actor;
        this.actorRoleKeys = details.actorRoleKeys;
        this.resource = details.resource;
    }
}
class MisconfiguredActionError extends GadgetError {
    code = "GGT_MISCONFIGURED_ACTION";
    static code = "GGT_MISCONFIGURED_ACTION";
    statusCode = 500;
    causedByClient = false;
    causedByUserland = true;
    constructor(message = "Invalid action configuration, request cannot be processed until this is corrected.", details){
        super(message, details);
    }
}
class InternalError extends GadgetError {
    code = "GGT_INTERNAL_ERROR";
    static code = "GGT_INTERNAL_ERROR";
    statusCode = 500;
    causedByClient = false;
    causedByUserland = false;
    constructor(message = "An internal error occurred.", details){
        super(message, details);
    }
}
class InvalidActionInputError extends GadgetError {
    code = "GGT_INVALID_ACTION_INPUT";
    static code = "GGT_INVALID_ACTION_INPUT";
    statusCode = 422;
    causedByClient = true;
    causedByUserland = false;
    constructor(message = "Input was invalid for an action", details){
        super(message, details);
    }
}
class InvalidStateTransitionError extends GadgetError {
    code = "GGT_INVALID_STATE_TRANSITION";
    static code = "GGT_INVALID_STATE_TRANSITION";
    statusCode = 422;
    causedByClient = false;
    causedByUserland = true;
    constructor(message = "Invalid state transition", details){
        super(message, details);
    }
}
class UserNotSetOnSessionError extends GadgetError {
    code = "GGT_USER_NOT_SET_ON_SESSION";
    static code = "GGT_USER_NOT_SET_ON_SESSION";
    statusCode = 401;
    causedByClient = true;
    causedByUserland = false;
    constructor(message = "User not set on session", details){
        super(message, details);
    }
}
class NoSessionForAuthenticationError extends GadgetError {
    code = "GGT_NO_SESSION_FOR_AUTHENTICATION";
    static code = "GGT_NO_SESSION_FOR_AUTHENTICATION";
    statusCode = 401;
    causedByClient = true;
    causedByUserland = false;
    constructor(message = "There is no authenticated user in scope.", details){
        super(message, details);
    }
}
class NoTransitionError extends GadgetError {
    code = "GGT_NO_TRANSITION";
    static code = "GGT_NO_TRANSITION";
    statusCode = 422;
    causedByClient = true;
    causedByUserland = false;
    constructor(message = "Invalid action", details){
        super(message, details);
    }
}
class GlobalNotSetError extends GadgetError {
    code = "GGT_GLOBAL_NOT_SET";
    static code = "GGT_GLOBAL_NOT_SET";
    statusCode = 500;
    causedByClient = false;
    causedByUserland = false;
    constructor(message = "Globals not yet set", details){
        super(message, details);
    }
}
