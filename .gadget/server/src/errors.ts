/** Bag of data details passed to an error */
interface ErrorDetails {
  cause?: Error;
  [key: string]: any;
}

/**
 * Parent class for all the enhanced errors in any gadget-owned package
 */
class GadgetError extends Error {
  /** Was this error caused by the Gadget application's code */
  causedByUserland = false;
  /** Was this error caused by the API client calling the Gadget application */
  causedByClient = false;
  /** What HTTP status code should be sent when responding with this error */
  statusCode = 500;
  /** A GGT_SOMETHING human/machine readable string unique error class name */
  code!: string;
  /** If this error is thrown, should we allow its code, message, and details to be sent to the client. Defaults to true for errors with 400 series status codes and false otherwise. */
  exposeToClient!: boolean;
  /** If this error is thrown, should we allow its code, message, and details to be sent to the sandbox. Defaults to true. */
  exposeToSandbox!: boolean;
  /** Optional bag of data about this error */
  details?: ErrorDetails;
  /** Was this error already logged? */
  logged = false;

  /** Inner error which caused this error */
  cause?: Error;

  constructor(message: string = "An internal error occurred.", details?: ErrorDetails) {
    super(message);
    this.message = `${(this.constructor as any).code}: ${this.message}`;
    this.details = details;
    if (details?.cause) {
      this.cause = details.cause;
      delete details.cause;
    }
    this.name = this.constructor.name;
  }
}

export interface PermissionDeniedDetails extends ErrorDetails {
  actor?: string | Record<string, any>;
  actorRoleKeys?: string[];
  resource?: Record<string, any>;
}

/** Thrown when an API client tries to access data that it's roles don't grant it access to. */
export class PermissionDeniedError extends GadgetError {
  code = "GGT_PERMISSION_DENIED" as const;
  static code = "GGT_PERMISSION_DENIED" as const;
  statusCode = 403;
  causedByClient = true;
  causedByUserland = false;
  actor?: string | Record<string, any>;
  actorRoleKeys?: string[];
  resource?: Record<string, any>;

  constructor(message: string = "Permission denied to access this resource.", details: PermissionDeniedDetails = {}) {
    super(message, details);
    this.actor = details.actor;
    this.actorRoleKeys = details.actorRoleKeys;
    this.resource = details.resource;
  }
}

/** Thrown when an action is trying to execute but can't because it's missing key configuration or some configuration value is itself invalid. This is the app developer's fault -- the action needs to be corrected in order to work. */
export class MisconfiguredActionError extends GadgetError {
  code = "GGT_MISCONFIGURED_ACTION" as const;
  static code = "GGT_MISCONFIGURED_ACTION" as const;
  statusCode = 500;
  causedByClient = false;
  causedByUserland = true;

  constructor(
    message: string = "Invalid action configuration, request cannot be processed until this is corrected.",
    details?: ErrorDetails
  ) {
    super(message, details);
  }
}

/**
 * Catch all error thrown when something unexpected happens within the Gadget platform that isn't directly the app developer's fault.
 * Indicates that the error is the fault of the platform, and hides the details of why in case it might leak sensitive information.
 * Try not to use this as it isn't actionable by app developers, but if something really is our fault and out of their control, it's cool.
 */
export class InternalError extends GadgetError {
  code = "GGT_INTERNAL_ERROR" as const;
  static code = "GGT_INTERNAL_ERROR" as const;
  statusCode = 500;
  causedByClient = false;
  causedByUserland = false;

  constructor(message: string = "An internal error occurred.", details?: ErrorDetails) {
    super(message, details);
  }
}

export class InvalidActionInputError extends GadgetError {
  code = "GGT_INVALID_ACTION_INPUT" as const;
  static code = "GGT_INVALID_ACTION_INPUT" as const;
  statusCode = 422;
  causedByClient = true;
  causedByUserland = false;

  constructor(message: string = "Input was invalid for an action", details?: ErrorDetails) {
    super(message, details);
  }
}

export class InvalidStateTransitionError extends GadgetError {
  code = "GGT_INVALID_STATE_TRANSITION" as const;
  static code = "GGT_INVALID_STATE_TRANSITION" as const;
  statusCode = 422;
  causedByClient = false;
  causedByUserland = true;

  constructor(message: string = "Invalid state transition", details?: ErrorDetails) {
    super(message, details);
  }
}

export class UserNotSetOnSessionError extends GadgetError {
  code = "GGT_USER_NOT_SET_ON_SESSION" as const;
  static code = "GGT_USER_NOT_SET_ON_SESSION" as const;
  statusCode = 401;
  causedByClient = true;
  causedByUserland = false;

  constructor(message: string = "User not set on session", details?: ErrorDetails) {
    super(message, details);
  }
}

export class NoSessionForAuthenticationError extends GadgetError {
  code = "GGT_NO_SESSION_FOR_AUTHENTICATION" as const;
  static code = "GGT_NO_SESSION_FOR_AUTHENTICATION" as const;
  statusCode = 401;
  causedByClient = true;
  causedByUserland = false;

  constructor(message: string = "There is no authenticated user in scope.", details?: ErrorDetails) {
    super(message, details);
  }
}

/** Represents what is thrown when an action can't be taken on a record because it's an illegal state transition */
export class NoTransitionError extends GadgetError {
  code = "GGT_NO_TRANSITION" as const;
  static code = "GGT_NO_TRANSITION" as const;
  statusCode = 422;
  causedByClient = true;
  causedByUserland = false;

  constructor(message: string = "Invalid action", details?: ErrorDetails) {
    super(message, details);
  }
}

export class GlobalNotSetError extends GadgetError {
  code = "GGT_GLOBAL_NOT_SET" as const;
  static code = "GGT_GLOBAL_NOT_SET" as const;
  statusCode = 500;
  causedByClient = false;
  causedByUserland = false;

  constructor(message: string = "Globals not yet set", details?: ErrorDetails) {
    super(message, details);
  }
}
