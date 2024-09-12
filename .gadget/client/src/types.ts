import { FieldSelection, FilterNever } from "@gadgetinc/api-client-core";

type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONObject {
    [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> { }


export enum GadgetFieldType {
  Any,
  Array,
  BelongsTo,
  Boolean,
  Code,
  Color,
  Computed,
  DateTime,
  Email,
  EncryptedString,
  Enum,
  File,
  HasMany,
  HasManyThrough,
  HasOne,
  ID,
  JSON,
  Money,
  Null,
  Number,
  Object,
  Password,
  RecordState,
  RichText,
  RoleAssignments,
  String,
  URL,
  Vector,
}


export enum BackgroundActionPriority {
  DEFAULT,
  HIGH,
  LOW,
  PLATFORM,
}



export type GadgetFieldValidationUnion = AvailableGadgetRegexFieldValidationSelection | AvailableGadgetRangeFieldValidationSelection | AvailableGadgetOnlyImageFileFieldValidationSelection | AvailableGadgetGenericFieldValidationSelection;


export type AvailableGadgetFieldValidationUnionSelection = GadgetRegexFieldValidation | GadgetRangeFieldValidation | GadgetOnlyImageFileFieldValidation | GadgetGenericFieldValidation;

/** Represents the possible values of the role enum. */
export type MessageRoleEnum = "system" | "user" | "assistant";

/** A sort order for a field. Can be Ascending or Descending. */
export type SortOrder = "Ascending"|"Descending";

/** Represents one user result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalUserRecord = Scalars["JSONObject"];

/** Represents one session result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalSessionRecord = Scalars["JSONObject"];

/** Represents one message result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalMessageRecord = Scalars["JSONObject"];

/** Represents one chat result record in internal api calls. Returns a JSON blob of all the record's fields. */
export type InternalChatRecord = Scalars["JSONObject"];



export type MessageSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the content field. Defaults to ascending (smallest value first). */
  content?: SortOrder | null;

  /** Sort the results by the order field. Defaults to ascending (smallest value first). */
  order?: SortOrder | null;

  /** Sort the results by the role field. Defaults to ascending (smallest value first). */
  role?: SortOrder | null;
};



export type MessageFilter = {

  AND?: (MessageFilter | null)[];

  OR?: (MessageFilter | null)[];

  NOT?: (MessageFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  content?: StringFilter | null;

  order?: FloatFilter | null;

  chat?: IDFilter | null;

  chatId?: IDFilter | null;

  role?: SingleEnumFilter | null;
};



export type IDFilter = {

  equals?: (Scalars['GadgetID'] | null) | null;

  notEquals?: (Scalars['GadgetID'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['GadgetID'] | null) | null)[];

  notIn?: ((Scalars['GadgetID'] | null) | null)[];

  lessThan?: (Scalars['GadgetID'] | null) | null;

  lessThanOrEqual?: (Scalars['GadgetID'] | null) | null;

  greaterThan?: (Scalars['GadgetID'] | null) | null;

  greaterThanOrEqual?: (Scalars['GadgetID'] | null) | null;
};



export type DateTimeFilter = {

  equals?: Date | Scalars['ISO8601DateString'] | null;

  notEquals?: Date | Scalars['ISO8601DateString'] | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: (Date | Scalars['ISO8601DateString'] | null)[];

  notIn?: (Date | Scalars['ISO8601DateString'] | null)[];

  lessThan?: Date | Scalars['ISO8601DateString'] | null;

  lessThanOrEqual?: Date | Scalars['ISO8601DateString'] | null;

  greaterThan?: Date | Scalars['ISO8601DateString'] | null;

  greaterThanOrEqual?: Date | Scalars['ISO8601DateString'] | null;

  before?: Date | Scalars['ISO8601DateString'] | null;

  after?: Date | Scalars['ISO8601DateString'] | null;
};



export type StringFilter = {

  equals?: (Scalars['String'] | null) | null;

  notEquals?: (Scalars['String'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['String'] | null) | null)[];

  notIn?: ((Scalars['String'] | null) | null)[];

  lessThan?: (Scalars['String'] | null) | null;

  lessThanOrEqual?: (Scalars['String'] | null) | null;

  greaterThan?: (Scalars['String'] | null) | null;

  greaterThanOrEqual?: (Scalars['String'] | null) | null;

  startsWith?: (Scalars['String'] | null) | null;
};



export type FloatFilter = {

  equals?: (Scalars['Float'] | null) | null;

  notEquals?: (Scalars['Float'] | null) | null;

  isSet?: (Scalars['Boolean'] | null) | null;

  in?: ((Scalars['Float'] | null) | null)[];

  notIn?: ((Scalars['Float'] | null) | null)[];

  lessThan?: (Scalars['Float'] | null) | null;

  lessThanOrEqual?: (Scalars['Float'] | null) | null;

  greaterThan?: (Scalars['Float'] | null) | null;

  greaterThanOrEqual?: (Scalars['Float'] | null) | null;
};



export type SingleEnumFilter = {

  isSet?: (Scalars['Boolean'] | null) | null;

  equals?: (Scalars['String'] | null) | null;

  notEquals?: (Scalars['String'] | null) | null;

  in?: ((Scalars['String'] | null) | null)[];
};



export type ChatSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the name field. Defaults to ascending (smallest value first). */
  name?: SortOrder | null;
};



export type ChatFilter = {

  AND?: (ChatFilter | null)[];

  OR?: (ChatFilter | null)[];

  NOT?: (ChatFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  name?: StringFilter | null;

  user?: IDFilter | null;

  userId?: IDFilter | null;
};



export type UserSort = {

  /** Sort the results by the id field. Defaults to ascending (smallest value first). */
  id?: SortOrder | null;

  /** Sort the results by the createdAt field. Defaults to ascending (smallest value first). */
  createdAt?: SortOrder | null;

  /** Sort the results by the updatedAt field. Defaults to ascending (smallest value first). */
  updatedAt?: SortOrder | null;

  /** Sort the results by the lastName field. Defaults to ascending (smallest value first). */
  lastName?: SortOrder | null;

  /** Sort the results by the firstName field. Defaults to ascending (smallest value first). */
  firstName?: SortOrder | null;

  /** Sort the results by the googleImageUrl field. Defaults to ascending (smallest value first). */
  googleImageUrl?: SortOrder | null;

  /** Sort the results by the lastSignedIn field. Defaults to ascending (smallest value first). */
  lastSignedIn?: SortOrder | null;

  /** Sort the results by the email field. Defaults to ascending (smallest value first). */
  email?: SortOrder | null;
};



export type UserFilter = {

  AND?: (UserFilter | null)[];

  OR?: (UserFilter | null)[];

  NOT?: (UserFilter | null)[];

  id?: IDFilter | null;

  createdAt?: DateTimeFilter | null;

  updatedAt?: DateTimeFilter | null;

  lastName?: StringFilter | null;

  firstName?: StringFilter | null;

  googleImageUrl?: StringFilter | null;

  lastSignedIn?: DateTimeFilter | null;

  email?: StringFilter | null;
};



export type SessionFilter = {

  id?: IDEqualsFilter | null;

  user?: IDEqualsFilter | null;

  userId?: IDEqualsFilter | null;
};



export type IDEqualsFilter = {

  equals?: (Scalars['GadgetID'] | null) | null;
};



export type SignOutUserInput = {

  lastName?: (Scalars['String'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  chats?: (ChatHasManyInput | null)[];

  googleImageUrl?: (Scalars['String'] | null) | null;

  lastSignedIn?: Date | Scalars['ISO8601DateString'] | null;

  email?: (Scalars['String'] | null) | null;
};



export type ChatHasManyInput = {

  create?: NestedChatCreateInput | null;

  update?: NestedChatUpdateInput | null;

  delete?: NestedChatDeleteInput | null;

  name?: NestedChatNameInput | null;

  /** Creates, updates, or deletes existing records in the database as needed to arrive at the list of records specified. */
  _converge?: ConvergeChatInput | null;
};



export type NestedChatCreateInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];
};



export type UserBelongsToInput = {

  signOut?: NestedUserSignOutInput | null;

  update?: NestedUserUpdateInput | null;

  delete?: NestedUserDeleteInput | null;

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type NestedUserSignOutInput = {

  lastName?: (Scalars['String'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  chats?: (ChatHasManyInput | null)[];

  googleImageUrl?: (Scalars['String'] | null) | null;

  lastSignedIn?: Date | Scalars['ISO8601DateString'] | null;

  email?: (Scalars['String'] | null) | null;

  id: (Scalars['GadgetID'] | null);
};



export type NestedUserUpdateInput = {

  lastName?: (Scalars['String'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  chats?: (ChatHasManyInput | null)[];

  googleImageUrl?: (Scalars['String'] | null) | null;

  lastSignedIn?: Date | Scalars['ISO8601DateString'] | null;

  email?: (Scalars['String'] | null) | null;

  id: (Scalars['GadgetID'] | null);
};



export type NestedUserDeleteInput = {

  id: (Scalars['GadgetID'] | null);
};



export type MessageHasManyInput = {

  create?: NestedMessageCreateInput | null;

  update?: NestedMessageUpdateInput | null;

  delete?: NestedMessageDeleteInput | null;

  /** Creates, updates, or deletes existing records in the database as needed to arrive at the list of records specified. */
  _converge?: ConvergeMessageInput | null;
};



export type NestedMessageCreateInput = {

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: ChatBelongsToInput | null;

  role?: MessageRoleEnum | null;
};



export type ChatBelongsToInput = {

  create?: NestedChatCreateInput | null;

  update?: NestedChatUpdateInput | null;

  delete?: NestedChatDeleteInput | null;

  name?: NestedChatNameInput | null;

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type NestedChatUpdateInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];

  id: (Scalars['GadgetID'] | null);
};



export type NestedChatDeleteInput = {

  id: (Scalars['GadgetID'] | null);
};



export type NestedChatNameInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];

  firstMessage?: (Scalars['String'] | null) | null;

  id: (Scalars['GadgetID'] | null);
};



export type NestedMessageUpdateInput = {

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: ChatBelongsToInput | null;

  role?: MessageRoleEnum | null;

  id: (Scalars['GadgetID'] | null);
};



export type NestedMessageDeleteInput = {

  id: (Scalars['GadgetID'] | null);
};



export type ConvergeMessageInput = {

  /** The new list of records to converge to */
  values: (ConvergeMessageValues | null)[];

  /** An optional partial set of action api identifiers to use when creating, updating, and deleting records to converge to the new list. */
  actions?: ConvergeActionMap | null;
};



export type ConvergeMessageValues = {

  id?: (Scalars['GadgetID'] | null) | null;

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: ChatBelongsToInput | null;

  role?: MessageRoleEnum | null;
};



export type ConvergeActionMap = {

  /** One of the model action's API identifiers. Specifies which action to use to create new records that are in the set of specified records but not yet in the database. Defaults to the action named `create` if it exists. */
  create?: (Scalars['String'] | null) | null;

  /** One of the model action's API identifiers. Specifies which action to use to update new records that are in the set of specified records and already in the database, but maybe have different field values. Defaults to the action named `update` if it exists. */
  update?: (Scalars['String'] | null) | null;

  /** One of the model action's API identifiers. Specifies which action to use to delete records that are not in the set of specified records but exist in the database. Defaults to the action named `delete` if it exists. */
  delete?: (Scalars['String'] | null) | null;
};



export type ConvergeChatInput = {

  /** The new list of records to converge to */
  values: (ConvergeChatValues | null)[];

  /** An optional partial set of action api identifiers to use when creating, updating, and deleting records to converge to the new list. */
  actions?: ConvergeActionMap | null;
};



export type ConvergeChatValues = {

  id?: (Scalars['GadgetID'] | null) | null;

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];
};



export type BulkSignOutUsersInput = {

  user?: SignOutUserInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type UpdateUserInput = {

  lastName?: (Scalars['String'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  chats?: (ChatHasManyInput | null)[];

  googleImageUrl?: (Scalars['String'] | null) | null;

  lastSignedIn?: Date | Scalars['ISO8601DateString'] | null;

  email?: (Scalars['String'] | null) | null;
};



export type BulkUpdateUsersInput = {

  user?: UpdateUserInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type CreateMessageInput = {

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: ChatBelongsToInput | null;

  role?: MessageRoleEnum | null;
};



export type BulkCreateMessagesInput = {

  message?: CreateMessageInput | null;
};



export type UpdateMessageInput = {

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: ChatBelongsToInput | null;

  role?: MessageRoleEnum | null;
};



export type BulkUpdateMessagesInput = {

  message?: UpdateMessageInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type CreateChatInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];
};



export type BulkCreateChatsInput = {

  chat?: CreateChatInput | null;
};



export type UpdateChatInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];
};



export type BulkUpdateChatsInput = {

  chat?: UpdateChatInput | null;

  id: (Scalars['GadgetID'] | null);
};



export type NameChatInput = {

  name?: (Scalars['String'] | null) | null;

  user?: UserBelongsToInput | null;

  messages?: (MessageHasManyInput | null)[];
};



export type BulkNameChatsInput = {

  chat?: NameChatInput | null;

  firstMessage?: (Scalars['String'] | null) | null;

  id: (Scalars['GadgetID'] | null);
};



export type EnqueueBackgroundActionOptions = {

  /** A fixed ID to assign to this background action. If not passed, a random ID will be generated and assigned. */
  id?: (Scalars['String'] | null) | null;

  /** The priority for executing this action. */
  priority?: BackgroundActionPriority | null;

  /** Group actions into the same queue and limit the concurrency they can run with. */
  queue?: BackgroundActionQueue | null;

  /** Options governing if and how this action will be retried if it fails. */
  retries?: BackgroundActionRetryPolicy | null;

  /** Actions won't be started until after this time. */
  startAt?: Date | Scalars['ISO8601DateString'] | null;
};



export type BackgroundActionQueue = {

  /** The identifier for this queue. */
  name: (Scalars['String'] | null);

  /** The maximum number of actions that will be run at the same time. Defaults to 1 if not passed (only one job per key at once). */
  maxConcurrency?: (Scalars['Int'] | null) | null;
};



export type BackgroundActionRetryPolicy = {

  /** The number of repeat attempts to make if the initial attempt fails. Defaults to 10. Note: the total number of attempts will be this number plus one -- this counts the number of retries *after* the first attempt. */
  retryCount?: (Scalars['Int'] | null) | null;

  /** How long to delay the first retry attempt, in milliseconds. Default is 1000. */
  initialInterval?: (Scalars['Int'] | null) | null;

  /** The maximum amount of time to delay a retry while exponentially backing off in milliseconds. Default is not set, so the retry can backoff indefinitely */
  maxInterval?: (Scalars['Int'] | null) | null;

  /** The exponential backoff factor to use for calculating the retry delay for successive retries. Set this higher to grow the delay faster with each retry attempt. Default is 2. */
  backoffFactor?: (Scalars['Int'] | null) | null;

  /** If true, the retry interval will be randomized by a small amount to avoid all retries happening at the same time. Default is false. */
  randomizeInterval?: (Scalars['Boolean'] | null) | null;
};



export type InternalUserInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  lastName?: (Scalars['String'] | null) | null;

  firstName?: (Scalars['String'] | null) | null;

  googleImageUrl?: (Scalars['String'] | null) | null;

  lastSignedIn?: Date | Scalars['ISO8601DateString'] | null;

  /** A string list of Gadget platform Role keys to assign to this record */
  roles?: ((Scalars['String'] | null))[];

  email?: (Scalars['String'] | null) | null;
};



export type AppGraphQLTriggerMutationContext = {

  /** The ID of the session that triggered this mutation. Will be the session that's loaded in the mutation context. */
  sessionID?: (Scalars['GadgetID'] | null) | null;
};



export type InternalSessionInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  user?: InternalBelongsToInput | null;
};



export type InternalBelongsToInput = {

  /** Existing ID of another record, which you would like to associate this record with */
  _link?: (Scalars['GadgetID'] | null) | null;
};



export type InternalMessageInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  content?: (Scalars['String'] | null) | null;

  order?: (Scalars['Float'] | null) | null;

  chat?: InternalBelongsToInput | null;

  role?: MessageRoleEnum | null;

  /** An optional list of atomically applied commands for race-safe mutations of the record */
  _atomics?: InternalMessageAtomicsInput | null;
};



export type InternalMessageAtomicsInput = {

  /** Numeric atomic commands for operating on order. */
  order?: (NumericAtomicFieldUpdateInput)[];
};



export type NumericAtomicFieldUpdateInput = {

  /** A number to atomically increment the field value by. Can only be used on numeric fields. */
  increment?: (Scalars['Float'] | null) | null;

  /** A number to atomically decrement the field value by. Can only be used on numeric fields. */
  decrement?: (Scalars['Float'] | null) | null;
};



export type InternalChatInput = {

  state?: (Scalars['RecordState'] | null) | null;

  stateHistory?: (Scalars['RecordState'] | null) | null;

  id?: (Scalars['GadgetID'] | null) | null;

  createdAt?: Date | Scalars['ISO8601DateString'] | null;

  updatedAt?: Date | Scalars['ISO8601DateString'] | null;

  name?: (Scalars['String'] | null) | null;

  user?: InternalBelongsToInput | null;
};


/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  /** Represents an amount of some currency. Specified as a string so user's aren't tempted to do math on the value. */
  CurrencyAmount: string;
  /** Represents a UTC date formatted an ISO-8601 formatted 'full-date' string. */
  ISO8601DateString: string;
  /** A file object produced by a browser for uploading to cloud storage */
  Upload: File;
  /** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
  String: string;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: JSONObject;
  /** The `Boolean` scalar type represents `true` or `false`. */
  Boolean: boolean;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: JSONValue;
  /** Integer type that can handle bigints and Big numbers */
  Int: number;
  /** The ID of a record in Gadget */
  GadgetID: string;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
  /** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
  Float: number;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: string;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: string;
  /** Represents the state of one record in a Gadget database. Represented as either a string or set of strings nested in objects. */
  RecordState: (string | { [key: string]: Scalars['RecordState'] });
  /** Instructions for a client to turn raw transport types (like strings) into useful client side types (like Dates). Unstable and not intended for developer use. */
  HydrationPlan: unknown;
};


