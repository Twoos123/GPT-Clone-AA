import {
  GadgetConnection,
  GadgetRecord,
  GadgetRecordImplementation,
  GadgetRecordList,
  GadgetNonUniqueDataError,
  actionRunner,
  findManyRunner,
  findOneRunner,
  findOneByFieldRunner,
  DefaultSelection,
  LimitToKnownKeys,
  Selectable
} from "@gadgetinc/api-client-core";

import {
  Query,
  ExplicitNestingRequired,
  Select,
  DeepFilterNever,
  IDsList,
      User,
      UserSort,
      UserFilter,
      AvailableUserSelection,
      SignOutUserInput,
      UpdateUserInput,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultUserSelection = {
  "__typename": true,
  "createdAt": true,
  "email": true,
  "firstName": true,
  "googleImageUrl": true,
  "id": true,
  "lastName": true,
  "lastSignedIn": true,
  "roles": {
    "key": true,
    "name": true
  },
  "updatedAt": true
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "user". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedUserOrDefault<Options extends Selectable<AvailableUserSelection>> = DeepFilterNever<
  Select<
    User,
    DefaultSelection<
      AvailableUserSelection,
      Options,
      typeof DefaultUserSelection
    >
  >>;

/** Options that can be passed to the `UserManager#findOne` method */
export interface FindOneUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
};

/** Options that can be passed to the `UserManager#maybeFindOne` method */
export interface MaybeFindOneUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
};

/** Options that can be passed to the `UserManager#findMany` method */
export interface FindManyUsersOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
  /** Return records sorted by these sorts */
  sort?: UserSort | UserSort[] | null;
  /** Only return records matching these filters. */
  filter?: UserFilter | UserFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `UserManager#findFirst` method */
export interface FindFirstUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
  /** Return records sorted by these sorts */
  sort?: UserSort | UserSort[] | null;
  /** Only return records matching these filters. */
  filter?: UserFilter | UserFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `UserManager#maybeFindFirst` method */
export interface MaybeFindFirstUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
  /** Return records sorted by these sorts */
  sort?: UserSort | UserSort[] | null;
  /** Only return records matching these filters. */
  filter?: UserFilter | UserFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


export interface SignOutUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
};


export interface UpdateUserOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableUserSelection;
};


export interface DeleteUserOptions {
};


const apiIdentifier = "user";
const pluralApiIdentifier = "users";


    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedSignOutUserVariables = {
          user?: SignOutUserInput,
      }

  /**
   * The inputs for executing signOut on user.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type SignOutUserVariables = SignOutUserInput;



/**
 * The return value from executing signOut on user.
 * "Is a GadgetRecord of the model's type."
 **/
export type SignOutUserResult<Options extends SignOutUserOptions> =
  SelectedUserOrDefault<Options> extends void ? void : GadgetRecord<SelectedUserOrDefault<Options>>
;


/**
  * Executes the signOut action on one record specified by `id`. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function signOutUser<Options extends SignOutUserOptions>(
  id: string,
    variables: SignOutUserVariables,

  options?: LimitToKnownKeys<Options, SignOutUserOptions>
): Promise<SignOutUserResult<Options>>;

// Fully qualified, nested api identifier overload
async function signOutUser<Options extends SignOutUserOptions>(
  id: string,
      variables: FullyQualifiedSignOutUserVariables,
  
  options?: LimitToKnownKeys<Options, SignOutUserOptions>
): Promise<SignOutUserResult<Options>>;

// Function implementation
async function signOutUser<Options extends SignOutUserOptions>(
  this: UserManager,
  id: string,
      variables: SignOutUserVariables | FullyQualifiedSignOutUserVariables,
  
  options?: LimitToKnownKeys<Options, SignOutUserOptions>
): Promise<SignOutUserResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["signOut"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedUserOrDefault<Options>>(
    this,
    "signOutUser",
    DefaultUserSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                    "user": {
          value: newVariables.user,
          required: false,
          type: "SignOutUserInput",
        },
          },
    options,
    null,
    false
  ));
}

  
    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedUpdateUserVariables = {
          user?: UpdateUserInput,
      }

  /**
   * The inputs for executing update on user.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type UpdateUserVariables = UpdateUserInput;



/**
 * The return value from executing update on user.
 * "Is a GadgetRecord of the model's type."
 **/
