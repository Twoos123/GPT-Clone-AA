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
var errors_exports = {};
__export(errors_exports, {
  GlobalNotSetError: () => GlobalNotSetError,
  InternalError: () => InternalError,
  InvalidActionInputError: () => InvalidActionInputError,
  InvalidStateTransitionError: () => InvalidStateTransitionError,
  MisconfiguredActionError: () => MisconfiguredActionError,
  NoSessionForAuthenticationError: () => NoSessionForAuthenticationError,
  NoTransitionError: () => NoTransitionError,
  PermissionDeniedError: () => PermissionDeniedError,
  UserNotSetOnSessionError: () => UserNotSetOnSessionError
});
module.exports = __toCommonJS(errors_exports);
class GadgetError extends Error {
  constructor(message = "An internal error occurred.", details) {
    super(message);
    /** Was this error caused by the Gadget application's code */
    this.causedByUserland = false;
    /** Was this error caused by the API client calling the Gadget application */
    this.causedByClient = false;
    /** What HTTP status code should be sent when responding with this error */
    this.statusCode = 500;
    /** Was this error already logged? */
    this.logged = false;
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
  constructor(message = "Permission denied to access this resource.", details = {}) {
    super(message, details);
    this.code = "GGT_PERMISSION_DENIED";
    this.statusCode = 403;
    this.causedByClient = true;
    this.causedByUserland = false;
    this.actor = details.actor;
    this.actorRoleKeys = details.actorRoleKeys;
    this.resource = details.resource;
  }
}
PermissionDeniedError.code = "GGT_PERMISSION_DENIED";
class MisconfiguredActionError extends GadgetError {
  constructor(message = "Invalid action configuration, request cannot be processed until this is corrected.", details) {
    super(message, details);
    this.code = "GGT_MISCONFIGURED_ACTION";
    this.statusCode = 500;
    this.causedByClient = false;
    this.causedByUserland = true;
  }
}
MisconfiguredActionError.code = "GGT_MISCONFIGURED_ACTION";
class InternalError extends GadgetError {
  constructor(message = "An internal error occurred.", details) {
    super(message, details);
    this.code = "GGT_INTERNAL_ERROR";
    this.statusCode = 500;
    this.causedByClient = false;
    this.causedByUserland = false;
  }
}
InternalError.code = "GGT_INTERNAL_ERROR";
class InvalidActionInputError extends GadgetError {
  constructor(message = "Input was invalid for an action", details) {
    super(message, details);
    this.code = "GGT_INVALID_ACTION_INPUT";
    this.statusCode = 422;
    this.causedByClient = true;
    this.causedByUserland = false;
  }
}
InvalidActionInputError.code = "GGT_INVALID_ACTION_INPUT";
class InvalidStateTransitionError extends GadgetError {
  constructor(message = "Invalid state transition", details) {
    super(message, details);
    this.code = "GGT_INVALID_STATE_TRANSITION";
    this.statusCode = 422;
    this.causedByClient = false;
    this.causedByUserland = true;
  }
}
InvalidStateTransitionError.code = "GGT_INVALID_STATE_TRANSITION";
class UserNotSetOnSessionError extends GadgetError {
  constructor(message = "User not set on session", details) {
    super(message, details);
    this.code = "GGT_USER_NOT_SET_ON_SESSION";
    this.statusCode = 401;
    this.causedByClient = true;
    this.causedByUserland = false;
  }
}
UserNotSetOnSessionError.code = "GGT_USER_NOT_SET_ON_SESSION";
class NoSessionForAuthenticationError extends GadgetError {
  constructor(message = "There is no authenticated user in scope.", details) {
    super(message, details);
    this.code = "GGT_NO_SESSION_FOR_AUTHENTICATION";
    this.statusCode = 401;
    this.causedByClient = true;
    this.causedByUserland = false;
  }
}
NoSessionForAuthenticationError.code = "GGT_NO_SESSION_FOR_AUTHENTICATION";
class NoTransitionError extends GadgetError {
  constructor(message = "Invalid action", details) {
    super(message, details);
    this.code = "GGT_NO_TRANSITION";
    this.statusCode = 422;
    this.causedByClient = true;
    this.causedByUserland = false;
  }
}
NoTransitionError.code = "GGT_NO_TRANSITION";
class GlobalNotSetError extends GadgetError {
  constructor(message = "Globals not yet set", details) {
    super(message, details);
    this.code = "GGT_GLOBAL_NOT_SET";
    this.statusCode = 500;
    this.causedByClient = false;
    this.causedByUserland = false;
  }
}
GlobalNotSetError.code = "GGT_GLOBAL_NOT_SET";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GlobalNotSetError,
  InternalError,
  InvalidActionInputError,
  InvalidStateTransitionError,
  MisconfiguredActionError,
  NoSessionForAuthenticationError,
  NoTransitionError,
  PermissionDeniedError,
  UserNotSetOnSessionError
});
//# sourceMappingURL=errors.js.map