/** This Error object is returned for errors which don't have other specific handling. It has a message which is safe to display to users, but is often technical in nature. It also has a `code` field which is documented in the Gadget API Error Codes docs. */
export interface SimpleError extends ExecutionError {
  __typename: 'SimpleError';
  /** The human facing error message for this error. */
  message: Scalars['String'];
  /** The Gadget platform error code for this error. */
  code: Scalars['String'];
  /** The stack for any exception that caused the error */
  stack: (Scalars['String'] | null);
};



export type AvailableSimpleErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this error. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error */
  stack?: boolean | null | undefined;
};



export type ExecutionError = {

  __typename: 'SimpleError'|'InvalidRecordError';

  /** The human facing error message for this error. */
  message: Scalars['String'];

  /** The Gadget platform error code for this error. */
  code: Scalars['String'];

  /** The stack for any exception that caused the error. Only available for super users. */
  stack: (Scalars['String'] | null);
};



export type AvailableExecutionErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this error. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error. Only available for super users. */
  stack?: boolean | null | undefined;
};


/** This object is returned as an error when a record doesn't pass the defined validations on the model. The validation messages for each of the invalid fields are available via the other fields on this error type. */
export interface InvalidRecordError extends ExecutionError {
  __typename: 'InvalidRecordError';
  /** The human facing error message for this error. */
  message: Scalars['String'];
  /** The Gadget platform error code for this InvalidRecordError. */
  code: Scalars['String'];
  /** The stack for any exception that caused the error */
  stack: (Scalars['String'] | null);
  /** An object mapping field apiIdentifiers to arrays of validation error message strings for that field, as a JSON object. The object may have keys that don't correspond exactly to field apiIdentifiers if added by validations, and the object may have missing keys if no errors were encountered for that field. */
  validationErrorsByField: (Scalars['JSONObject'] | null);
  /** A list of InvalidFieldError objects describing each of the errors encountered on the invalid record. */
  validationErrors: InvalidFieldError[];
  /** The record which failed validation, if available. Returns all the owned fields of the record -- no sub-selections are required or possible. Only available for super users. */
  record: (Scalars['JSONObject'] | null);
  /** The model of the record which failed validation */
  model: (GadgetModel | null);
};