export type UpdateUserResult<Options extends UpdateUserOptions> =
  SelectedUserOrDefault<Options> extends void ? void : GadgetRecord<SelectedUserOrDefault<Options>>
;


/**
  * Executes the update action on one record specified by `id`. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function updateUser<Options extends UpdateUserOptions>(
  id: string,
    variables: UpdateUserVariables,

  options?: LimitToKnownKeys<Options, UpdateUserOptions>
): Promise<UpdateUserResult<Options>>;

// Fully qualified, nested api identifier overload
async function updateUser<Options extends UpdateUserOptions>(
  id: string,
      variables: FullyQualifiedUpdateUserVariables,
  
  options?: LimitToKnownKeys<Options, UpdateUserOptions>
): Promise<UpdateUserResult<Options>>;

// Function implementation
async function updateUser<Options extends UpdateUserOptions>(
  this: UserManager,
  id: string,
      variables: UpdateUserVariables | FullyQualifiedUpdateUserVariables,
  
  options?: LimitToKnownKeys<Options, UpdateUserOptions>
): Promise<UpdateUserResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["update"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedUserOrDefault<Options>>(
    this,
    "updateUser",
    DefaultUserSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                    "user": {
          value: newVariables.user,
          required: false,
          type: "UpdateUserInput",
        },
          },
    options,
    null,
    false
  ));
}

  
    

/**
 * The return value from executing delete on user.
 * "Is void because this action deletes the record"
 **/
export type DeleteUserResult<Options extends DeleteUserOptions> =
  void extends void ? void : GadgetRecord<SelectedUserOrDefault<Options>>
;


/**
  * Executes the delete action on one record specified by `id`. Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
  */

// Fully qualified, nested api identifier overload
async function deleteUser<Options extends DeleteUserOptions>(
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteUserOptions>
): Promise<DeleteUserResult<Options>>;

// Function implementation
async function deleteUser<Options extends DeleteUserOptions>(
  this: UserManager,
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteUserOptions>
): Promise<DeleteUserResult<Options>> {

    
  return (await actionRunner<void>(
    this,
    "deleteUser",
    null,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                },
    options,
    null,
    false
  ));
}

  



/** All the actions available at the collection level and record level for "user" */
export class UserManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one user by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneUserOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "user";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: FindOneUserOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends FindOneUserOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneUserOptions>): Promise<
  GadgetRecord<
    SelectedUserOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedUserOrDefault<Options>>(
      this,
      "user",
      id,
      DefaultUserSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "user",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultUserSelection,
  } as any
)

  
    /**
 * Finds one user by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneUserOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "user";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: MaybeFindOneUserOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends MaybeFindOneUserOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneUserOptions>) => {
    const record = await findOneRunner<SelectedUserOrDefault<Options>>(
      this,
      "user",
      id,
      DefaultUserSelection,
      apiIdentifier,
      options,
      false
    );
    return record.isEmpty() ? null : record;
  },
  {
    type: "maybeFindOne",
    findByVariableName: "id",
    operationName: "user",
    modelApiIdentifier: "user",
    defaultSelection: DefaultUserSelection,
  } as any
)

  
    /**
 * Finds many user. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyUsersOptions>(options?: LimitToKnownKeys<Options, FindManyUsersOptions>):
    Promise<
      GadgetRecordList<
        SelectedUserOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "users";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: FindManyUsersOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends FindManyUsersOptions>(options?: LimitToKnownKeys<Options, FindManyUsersOptions>):
    Promise<
      GadgetRecordList<
        SelectedUserOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedUserOrDefault<Options>>(
      this,
      "users",
      DefaultUserSelection,
      "user",
      options
    );
  },
  {
    type: "findMany",
    operationName: "users",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultUserSelection,
  } as any
);

  
    /**
 * Finds the first matching user. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstUserOptions>(options?: LimitToKnownKeys<Options, FindFirstUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "users";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: FindFirstUserOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends FindFirstUserOptions>(options?: LimitToKnownKeys<Options, FindFirstUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedUserOrDefault<Options>>(
      this,
      "users",
      DefaultUserSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "users",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultUserSelection,
  } as any
);

  
    /**
 * Finds the first matching user. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstUserOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "users";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: MaybeFindFirstUserOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends MaybeFindFirstUserOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedUserOrDefault<Options>>(
      this,
      "users",
      DefaultUserSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "users",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultUserSelection,
  } as any
);

  
    /**
  * Finds one user by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
  **/