export type AvailableInvalidRecordErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The Gadget platform error code for this InvalidRecordError. */
  code?: boolean | null | undefined;

  /** The stack for any exception that caused the error */
  stack?: boolean | null | undefined;

  /** An object mapping field apiIdentifiers to arrays of validation error message strings for that field, as a JSON object. The object may have keys that don't correspond exactly to field apiIdentifiers if added by validations, and the object may have missing keys if no errors were encountered for that field. */
  validationErrorsByField?: boolean | null | undefined;

  /** A list of InvalidFieldError objects describing each of the errors encountered on the invalid record. */
  validationErrors?: AvailableInvalidFieldErrorSelection;

  /** The record which failed validation, if available. Returns all the owned fields of the record -- no sub-selections are required or possible. Only available for super users. */
  record?: boolean | null | undefined;

  /** The model of the record which failed validation */
  model?: AvailableGadgetModelSelection;
};


/** This Error object represents one individual failed validation for a record field. It has a message which is appropriate for display to a user, and lists the apiIdentifier of the field in question. The `apiIdentifier` for the field is not guaranteed to exist on the model. */
export type InvalidFieldError = {

  __typename: 'InvalidFieldError';

  /** The human facing error message for this error. */
  message: Scalars['String'];

  /** The apiIdentifier of the field this error occurred on. */
  apiIdentifier: Scalars['String'];
};



export type AvailableInvalidFieldErrorSelection = {

  __typename?: boolean | null | undefined;

  /** The human facing error message for this error. */
  message?: boolean | null | undefined;

  /** The apiIdentifier of the field this error occurred on. */
  apiIdentifier?: boolean | null | undefined;
};



export type GadgetModel = {

  __typename: 'GadgetModel';

  key: Scalars['String'];

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  filterable: Scalars['Boolean'];

  sortable: Scalars['Boolean'];

  searchable: Scalars['Boolean'];

  defaultDisplayField: GadgetModelField;

  fields: GadgetModelField[];

  actions: GadgetAction[];

  action: (GadgetAction | null);

  pluralName: Scalars['String'];

  pluralApiIdentifier: Scalars['String'];

  currentSingletonApiIdentifier: (Scalars['String'] | null);

  defaultRecord: Scalars['JSON'];

  initialCreatedState: (Scalars['String'] | null);
};



export type AvailableGadgetModelSelection = {

  __typename?: boolean | null | undefined;

  key?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  filterable?: boolean | null | undefined;

  sortable?: boolean | null | undefined;

  searchable?: boolean | null | undefined;

  defaultDisplayField?: AvailableGadgetModelFieldSelection;

  fields?: AvailableGadgetModelFieldSelection;

  actions?: AvailableGadgetActionSelection;

  action?: AvailableGadgetActionSelection;

  pluralName?: boolean | null | undefined;

  pluralApiIdentifier?: boolean | null | undefined;

  currentSingletonApiIdentifier?: boolean | null | undefined;

  defaultRecord?: boolean | null | undefined;

  initialCreatedState?: boolean | null | undefined;
};


/** One field of a Gadget model */
export interface GadgetModelField extends GadgetField {
  __typename: 'GadgetModelField';
  name: Scalars['String'];
  apiIdentifier: Scalars['String'];
  fieldType: GadgetFieldType;
  hasDefault: Scalars['Boolean'];
  required: Scalars['Boolean'];
  requiredArgumentForInput: Scalars['Boolean'];
  configuration: GadgetFieldConfigInterface;
  isUniqueField: Scalars['Boolean'];
  sortable: Scalars['Boolean'];
  filterable: Scalars['Boolean'];
  examples: GadgetModelFieldExamples;
};



export type AvailableGadgetModelFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;

  isUniqueField?: boolean | null | undefined;

  sortable?: boolean | null | undefined;

  filterable?: boolean | null | undefined;

  examples?: AvailableGadgetModelFieldExamplesSelection;
};



export type GadgetField = {

  __typename: 'GadgetModelField'|'GadgetObjectField';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  fieldType: GadgetFieldType;

  hasDefault: Scalars['Boolean'];

  required: Scalars['Boolean'];

  requiredArgumentForInput: Scalars['Boolean'];

  configuration: GadgetFieldConfigInterface;
};



export type AvailableGadgetFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;
};


/** The common bits that all field configuration types share */
export type GadgetFieldConfigInterface = {

  __typename: 'GadgetGenericFieldConfig'|'GadgetObjectFieldConfig'|'GadgetBelongsToConfig'|'GadgetHasOneConfig'|'GadgetHasManyConfig'|'GadgetEnumConfig'|'GadgetDateTimeConfig'|'GadgetNumberConfig';

  fieldType: GadgetFieldType;

  validations: (GadgetFieldValidationUnion | null)[];
};



export type AvailableGadgetFieldConfigInterfaceSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;
};



export type GadgetModelFieldExamples = {

  __typename: 'GadgetModelFieldExamples';

  linkExistingChild: (GadgetFieldUsageExample | null);

  linkNewChild: (GadgetFieldUsageExample | null);

  linkToExistingParent: (GadgetFieldUsageExample | null);

  createNestedInParent: (GadgetFieldUsageExample | null);
};



export type AvailableGadgetModelFieldExamplesSelection = {

  __typename?: boolean | null | undefined;

  linkExistingChild?: AvailableGadgetFieldUsageExampleSelection;

  linkNewChild?: AvailableGadgetFieldUsageExampleSelection;

  linkToExistingParent?: AvailableGadgetFieldUsageExampleSelection;

  createNestedInParent?: AvailableGadgetFieldUsageExampleSelection;
};



export type GadgetFieldUsageExample = {

  __typename: 'GadgetFieldUsageExample';

  exampleGraphQLMutation: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];
};



export type AvailableGadgetFieldUsageExampleSelection = {

  __typename?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;
};



export type GadgetAction = {

  __typename: 'GadgetAction';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  requiresInput: Scalars['Boolean'];

  acceptsInput: Scalars['Boolean'];

  /** @deprecated This field will be removed. Use `isDeleteAction` instead. */
  hasDeleteRecordEffect: Scalars['Boolean'];

  /** @deprecated This field will be removed. Use `isCreateOrUpdateAction` instead. */
  hasCreateOrUpdateEffect: Scalars['Boolean'];

  isDeleteAction: Scalars['Boolean'];

  isCreateOrUpdateAction: Scalars['Boolean'];

  operatesWithRecordIdentity: Scalars['Boolean'];

  /** @deprecated This field will be removed. */
  possibleTransitions: Scalars['JSONObject'];

  availableInBulk: Scalars['Boolean'];

  bulkApiIdentifier: (Scalars['String'] | null);

  hasAmbiguousIdentifier: Scalars['Boolean'];

  inputFields: GadgetObjectField[];

  bulkInvokedByIDOnly: Scalars['Boolean'];

  triggers: GadgetTrigger[];

  examples: (GadgetActionGraphQLType | null);
};



export type AvailableGadgetActionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  requiresInput?: boolean | null | undefined;

  acceptsInput?: boolean | null | undefined;

  /** @deprecated This field will be removed. Use `isDeleteAction` instead. */
  hasDeleteRecordEffect?: boolean | null | undefined;

  /** @deprecated This field will be removed. Use `isCreateOrUpdateAction` instead. */
  hasCreateOrUpdateEffect?: boolean | null | undefined;

  isDeleteAction?: boolean | null | undefined;

  isCreateOrUpdateAction?: boolean | null | undefined;

  operatesWithRecordIdentity?: boolean | null | undefined;

  /** @deprecated This field will be removed. */
  possibleTransitions?: boolean | null | undefined;

  availableInBulk?: boolean | null | undefined;

  bulkApiIdentifier?: boolean | null | undefined;

  hasAmbiguousIdentifier?: boolean | null | undefined;

  inputFields?: AvailableGadgetObjectFieldSelection;

  bulkInvokedByIDOnly?: boolean | null | undefined;

  triggers?: AvailableGadgetTriggerSelection;

  examples?: AvailableGadgetActionGraphQLTypeSelection;
};


/** One field of an action input or other transitory object in Gadget */
export interface GadgetObjectField extends GadgetField {
  __typename: 'GadgetObjectField';
  name: Scalars['String'];
  apiIdentifier: Scalars['String'];
  fieldType: GadgetFieldType;
  hasDefault: Scalars['Boolean'];
  required: Scalars['Boolean'];
  requiredArgumentForInput: Scalars['Boolean'];
  configuration: GadgetFieldConfigInterface;
};



export type AvailableGadgetObjectFieldSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  hasDefault?: boolean | null | undefined;

  required?: boolean | null | undefined;

  requiredArgumentForInput?: boolean | null | undefined;

  configuration?: AvailableGadgetFieldConfigInterfaceSelection;
};



export type GadgetTrigger = {

  __typename: 'GadgetTrigger';

  specID: Scalars['String'];
};



export type AvailableGadgetTriggerSelection = {

  __typename?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export type GadgetActionGraphQLType = {

  __typename: 'GadgetActionGraphQLType';

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation: Scalars['String'];

  exampleGraphQLMutation: Scalars['String'];

  inputGraphQLTypeSDL: (Scalars['String'] | null);

  outputGraphQLTypeSDL: Scalars['String'];

  inputTypeScriptInterface: (Scalars['String'] | null);

  outputTypeScriptInterface: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleJSInputs: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];

  /** @deprecated moved to exampleBulkGraphQLMutation */
  exampleBulkMutation: (Scalars['String'] | null);

  exampleBulkGraphQLMutation: (Scalars['String'] | null);

  exampleBulkGraphQLVariables: (Scalars['JSON'] | null);

  exampleBulkImperativeInvocation: (Scalars['String'] | null);

  exampleBulkReactHook: (Scalars['String'] | null);

  bulkOutputGraphQLTypeSDL: (Scalars['String'] | null);
};



export type AvailableGadgetActionGraphQLTypeSelection = {

  __typename?: boolean | null | undefined;

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  inputGraphQLTypeSDL?: boolean | null | undefined;

  outputGraphQLTypeSDL?: boolean | null | undefined;

  inputTypeScriptInterface?: boolean | null | undefined;

  outputTypeScriptInterface?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleJSInputs?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;

  /** @deprecated moved to exampleBulkGraphQLMutation */
  exampleBulkMutation?: boolean | null | undefined;

  exampleBulkGraphQLMutation?: boolean | null | undefined;

  exampleBulkGraphQLVariables?: boolean | null | undefined;

  exampleBulkImperativeInvocation?: boolean | null | undefined;

  exampleBulkReactHook?: boolean | null | undefined;

  bulkOutputGraphQLTypeSDL?: boolean | null | undefined;
};



export interface GadgetGenericFieldConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetGenericFieldConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
};



export type AvailableGadgetGenericFieldConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;
};



export interface GadgetObjectFieldConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetObjectFieldConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  name: (Scalars['String'] | null);
  fields: GadgetModelField[];
};



export type AvailableGadgetObjectFieldConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  name?: boolean | null | undefined;

  fields?: AvailableGadgetModelFieldSelection;
};



export interface GadgetBelongsToConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetBelongsToConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
};



export type AvailableGadgetBelongsToConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;
};



export interface GadgetHasOneConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetHasOneConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  inverseField: (GadgetModelField | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
};



export type AvailableGadgetHasOneConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  inverseField?: AvailableGadgetModelFieldSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;
};



export interface GadgetHasManyConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetHasManyConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  relatedModelKey: (Scalars['String'] | null);
  relatedModel: (GadgetModel | null);
  inverseField: (GadgetModelField | null);
  isConfigured: Scalars['Boolean'];
  isInverseConfigured: Scalars['Boolean'];
};



export type AvailableGadgetHasManyConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  relatedModelKey?: boolean | null | undefined;

  relatedModel?: AvailableGadgetModelSelection;

  inverseField?: AvailableGadgetModelFieldSelection;

  isConfigured?: boolean | null | undefined;

  isInverseConfigured?: boolean | null | undefined;
};



export interface GadgetEnumConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetEnumConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  allowMultiple: Scalars['Boolean'];
  allowOther: Scalars['Boolean'];
  options: GadgetEnumOption[];
};



export type AvailableGadgetEnumConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  allowMultiple?: boolean | null | undefined;

  allowOther?: boolean | null | undefined;

  options?: AvailableGadgetEnumOptionSelection;
};



export type GadgetEnumOption = {

  __typename: 'GadgetEnumOption';

  name: Scalars['String'];

  color: Scalars['String'];
};



export type AvailableGadgetEnumOptionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  color?: boolean | null | undefined;
};



export interface GadgetDateTimeConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetDateTimeConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  includeTime: Scalars['Boolean'];
};



export type AvailableGadgetDateTimeConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  includeTime?: boolean | null | undefined;
};



export interface GadgetNumberConfig extends GadgetFieldConfigInterface {
  __typename: 'GadgetNumberConfig';
  fieldType: GadgetFieldType;
  validations: (GadgetFieldValidationUnion | null)[];
  decimals: (Scalars['Int'] | null);
};



export type AvailableGadgetNumberConfigSelection = {

  __typename?: boolean | null | undefined;

  fieldType?: boolean | null | undefined;

  validations?: AvailableGadgetFieldValidationUnionSelection;

  decimals?: boolean | null | undefined;
};



export interface GadgetRegexFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetRegexFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  pattern: (Scalars['String'] | null);
};



export type AvailableGadgetRegexFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  pattern?: boolean | null | undefined;
};


/** The common bits that all field validation types share */
export type GadgetFieldValidationInterface = {

  __typename: 'GadgetRegexFieldValidation'|'GadgetRangeFieldValidation'|'GadgetOnlyImageFileFieldValidation'|'GadgetGenericFieldValidation';

  name: Scalars['String'];

  specID: Scalars['String'];
};



export type AvailableGadgetFieldValidationInterfaceSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export interface GadgetRangeFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetRangeFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  min: (Scalars['Int'] | null);
  max: (Scalars['Int'] | null);
};



export type AvailableGadgetRangeFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  min?: boolean | null | undefined;

  max?: boolean | null | undefined;
};



export interface GadgetOnlyImageFileFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetOnlyImageFileFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
  allowAnimatedImages: Scalars['Boolean'];
};



export type AvailableGadgetOnlyImageFileFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;

  allowAnimatedImages?: boolean | null | undefined;
};



export interface GadgetGenericFieldValidation extends GadgetFieldValidationInterface {
  __typename: 'GadgetGenericFieldValidation';
  name: Scalars['String'];
  specID: Scalars['String'];
};



export type AvailableGadgetGenericFieldValidationSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  specID?: boolean | null | undefined;
};



export type Query = {

  __typename: 'Query';

  user: (User | null);

  users: UserConnection;

  session: (Session | null);

  sessions: SessionConnection;

  message: (Message | null);

  messages: MessageConnection;

  chat: (Chat | null);

  chats: ChatConnection;

  currentSession: (Session | null);

  internal: InternalQueries;
};



export type AvailableQuerySelection = {

  __typename?: boolean | null | undefined;

  user?: AvailableUserSelection;

  users?: AvailableUserConnectionSelection;

  session?: AvailableSessionSelection;

  sessions?: AvailableSessionConnectionSelection;

  message?: AvailableMessageSelection;

  messages?: AvailableMessageConnectionSelection;

  chat?: AvailableChatSelection;

  chats?: AvailableChatConnectionSelection;

  currentSession?: AvailableSessionSelection;

  internal?: AvailableInternalQueriesSelection;
};