findById: {
  <Options extends FindOneUserOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      >
    >;
  type: "findOne";
  findByVariableName: "id";
  operationName: "users";
  modelApiIdentifier: "user";
  defaultSelection: typeof DefaultUserSelection;
  selectionType: AvailableUserSelection;
  optionsType: FindOneUserOptions;
  schemaType: Query["user"];
} = Object.assign(
  async <Options extends FindOneUserOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneUserOptions>):
    Promise<
      GadgetRecord<
        SelectedUserOrDefault<Options>
      >
    > =>
  {
    return await findOneByFieldRunner<SelectedUserOrDefault<Options>>(
      this,
      "users",
      "id",
      value,
      DefaultUserSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "users",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultUserSelection,
  } as any
)

  
    /**
* @deprecated The action signUp on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
*/
signUp = (...args: any[]): never => {
  throw new Error("The action signUp on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers");
};

  
    /**
* @deprecated The action signUp on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
*/
bulkSignUp = (...args: any[]): never => {
  throw new Error("The action signUp on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers");
};

  
    /**
* @deprecated The action signIn on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
*/
signIn = (...args: any[]): never => {
  throw new Error("The action signIn on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers");
};

  
    /**
* @deprecated The action signIn on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
*/
bulkSignIn = (...args: any[]): never => {
  throw new Error("The action signIn on model user does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers");
};

  
    signOut = Object.assign(signOutUser,
  {
    type: "action",
    operationName: "signOutUser",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultUserSelection,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
      "user": {
        required: false,
        type: "SignOutUserInput",
      },
    },
    hasAmbiguousIdentifier: false,
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true,
    paramOnlyVariables: [],
    hasReturnType: false,
    acceptsModelInput: true,
  } as unknown as {
    type: "action";
    operationName: "signOutUser";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "user";
    isBulk: false;
    defaultSelection: typeof DefaultUserSelection;
    selectionType: AvailableUserSelection;
    optionsType: SignOutUserOptions;
    schemaType:  Query["user"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedSignOutUserVariables          | SignOutUserVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "user": {
          required: false;
          type: "SignOutUserInput";
        };
          };
    hasAmbiguousIdentifier: false;
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true;
    paramOnlyVariables: [];
    hasReturnType: false;
    acceptsModelInput: true;
  }
)

  
      /**
  * Executes the bulkSignOut action with the given inputs.
  */
  bulkSignOut: {
    <Options extends SignOutUserOptions>(
        inputs: (FullyQualifiedSignOutUserVariables | SignOutUserVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, SignOutUserOptions>
    ): Promise<SignOutUserResult<Options>[]>;
    type: "action";
    operationName: "bulkSignOutUsers";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "users";
    isBulk: true;
    defaultSelection: typeof DefaultUserSelection;
    selectionType: AvailableUserSelection;
    optionsType: SignOutUserOptions;
    schemaType: Query["user"];
    variablesType: (FullyQualifiedSignOutUserVariables | SignOutUserVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkSignOutUsersInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends SignOutUserOptions>(
        inputs: (FullyQualifiedSignOutUserVariables | SignOutUserVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, SignOutUserOptions>
    ) => {
        const fullyQualifiedInputs = inputs.map(input =>
          disambiguateActionParams(
            this["signOut"],
            undefined,
            input
          )
        );
      
      return (await actionRunner<any>(
        this,
        "bulkSignOutUsers",
        DefaultUserSelection,
        "user",
        "users",
        true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkSignOut"].variables["inputs"]
            }
          }
,
        options,
        null,
        false
      )) as any[];
    },
    {
      type: "action",
      operationName: "bulkSignOutUsers",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "users",
      isBulk: true,
      defaultSelection: DefaultUserSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkSignOutUsersInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    update = Object.assign(updateUser,
  {
    type: "action",
    operationName: "updateUser",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultUserSelection,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
      "user": {
        required: false,
        type: "UpdateUserInput",
      },
    },
    hasAmbiguousIdentifier: false,
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true,
    paramOnlyVariables: [],
    hasReturnType: false,
    acceptsModelInput: true,
  } as unknown as {
    type: "action";
    operationName: "updateUser";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "user";
    isBulk: false;
    defaultSelection: typeof DefaultUserSelection;
    selectionType: AvailableUserSelection;
    optionsType: UpdateUserOptions;
    schemaType:  Query["user"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedUpdateUserVariables          | UpdateUserVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "user": {
          required: false;
          type: "UpdateUserInput";
        };
          };
    hasAmbiguousIdentifier: false;
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true;
    paramOnlyVariables: [];
    hasReturnType: false;
    acceptsModelInput: true;
  }
)

  
      /**
  * Executes the bulkUpdate action with the given inputs.
  */
  bulkUpdate: {
    <Options extends UpdateUserOptions>(
        inputs: (FullyQualifiedUpdateUserVariables | UpdateUserVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateUserOptions>
    ): Promise<UpdateUserResult<Options>[]>;
    type: "action";
    operationName: "bulkUpdateUsers";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "users";
    isBulk: true;
    defaultSelection: typeof DefaultUserSelection;
    selectionType: AvailableUserSelection;
    optionsType: UpdateUserOptions;
    schemaType: Query["user"];
    variablesType: (FullyQualifiedUpdateUserVariables | UpdateUserVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkUpdateUsersInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends UpdateUserOptions>(
        inputs: (FullyQualifiedUpdateUserVariables | UpdateUserVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateUserOptions>
    ) => {
        const fullyQualifiedInputs = inputs.map(input =>
          disambiguateActionParams(
            this["update"],
            undefined,
            input
          )
        );
      
      return (await actionRunner<any>(
        this,
        "bulkUpdateUsers",
        DefaultUserSelection,
        "user",
        "users",
        true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkUpdate"].variables["inputs"]
            }
          }
,
        options,
        null,
        false
      )) as any[];
    },
    {
      type: "action",
      operationName: "bulkUpdateUsers",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "users",
      isBulk: true,
      defaultSelection: DefaultUserSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkUpdateUsersInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    delete = Object.assign(deleteUser,
  {
    type: "action",
    operationName: "deleteUser",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: null,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
    },
    hasAmbiguousIdentifier: false,
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: false,
    paramOnlyVariables: [],
    hasReturnType: false,
    acceptsModelInput: false,
  } as unknown as {
    type: "action";
    operationName: "deleteUser";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "user";
    isBulk: false;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteUserOptions;
    schemaType:  null ;

    variablesType: (
        { id: string } &

        {}
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                };
    hasAmbiguousIdentifier: false;
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: false;
    paramOnlyVariables: [];
    hasReturnType: false;
    acceptsModelInput: false;
  }
)

  
      /**
  * Executes the bulkDelete action with the given inputs. Deletes the records on the server.
  */
  bulkDelete: {
    <Options extends DeleteUserOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteUserOptions>
    ): Promise<DeleteUserResult<Options>[]>;
    type: "action";
    operationName: "bulkDeleteUsers";
    namespace: null;
    modelApiIdentifier: "user";
    modelSelectionField: "users";
    isBulk: true;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteUserOptions;
    schemaType: null;
    variablesType: IDsList | undefined;
    variables: {
        ids: {
          required: true;
          type: "[GadgetID!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends DeleteUserOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteUserOptions>
    ) => {

      return (await actionRunner<any>(
        this,
        "bulkDeleteUsers",
        null,
        "user",
        "users",
        true,
          {
            ids: {
              value: ids,
              ...this["bulkDelete"].variables["ids"]
            }
          }
,
        options,
        null,
        false
      )) as any[];
    },
    {
      type: "action",
      operationName: "bulkDeleteUsers",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "users",
      isBulk: true,
      defaultSelection: null,
      variables: {
        ids: {
          required: true,
          type: "[GadgetID!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: false,
    } as any
  );

  
}