export type User = {

  __typename: 'User';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  lastName: (Scalars['String'] | null);

  firstName: (Scalars['String'] | null);

  chats: ChatConnection;

  googleImageUrl: (Scalars['URL'] | null);

  lastSignedIn: (Scalars['DateTime'] | null);

  roles: Role[];

  email: Scalars['EmailAddress'];

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableUserSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  lastName?: boolean | null | undefined;

  firstName?: boolean | null | undefined;

  chats?: AvailableChatConnectionSelection;

  googleImageUrl?: boolean | null | undefined;

  lastSignedIn?: boolean | null | undefined;

  roles?: AvailableRoleSelection;

  email?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of Chat items. */
export type ChatConnection = {

  __typename: 'ChatConnection';

  /** A list of edges. */
  edges: ChatEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableChatConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableChatEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a Chat connection. */
export type ChatEdge = {

  __typename: 'ChatEdge';

  /** The item at the end of the edge */
  node: Chat;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableChatEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableChatSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Chat = {

  __typename: 'Chat';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  name: (Scalars['String'] | null);

  user: User;

  userId: Scalars['GadgetID'];

  messages: MessageConnection;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableChatSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  name?: boolean | null | undefined;

  user?: AvailableUserSelection;

  userId?: boolean | null | undefined;

  messages?: AvailableMessageConnectionSelection;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of Message items. */
export type MessageConnection = {

  __typename: 'MessageConnection';

  /** A list of edges. */
  edges: MessageEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableMessageConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableMessageEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a Message connection. */
export type MessageEdge = {

  __typename: 'MessageEdge';

  /** The item at the end of the edge */
  node: Message;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableMessageEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableMessageSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Message = {

  __typename: 'Message';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: Scalars['GadgetID'];

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  content: Scalars['String'];

  order: Scalars['Float'];

  chat: Chat;

  chatId: Scalars['GadgetID'];

  role: MessageRoleEnum;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableMessageSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  content?: boolean | null | undefined;

  order?: boolean | null | undefined;

  chat?: AvailableChatSelection;

  chatId?: boolean | null | undefined;

  role?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** Information about pagination in a connection. */
export type PageInfo = {

  __typename: 'PageInfo';

  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];

  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];

  /** When paginating backwards, the cursor to continue. */
  startCursor: (Scalars['String'] | null);

  /** When paginating forwards, the cursor to continue. */
  endCursor: (Scalars['String'] | null);
};



export type AvailablePageInfoSelection = {

  __typename?: boolean | null | undefined;

  /** When paginating forwards, are there more items? */
  hasNextPage?: boolean | null | undefined;

  /** When paginating backwards, are there more items? */
  hasPreviousPage?: boolean | null | undefined;

  /** When paginating backwards, the cursor to continue. */
  startCursor?: boolean | null | undefined;

  /** When paginating forwards, the cursor to continue. */
  endCursor?: boolean | null | undefined;
};


/** A named group of permissions granted to a particular actor in the system. Managed in the Gadget editor. */
export type Role = {

  __typename: 'Role';

  /** The stable identifier for this role. Null if the role has since been deleted. */
  key: Scalars['String'];

  /** The human readable name for this role. Can be changed. */
  name: Scalars['String'];
};



export type AvailableRoleSelection = {

  __typename?: boolean | null | undefined;

  /** The stable identifier for this role. Null if the role has since been deleted. */
  key?: boolean | null | undefined;

  /** The human readable name for this role. Can be changed. */
  name?: boolean | null | undefined;
};


/** A connection to a list of User items. */
export type UserConnection = {

  __typename: 'UserConnection';

  /** A list of edges. */
  edges: UserEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableUserConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableUserEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a User connection. */
export type UserEdge = {

  __typename: 'UserEdge';

  /** The item at the end of the edge */
  node: User;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableUserEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableUserSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Session = {

  __typename: 'Session';

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id: (Scalars['GadgetID'] | null);

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt: Scalars['DateTime'];

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt: Scalars['DateTime'];

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state: Scalars['RecordState'];

  user: (User | null);

  userId: (Scalars['GadgetID'] | null);

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all: Scalars['JSONObject'];
};



export type AvailableSessionSelection = {

  __typename?: boolean | null | undefined;

  /** The globally unique, unchanging identifier for this record. Assigned and managed by Gadget. */
  id?: boolean | null | undefined;

  /** The time at which this record was first created. Set once upon record creation and never changed. Managed by Gadget. */
  createdAt?: boolean | null | undefined;

  /** The time at which this record was last changed. Set each time the record is successfully acted upon by an action. Managed by Gadget. */
  updatedAt?: boolean | null | undefined;

  /** The current state this record is in. Changed by invoking actions. Managed by Gadget. */
  state?: boolean | null | undefined;

  user?: AvailableUserSelection;

  userId?: boolean | null | undefined;

  /** Get all the fields for this record. Useful for not having to list out all the fields you want to retrieve, but slower. */
  _all?: boolean | null | undefined;
};


/** A connection to a list of Session items. */
export type SessionConnection = {

  __typename: 'SessionConnection';

  /** A list of edges. */
  edges: SessionEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableSessionConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableSessionEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a Session connection. */
export type SessionEdge = {

  __typename: 'SessionEdge';

  /** The item at the end of the edge */
  node: Session;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableSessionEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: AvailableSessionSelection;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** Represents one of the roles an identity in the system can be entitled to */
export type GadgetRole = {

  __typename: 'GadgetRole';

  key: Scalars['String'];

  name: Scalars['String'];

  selectable: Scalars['Boolean'];

  order: Scalars['Int'];
};



export type AvailableGadgetRoleSelection = {

  __typename?: boolean | null | undefined;

  key?: boolean | null | undefined;

  name?: boolean | null | undefined;

  selectable?: boolean | null | undefined;

  order?: boolean | null | undefined;
};



export type GadgetGlobalAction = {

  __typename: 'GadgetGlobalAction';

  name: Scalars['String'];

  apiIdentifier: Scalars['String'];

  namespace: Scalars['String'][];

  requiresInput: Scalars['Boolean'];

  acceptsInput: Scalars['Boolean'];

  triggers: GadgetTrigger[];

  inputFields: GadgetObjectField[];

  examples: (GadgetGlobalActionGraphQLType | null);
};



export type AvailableGadgetGlobalActionSelection = {

  __typename?: boolean | null | undefined;

  name?: boolean | null | undefined;

  apiIdentifier?: boolean | null | undefined;

  namespace?: boolean | null | undefined;

  requiresInput?: boolean | null | undefined;

  acceptsInput?: boolean | null | undefined;

  triggers?: AvailableGadgetTriggerSelection;

  inputFields?: AvailableGadgetObjectFieldSelection;

  examples?: AvailableGadgetGlobalActionGraphQLTypeSelection;
};



export type GadgetGlobalActionGraphQLType = {

  __typename: 'GadgetGlobalActionGraphQLType';

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation: Scalars['String'];

  exampleGraphQLMutation: Scalars['String'];

  inputGraphQLTypeSDL: (Scalars['String'] | null);

  outputGraphQLTypeSDL: Scalars['String'];

  inputTypeScriptInterface: (Scalars['String'] | null);

  outputTypeScriptInterface: Scalars['String'];

  exampleGraphQLVariables: Scalars['JSON'];

  exampleJSInputs: Scalars['JSON'];

  exampleImperativeInvocation: Scalars['String'];

  exampleReactHook: Scalars['String'];
};



export type AvailableGadgetGlobalActionGraphQLTypeSelection = {

  __typename?: boolean | null | undefined;

  /** @deprecated moved to exampleGraphQLMutation */
  exampleMutation?: boolean | null | undefined;

  exampleGraphQLMutation?: boolean | null | undefined;

  inputGraphQLTypeSDL?: boolean | null | undefined;

  outputGraphQLTypeSDL?: boolean | null | undefined;

  inputTypeScriptInterface?: boolean | null | undefined;

  outputTypeScriptInterface?: boolean | null | undefined;

  exampleGraphQLVariables?: boolean | null | undefined;

  exampleJSInputs?: boolean | null | undefined;

  exampleImperativeInvocation?: boolean | null | undefined;

  exampleReactHook?: boolean | null | undefined;
};


/** One upload target to use for the Direct Upload style of sending files to Gadget */
export type DirectUploadToken = {

  __typename: 'DirectUploadToken';

  /** The URL to upload a file to. */
  url: Scalars['String'];

  /** The token to pass to an action to reference the uploaded file. */
  token: Scalars['String'];
};



export type AvailableDirectUploadTokenSelection = {

  __typename?: boolean | null | undefined;

  /** The URL to upload a file to. */
  url?: boolean | null | undefined;

  /** The token to pass to an action to reference the uploaded file. */
  token?: boolean | null | undefined;
};



export type InternalQueries = {

  __typename: 'InternalQueries';

  user: (InternalUserRecord | null);

  listUser: InternalUserRecordConnection;

  /** Currently open platform transaction details, or null if no transaction is open */
  currentTransactionDetails: (Scalars['JSONObject'] | null);

  session: (InternalSessionRecord | null);

  listSession: InternalSessionRecordConnection;

  message: (InternalMessageRecord | null);

  listMessage: InternalMessageRecordConnection;

  chat: (InternalChatRecord | null);

  listChat: InternalChatRecordConnection;
};



export type AvailableInternalQueriesSelection = {

  __typename?: boolean | null | undefined;

  user?: boolean | null | undefined;

  listUser?: AvailableInternalUserRecordConnectionSelection;

  /** Currently open platform transaction details, or null if no transaction is open */
  currentTransactionDetails?: boolean | null | undefined;

  session?: boolean | null | undefined;

  listSession?: AvailableInternalSessionRecordConnectionSelection;

  message?: boolean | null | undefined;

  listMessage?: AvailableInternalMessageRecordConnectionSelection;

  chat?: boolean | null | undefined;

  listChat?: AvailableInternalChatRecordConnectionSelection;
};


/** A connection to a list of InternalUserRecord items. */
export type InternalUserRecordConnection = {

  __typename: 'InternalUserRecordConnection';

  /** A list of edges. */
  edges: InternalUserRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalUserRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalUserRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalUserRecord connection. */
export type InternalUserRecordEdge = {

  __typename: 'InternalUserRecordEdge';

  /** The item at the end of the edge */
  node: InternalUserRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalUserRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalSessionRecord items. */
export type InternalSessionRecordConnection = {

  __typename: 'InternalSessionRecordConnection';

  /** A list of edges. */
  edges: InternalSessionRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalSessionRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalSessionRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalSessionRecord connection. */
export type InternalSessionRecordEdge = {

  __typename: 'InternalSessionRecordEdge';

  /** The item at the end of the edge */
  node: InternalSessionRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalSessionRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalMessageRecord items. */
export type InternalMessageRecordConnection = {

  __typename: 'InternalMessageRecordConnection';

  /** A list of edges. */
  edges: InternalMessageRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalMessageRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalMessageRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalMessageRecord connection. */
export type InternalMessageRecordEdge = {

  __typename: 'InternalMessageRecordEdge';

  /** The item at the end of the edge */
  node: InternalMessageRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalMessageRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};


/** A connection to a list of InternalChatRecord items. */
export type InternalChatRecordConnection = {

  __typename: 'InternalChatRecordConnection';

  /** A list of edges. */
  edges: InternalChatRecordEdge[];

  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};



export type AvailableInternalChatRecordConnectionSelection = {

  __typename?: boolean | null | undefined;

  /** A list of edges. */
  edges?: AvailableInternalChatRecordEdgeSelection;

  /** Information to aid in pagination. */
  pageInfo?: AvailablePageInfoSelection;
};


/** An edge in a InternalChatRecord connection. */
export type InternalChatRecordEdge = {

  __typename: 'InternalChatRecordEdge';

  /** The item at the end of the edge */
  node: InternalChatRecord;

  /** A cursor for use in pagination */
  cursor: Scalars['String'];
};



export type AvailableInternalChatRecordEdgeSelection = {

  __typename?: boolean | null | undefined;

  /** The item at the end of the edge */
  node?: boolean | null | undefined;

  /** A cursor for use in pagination */
  cursor?: boolean | null | undefined;
};



export type Mutation = {

  __typename: 'Mutation';

  signOutUser: (SignOutUserResult | null);

  bulkSignOutUsers: (BulkSignOutUsersResult | null);

  updateUser: (UpdateUserResult | null);

  bulkUpdateUsers: (BulkUpdateUsersResult | null);

  deleteUser: (DeleteUserResult | null);

  bulkDeleteUsers: (BulkDeleteUsersResult | null);

  createMessage: (CreateMessageResult | null);

  bulkCreateMessages: (BulkCreateMessagesResult | null);

  updateMessage: (UpdateMessageResult | null);

  bulkUpdateMessages: (BulkUpdateMessagesResult | null);

  deleteMessage: (DeleteMessageResult | null);

  bulkDeleteMessages: (BulkDeleteMessagesResult | null);

  createChat: (CreateChatResult | null);

  bulkCreateChats: (BulkCreateChatsResult | null);

  updateChat: (UpdateChatResult | null);

  bulkUpdateChats: (BulkUpdateChatsResult | null);

  deleteChat: (DeleteChatResult | null);

  bulkDeleteChats: (BulkDeleteChatsResult | null);

  nameChat: (NameChatResult | null);

  bulkNameChats: (BulkNameChatsResult | null);

  background: BackgroundMutations;

  internal: InternalMutations;
};



export type AvailableMutationSelection = {

  __typename?: boolean | null | undefined;

  signOutUser?: AvailableSignOutUserResultSelection;

  bulkSignOutUsers?: AvailableBulkSignOutUsersResultSelection;

  updateUser?: AvailableUpdateUserResultSelection;

  bulkUpdateUsers?: AvailableBulkUpdateUsersResultSelection;

  deleteUser?: AvailableDeleteUserResultSelection;

  bulkDeleteUsers?: AvailableBulkDeleteUsersResultSelection;

  createMessage?: AvailableCreateMessageResultSelection;

  bulkCreateMessages?: AvailableBulkCreateMessagesResultSelection;

  updateMessage?: AvailableUpdateMessageResultSelection;

  bulkUpdateMessages?: AvailableBulkUpdateMessagesResultSelection;

  deleteMessage?: AvailableDeleteMessageResultSelection;

  bulkDeleteMessages?: AvailableBulkDeleteMessagesResultSelection;

  createChat?: AvailableCreateChatResultSelection;

  bulkCreateChats?: AvailableBulkCreateChatsResultSelection;

  updateChat?: AvailableUpdateChatResultSelection;

  bulkUpdateChats?: AvailableBulkUpdateChatsResultSelection;

  deleteChat?: AvailableDeleteChatResultSelection;

  bulkDeleteChats?: AvailableBulkDeleteChatsResultSelection;

  nameChat?: AvailableNameChatResultSelection;

  bulkNameChats?: AvailableBulkNameChatsResultSelection;

  background?: AvailableBackgroundMutationsSelection;

  internal?: AvailableInternalMutationsSelection;
};



export type SignOutUserResult = {

  __typename: 'SignOutUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  user: (User | null);
};



export type AvailableSignOutUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  user?: AvailableUserSelection;
};


/** The output when running the signOut on the user model in bulk. */
export type BulkSignOutUsersResult = {

  __typename: 'BulkSignOutUsersResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed user records by each sent bulk action. Returned in the same order as the input bulk action params. */
  users: (User | null)[];
};



export type AvailableBulkSignOutUsersResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed user records by each sent bulk action. Returned in the same order as the input bulk action params. */
  users?: AvailableUserSelection;
};



export type UpdateUserResult = {

  __typename: 'UpdateUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  user: (User | null);
};



export type AvailableUpdateUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  user?: AvailableUserSelection;
};


/** The output when running the update on the user model in bulk. */
export type BulkUpdateUsersResult = {

  __typename: 'BulkUpdateUsersResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed user records by each sent bulk action. Returned in the same order as the input bulk action params. */
  users: (User | null)[];
};



export type AvailableBulkUpdateUsersResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed user records by each sent bulk action. Returned in the same order as the input bulk action params. */
  users?: AvailableUserSelection;
};



export type DeleteUserResult = {

  __typename: 'DeleteUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the user model in bulk. */
export type BulkDeleteUsersResult = {

  __typename: 'BulkDeleteUsersResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteUsersResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};



export type CreateMessageResult = {

  __typename: 'CreateMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  message: (Message | null);
};



export type AvailableCreateMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  message?: AvailableMessageSelection;
};


/** The output when running the create on the message model in bulk. */
export type BulkCreateMessagesResult = {

  __typename: 'BulkCreateMessagesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed message records by each sent bulk action. Returned in the same order as the input bulk action params. */
  messages: (Message | null)[];
};



export type AvailableBulkCreateMessagesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed message records by each sent bulk action. Returned in the same order as the input bulk action params. */
  messages?: AvailableMessageSelection;
};



export type UpdateMessageResult = {

  __typename: 'UpdateMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  message: (Message | null);
};



export type AvailableUpdateMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  message?: AvailableMessageSelection;
};


/** The output when running the update on the message model in bulk. */
export type BulkUpdateMessagesResult = {

  __typename: 'BulkUpdateMessagesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed message records by each sent bulk action. Returned in the same order as the input bulk action params. */
  messages: (Message | null)[];
};



export type AvailableBulkUpdateMessagesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed message records by each sent bulk action. Returned in the same order as the input bulk action params. */
  messages?: AvailableMessageSelection;
};



export type DeleteMessageResult = {

  __typename: 'DeleteMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the message model in bulk. */
export type BulkDeleteMessagesResult = {

  __typename: 'BulkDeleteMessagesResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteMessagesResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};



export type CreateChatResult = {

  __typename: 'CreateChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  chat: (Chat | null);
};



export type AvailableCreateChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  chat?: AvailableChatSelection;
};


/** The output when running the create on the chat model in bulk. */
export type BulkCreateChatsResult = {

  __typename: 'BulkCreateChatsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats: (Chat | null)[];
};



export type AvailableBulkCreateChatsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats?: AvailableChatSelection;
};



export type UpdateChatResult = {

  __typename: 'UpdateChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  chat: (Chat | null);
};



export type AvailableUpdateChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  chat?: AvailableChatSelection;
};


/** The output when running the update on the chat model in bulk. */
export type BulkUpdateChatsResult = {

  __typename: 'BulkUpdateChatsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats: (Chat | null)[];
};



export type AvailableBulkUpdateChatsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats?: AvailableChatSelection;
};



export type DeleteChatResult = {

  __typename: 'DeleteChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);
};



export type AvailableDeleteChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;
};


/** The output when running the delete on the chat model in bulk. */
export type BulkDeleteChatsResult = {

  __typename: 'BulkDeleteChatsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];
};



export type AvailableBulkDeleteChatsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;
};



export type NameChatResult = {

  __typename: 'NameChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  chat: (Chat | null);
};



export type AvailableNameChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  chat?: AvailableChatSelection;
};


/** The output when running the name on the chat model in bulk. */
export type BulkNameChatsResult = {

  __typename: 'BulkNameChatsResult';

  /** Boolean describing if all the bulk actions succeeded or not */
  success: Scalars['Boolean'];

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors: ExecutionError[];

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats: (Chat | null)[];
};



export type AvailableBulkNameChatsResultSelection = {

  __typename?: boolean | null | undefined;

  /** Boolean describing if all the bulk actions succeeded or not */
  success?: boolean | null | undefined;

  /** Aggregated list of errors that any bulk action encountered while processing */
  errors?: AvailableExecutionErrorSelection;

  /** The list of all changed chat records by each sent bulk action. Returned in the same order as the input bulk action params. */
  chats?: AvailableChatSelection;
};



export type BackgroundMutations = {

  __typename: 'BackgroundMutations';

  signOutUser: EnqueueBackgroundActionResult;

  bulkSignOutUsers: BulkEnqueueBackgroundActionResult;

  updateUser: EnqueueBackgroundActionResult;

  bulkUpdateUsers: BulkEnqueueBackgroundActionResult;

  deleteUser: EnqueueBackgroundActionResult;

  bulkDeleteUsers: BulkEnqueueBackgroundActionResult;

  createMessage: EnqueueBackgroundActionResult;

  bulkCreateMessages: BulkEnqueueBackgroundActionResult;

  updateMessage: EnqueueBackgroundActionResult;

  bulkUpdateMessages: BulkEnqueueBackgroundActionResult;

  deleteMessage: EnqueueBackgroundActionResult;

  bulkDeleteMessages: BulkEnqueueBackgroundActionResult;

  createChat: EnqueueBackgroundActionResult;

  bulkCreateChats: BulkEnqueueBackgroundActionResult;

  updateChat: EnqueueBackgroundActionResult;

  bulkUpdateChats: BulkEnqueueBackgroundActionResult;

  deleteChat: EnqueueBackgroundActionResult;

  bulkDeleteChats: BulkEnqueueBackgroundActionResult;

  nameChat: EnqueueBackgroundActionResult;

  bulkNameChats: BulkEnqueueBackgroundActionResult;
};



export type AvailableBackgroundMutationsSelection = {

  __typename?: boolean | null | undefined;

  signOutUser?: AvailableEnqueueBackgroundActionResultSelection;

  bulkSignOutUsers?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateUser?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateUsers?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteUser?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteUsers?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createMessage?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateMessages?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateMessage?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateMessages?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteMessage?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteMessages?: AvailableBulkEnqueueBackgroundActionResultSelection;

  createChat?: AvailableEnqueueBackgroundActionResultSelection;

  bulkCreateChats?: AvailableBulkEnqueueBackgroundActionResultSelection;

  updateChat?: AvailableEnqueueBackgroundActionResultSelection;

  bulkUpdateChats?: AvailableBulkEnqueueBackgroundActionResultSelection;

  deleteChat?: AvailableEnqueueBackgroundActionResultSelection;

  bulkDeleteChats?: AvailableBulkEnqueueBackgroundActionResultSelection;

  nameChat?: AvailableEnqueueBackgroundActionResultSelection;

  bulkNameChats?: AvailableBulkEnqueueBackgroundActionResultSelection;
};


/** The value returned from enqueuing an action to run in the background */
export type EnqueueBackgroundActionResult = {

  __typename: 'EnqueueBackgroundActionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  backgroundAction: (BackgroundActionHandle | null);
};



export type AvailableEnqueueBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  backgroundAction?: AvailableBackgroundActionHandleSelection;
};


/** One action enqueued for execution in the background */
export type BackgroundActionHandle = {

  __typename: 'BackgroundActionHandle';

  /** The ID of the background action */
  id: Scalars['String'];
};



export type AvailableBackgroundActionHandleSelection = {

  __typename?: boolean | null | undefined;

  /** The ID of the background action */
  id?: boolean | null | undefined;
};


/** The value returned from bulk enqueuing actions to run in the background */
export type BulkEnqueueBackgroundActionResult = {

  __typename: 'BulkEnqueueBackgroundActionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  backgroundActions: BackgroundActionHandle[];
};



export type AvailableBulkEnqueueBackgroundActionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  backgroundActions?: AvailableBackgroundActionHandleSelection;
};



export type InternalMutations = {

  __typename: 'InternalMutations';

  startTransaction: Scalars['String'];

  commitTransaction: Scalars['String'];

  rollbackTransaction: Scalars['String'];

  /** Acquire a backend lock, returning only once the lock has been acquired */
  acquireLock: LockOperationResult;

  createUser: (InternalCreateUserResult | null);

  updateUser: (InternalUpdateUserResult | null);

  deleteUser: (InternalDeleteUserResult | null);

  deleteManyUser: (InternalDeleteManyUserResult | null);

  bulkCreateUsers: (InternalBulkCreateUsersResult | null);

  upsertUser: (InternalUpsertUserResult | null);

  triggerSignUpUser: (SignUpUserResult | null);

  triggerSignInUser: (SignInUserResult | null);

  triggerSignOutUser: (SignOutUserResult | null);

  triggerUpdateUser: (UpdateUserResult | null);

  triggerDeleteUser: (DeleteUserResult | null);

  createSession: (InternalCreateSessionResult | null);

  updateSession: (InternalUpdateSessionResult | null);

  deleteSession: (InternalDeleteSessionResult | null);

  deleteManySession: (InternalDeleteManySessionResult | null);

  bulkCreateSessions: (InternalBulkCreateSessionsResult | null);

  upsertSession: (InternalUpsertSessionResult | null);

  createMessage: (InternalCreateMessageResult | null);

  updateMessage: (InternalUpdateMessageResult | null);

  deleteMessage: (InternalDeleteMessageResult | null);

  deleteManyMessage: (InternalDeleteManyMessageResult | null);

  bulkCreateMessages: (InternalBulkCreateMessagesResult | null);

  upsertMessage: (InternalUpsertMessageResult | null);

  triggerCreateMessage: (CreateMessageResult | null);

  triggerUpdateMessage: (UpdateMessageResult | null);

  triggerDeleteMessage: (DeleteMessageResult | null);

  createChat: (InternalCreateChatResult | null);

  updateChat: (InternalUpdateChatResult | null);

  deleteChat: (InternalDeleteChatResult | null);

  deleteManyChat: (InternalDeleteManyChatResult | null);

  bulkCreateChats: (InternalBulkCreateChatsResult | null);

  upsertChat: (InternalUpsertChatResult | null);

  triggerCreateChat: (CreateChatResult | null);

  triggerUpdateChat: (UpdateChatResult | null);

  triggerDeleteChat: (DeleteChatResult | null);

  triggerNameChat: (NameChatResult | null);
};



export type AvailableInternalMutationsSelection = {

  __typename?: boolean | null | undefined;

  startTransaction?: boolean | null | undefined;

  commitTransaction?: boolean | null | undefined;

  rollbackTransaction?: boolean | null | undefined;

  /** Acquire a backend lock, returning only once the lock has been acquired */
  acquireLock?: AvailableLockOperationResultSelection;

  createUser?: AvailableInternalCreateUserResultSelection;

  updateUser?: AvailableInternalUpdateUserResultSelection;

  deleteUser?: AvailableInternalDeleteUserResultSelection;

  deleteManyUser?: AvailableInternalDeleteManyUserResultSelection;

  bulkCreateUsers?: AvailableInternalBulkCreateUsersResultSelection;

  upsertUser?: AvailableInternalUpsertUserResultSelection;

  triggerSignUpUser?: AvailableSignUpUserResultSelection;

  triggerSignInUser?: AvailableSignInUserResultSelection;

  triggerSignOutUser?: AvailableSignOutUserResultSelection;

  triggerUpdateUser?: AvailableUpdateUserResultSelection;

  triggerDeleteUser?: AvailableDeleteUserResultSelection;

  createSession?: AvailableInternalCreateSessionResultSelection;

  updateSession?: AvailableInternalUpdateSessionResultSelection;

  deleteSession?: AvailableInternalDeleteSessionResultSelection;

  deleteManySession?: AvailableInternalDeleteManySessionResultSelection;

  bulkCreateSessions?: AvailableInternalBulkCreateSessionsResultSelection;

  upsertSession?: AvailableInternalUpsertSessionResultSelection;

  createMessage?: AvailableInternalCreateMessageResultSelection;

  updateMessage?: AvailableInternalUpdateMessageResultSelection;

  deleteMessage?: AvailableInternalDeleteMessageResultSelection;

  deleteManyMessage?: AvailableInternalDeleteManyMessageResultSelection;

  bulkCreateMessages?: AvailableInternalBulkCreateMessagesResultSelection;

  upsertMessage?: AvailableInternalUpsertMessageResultSelection;

  triggerCreateMessage?: AvailableCreateMessageResultSelection;

  triggerUpdateMessage?: AvailableUpdateMessageResultSelection;

  triggerDeleteMessage?: AvailableDeleteMessageResultSelection;

  createChat?: AvailableInternalCreateChatResultSelection;

  updateChat?: AvailableInternalUpdateChatResultSelection;

  deleteChat?: AvailableInternalDeleteChatResultSelection;

  deleteManyChat?: AvailableInternalDeleteManyChatResultSelection;

  bulkCreateChats?: AvailableInternalBulkCreateChatsResultSelection;

  upsertChat?: AvailableInternalUpsertChatResultSelection;

  triggerCreateChat?: AvailableCreateChatResultSelection;

  triggerUpdateChat?: AvailableUpdateChatResultSelection;

  triggerDeleteChat?: AvailableDeleteChatResultSelection;

  triggerNameChat?: AvailableNameChatResultSelection;
};



export type LockOperationResult = {

  __typename: 'LockOperationResult';

  /** Whether the lock operation succeeded */
  success: Scalars['Boolean'];

  /** Any errors encountered during the locking/unlocking operation */
  errors: ExecutionError[];
};



export type AvailableLockOperationResultSelection = {

  __typename?: boolean | null | undefined;

  /** Whether the lock operation succeeded */
  success?: boolean | null | undefined;

  /** Any errors encountered during the locking/unlocking operation */
  errors?: AvailableExecutionErrorSelection;
};



export type InternalCreateUserResult = {

  __typename: 'InternalCreateUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  user: (InternalUserRecord | null);
};



export type AvailableInternalCreateUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  user?: boolean | null | undefined;
};



export type InternalUpdateUserResult = {

  __typename: 'InternalUpdateUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  user: (InternalUserRecord | null);
};



export type AvailableInternalUpdateUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  user?: boolean | null | undefined;
};



export type InternalDeleteUserResult = {

  __typename: 'InternalDeleteUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  user: (InternalUserRecord | null);
};



export type AvailableInternalDeleteUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  user?: boolean | null | undefined;
};



export type InternalDeleteManyUserResult = {

  __typename: 'InternalDeleteManyUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateUsersResult = {

  __typename: 'InternalBulkCreateUsersResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  users: (InternalUserRecord | null)[];
};



export type AvailableInternalBulkCreateUsersResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  users?: boolean | null | undefined;
};



export type InternalUpsertUserResult = {

  __typename: 'InternalUpsertUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  user: (InternalUserRecord | null);
};



export type AvailableInternalUpsertUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  user?: boolean | null | undefined;
};



export type SignUpUserResult = {

  __typename: 'SignUpUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  user: (User | null);
};



export type AvailableSignUpUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  user?: AvailableUserSelection;
};



export type SignInUserResult = {

  __typename: 'SignInUserResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  actionRun: (Scalars['String'] | null);

  user: (User | null);
};



export type AvailableSignInUserResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  actionRun?: boolean | null | undefined;

  user?: AvailableUserSelection;
};



export type InternalCreateSessionResult = {

  __typename: 'InternalCreateSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalCreateSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  session?: boolean | null | undefined;
};



export type InternalUpdateSessionResult = {

  __typename: 'InternalUpdateSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalUpdateSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  session?: boolean | null | undefined;
};



export type InternalDeleteSessionResult = {

  __typename: 'InternalDeleteSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalDeleteSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  session?: boolean | null | undefined;
};



export type InternalDeleteManySessionResult = {

  __typename: 'InternalDeleteManySessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManySessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateSessionsResult = {

  __typename: 'InternalBulkCreateSessionsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  sessions: (InternalSessionRecord | null)[];
};



export type AvailableInternalBulkCreateSessionsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  sessions?: boolean | null | undefined;
};



export type InternalUpsertSessionResult = {

  __typename: 'InternalUpsertSessionResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  session: (InternalSessionRecord | null);
};



export type AvailableInternalUpsertSessionResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  session?: boolean | null | undefined;
};



export type InternalCreateMessageResult = {

  __typename: 'InternalCreateMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  message: (InternalMessageRecord | null);
};



export type AvailableInternalCreateMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  message?: boolean | null | undefined;
};



export type InternalUpdateMessageResult = {

  __typename: 'InternalUpdateMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  message: (InternalMessageRecord | null);
};



export type AvailableInternalUpdateMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  message?: boolean | null | undefined;
};



export type InternalDeleteMessageResult = {

  __typename: 'InternalDeleteMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  message: (InternalMessageRecord | null);
};



export type AvailableInternalDeleteMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  message?: boolean | null | undefined;
};



export type InternalDeleteManyMessageResult = {

  __typename: 'InternalDeleteManyMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateMessagesResult = {

  __typename: 'InternalBulkCreateMessagesResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  messages: (InternalMessageRecord | null)[];
};



export type AvailableInternalBulkCreateMessagesResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  messages?: boolean | null | undefined;
};



export type InternalUpsertMessageResult = {

  __typename: 'InternalUpsertMessageResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  message: (InternalMessageRecord | null);
};



export type AvailableInternalUpsertMessageResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  message?: boolean | null | undefined;
};



export type InternalCreateChatResult = {

  __typename: 'InternalCreateChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  chat: (InternalChatRecord | null);
};



export type AvailableInternalCreateChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  chat?: boolean | null | undefined;
};



export type InternalUpdateChatResult = {

  __typename: 'InternalUpdateChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  chat: (InternalChatRecord | null);
};



export type AvailableInternalUpdateChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  chat?: boolean | null | undefined;
};



export type InternalDeleteChatResult = {

  __typename: 'InternalDeleteChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  chat: (InternalChatRecord | null);
};



export type AvailableInternalDeleteChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  chat?: boolean | null | undefined;
};



export type InternalDeleteManyChatResult = {

  __typename: 'InternalDeleteManyChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];
};



export type AvailableInternalDeleteManyChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;
};



export type InternalBulkCreateChatsResult = {

  __typename: 'InternalBulkCreateChatsResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  chats: (InternalChatRecord | null)[];
};



export type AvailableInternalBulkCreateChatsResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  chats?: boolean | null | undefined;
};



export type InternalUpsertChatResult = {

  __typename: 'InternalUpsertChatResult';

  success: Scalars['Boolean'];

  errors: ExecutionError[];

  chat: (InternalChatRecord | null);
};



export type AvailableInternalUpsertChatResultSelection = {

  __typename?: boolean | null | undefined;

  success?: boolean | null | undefined;

  errors?: AvailableExecutionErrorSelection;

  chat?: boolean | null | undefined;
};



export type ExplicitNestingRequired = never;

export type DeepFilterNever<T> = T extends Record<string, unknown> ? FilterNever<{
  [Key in keyof T]: T[Key] extends Record<string, unknown> ? DeepFilterNever<T[Key]> : T[Key];
}> : T;

/**
 * Given a schema we can select values from, apply a given selection to that schema to get the output type.
 **/
export type Select<Schema, Selection extends FieldSelection | null | undefined> = Selection extends null | undefined
  ? never
  : Schema extends (infer T)[]
  ? Select<T, Selection>[]
  : Schema extends null
  ? Select<Exclude<Schema, null>, Selection> | null
  : {
      [Key in keyof Selection & keyof Schema]: Selection[Key] extends true
        ? Schema[Key]
        : Selection[Key] extends FieldSelection
        ? Select<Schema[Key], Selection[Key]>
        : never;
    };

export type IDsList = {
  ids: string[];
}

/**
 * For finder functions which accept the `live: true` argument, this type decides if the return type will be one value or an async iterable stream of values
 * If {live: true}, returns an AsyncIterable<Result>
 * Anything else, returns a Promise<Result>
 **/
export type PromiseOrLiveIterator<Options extends { live?: boolean }, Result> = Options extends { live: true } ? AsyncIterable<Result> : Promise<Result>;
