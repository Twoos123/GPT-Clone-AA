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
      Chat,
      ChatSort,
      ChatFilter,
      AvailableChatSelection,
      CreateChatInput,
      UpdateChatInput,
      NameChatInput,
      Scalars,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultChatSelection = {
  "__typename": true,
  "createdAt": true,
  "id": true,
  "name": true,
  "updatedAt": true
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "chat". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedChatOrDefault<Options extends Selectable<AvailableChatSelection>> = DeepFilterNever<
  Select<
    Chat,
    DefaultSelection<
      AvailableChatSelection,
      Options,
      typeof DefaultChatSelection
    >
  >>;

/** Options that can be passed to the `ChatManager#findOne` method */
export interface FindOneChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
};

/** Options that can be passed to the `ChatManager#maybeFindOne` method */
export interface MaybeFindOneChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
};

/** Options that can be passed to the `ChatManager#findMany` method */
export interface FindManyChatsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
  /** Return records sorted by these sorts */
  sort?: ChatSort | ChatSort[] | null;
  /** Only return records matching these filters. */
  filter?: ChatFilter | ChatFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `ChatManager#findFirst` method */
export interface FindFirstChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
  /** Return records sorted by these sorts */
  sort?: ChatSort | ChatSort[] | null;
  /** Only return records matching these filters. */
  filter?: ChatFilter | ChatFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `ChatManager#maybeFindFirst` method */
export interface MaybeFindFirstChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
  /** Return records sorted by these sorts */
  sort?: ChatSort | ChatSort[] | null;
  /** Only return records matching these filters. */
  filter?: ChatFilter | ChatFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


export interface CreateChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
};


export interface UpdateChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
};


export interface DeleteChatOptions {
};


export interface NameChatOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableChatSelection;
};


const apiIdentifier = "chat";
const pluralApiIdentifier = "chats";


    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedCreateChatVariables = {
          chat?: CreateChatInput,
      }

  /**
   * The inputs for executing create on chat.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type CreateChatVariables = CreateChatInput;



/**
 * The return value from executing create on chat.
 * "Is a GadgetRecord of the model's type."
 **/
export type CreateChatResult<Options extends CreateChatOptions> =
  SelectedChatOrDefault<Options> extends void ? void : GadgetRecord<SelectedChatOrDefault<Options>>
;


/**
  * Executes the create action. Accepts the parameters for the action via the `variables` argument. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function createChat<Options extends CreateChatOptions>(
  
    variables: CreateChatVariables,

  options?: LimitToKnownKeys<Options, CreateChatOptions>
): Promise<CreateChatResult<Options>>;

// Fully qualified, nested api identifier overload
async function createChat<Options extends CreateChatOptions>(
  
      variables: FullyQualifiedCreateChatVariables,
  
  options?: LimitToKnownKeys<Options, CreateChatOptions>
): Promise<CreateChatResult<Options>>;

// Function implementation
async function createChat<Options extends CreateChatOptions>(
  this: ChatManager,
  
      variables: CreateChatVariables | FullyQualifiedCreateChatVariables,
  
  options?: LimitToKnownKeys<Options, CreateChatOptions>
): Promise<CreateChatResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["create"],
       undefined,
      variables
    );

    
  return (await actionRunner<SelectedChatOrDefault<Options>>(
    this,
    "createChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
                    "chat": {
          value: newVariables.chat,
          required: false,
          type: "CreateChatInput",
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
  export type FullyQualifiedUpdateChatVariables = {
          chat?: UpdateChatInput,
      }

  /**
   * The inputs for executing update on chat.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type UpdateChatVariables = UpdateChatInput;



/**
 * The return value from executing update on chat.
 * "Is a GadgetRecord of the model's type."
 **/
export type UpdateChatResult<Options extends UpdateChatOptions> =
  SelectedChatOrDefault<Options> extends void ? void : GadgetRecord<SelectedChatOrDefault<Options>>
;


/**
  * Executes the update action on one record specified by `id`. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function updateChat<Options extends UpdateChatOptions>(
  id: string,
    variables: UpdateChatVariables,

  options?: LimitToKnownKeys<Options, UpdateChatOptions>
): Promise<UpdateChatResult<Options>>;

// Fully qualified, nested api identifier overload
async function updateChat<Options extends UpdateChatOptions>(
  id: string,
      variables: FullyQualifiedUpdateChatVariables,
  
  options?: LimitToKnownKeys<Options, UpdateChatOptions>
): Promise<UpdateChatResult<Options>>;

// Function implementation
async function updateChat<Options extends UpdateChatOptions>(
  this: ChatManager,
  id: string,
      variables: UpdateChatVariables | FullyQualifiedUpdateChatVariables,
  
  options?: LimitToKnownKeys<Options, UpdateChatOptions>
): Promise<UpdateChatResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["update"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedChatOrDefault<Options>>(
    this,
    "updateChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                    "chat": {
          value: newVariables.chat,
          required: false,
          type: "UpdateChatInput",
        },
          },
    options,
    null,
    false
  ));
}

  
    

/**
 * The return value from executing delete on chat.
 * "Is void because this action deletes the record"
 **/
export type DeleteChatResult<Options extends DeleteChatOptions> =
  void extends void ? void : GadgetRecord<SelectedChatOrDefault<Options>>
;


/**
  * Executes the delete action on one record specified by `id`. Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
  */

// Fully qualified, nested api identifier overload
async function deleteChat<Options extends DeleteChatOptions>(
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteChatOptions>
): Promise<DeleteChatResult<Options>>;

// Function implementation
async function deleteChat<Options extends DeleteChatOptions>(
  this: ChatManager,
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteChatOptions>
): Promise<DeleteChatResult<Options>> {

    
  return (await actionRunner<void>(
    this,
    "deleteChat",
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

  
    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedNameChatVariables = {
          chat?: NameChatInput,
          firstMessage?: (Scalars['String'] | null) | null,
      }

  /**
   * The inputs for executing name on chat.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/
    export type NameChatVariables =
      Omit<
        NameChatInput,
        "firstMessage"
      > & {
        firstMessage?: (Scalars['String'] | null) | null
      };




/**
 * The return value from executing name on chat.
 * "Is a GadgetRecord of the model's type."
 **/
export type NameChatResult<Options extends NameChatOptions> =
  SelectedChatOrDefault<Options> extends void ? void : GadgetRecord<SelectedChatOrDefault<Options>>
;


/**
  * Executes the name action on one record specified by `id`. Accepts the parameters for the action via the `variables` argument. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function nameChat<Options extends NameChatOptions>(
  id: string,
    variables: NameChatVariables,

  options?: LimitToKnownKeys<Options, NameChatOptions>
): Promise<NameChatResult<Options>>;

// Fully qualified, nested api identifier overload
async function nameChat<Options extends NameChatOptions>(
  id: string,
      variables: FullyQualifiedNameChatVariables,
  
  options?: LimitToKnownKeys<Options, NameChatOptions>
): Promise<NameChatResult<Options>>;

// Function implementation
async function nameChat<Options extends NameChatOptions>(
  this: ChatManager,
  id: string,
      variables: NameChatVariables | FullyQualifiedNameChatVariables,
  
  options?: LimitToKnownKeys<Options, NameChatOptions>
): Promise<NameChatResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["name"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedChatOrDefault<Options>>(
    this,
    "nameChat",
    DefaultChatSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                    "chat": {
          value: newVariables.chat,
          required: false,
          type: "NameChatInput",
        },
              "firstMessage": {
          value: newVariables.firstMessage,
          required: false,
          type: "String",
        },
          },
    options,
    null,
    false
  ));
}

  



/** All the actions available at the collection level and record level for "chat" */
export class ChatManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one chat by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneChatOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "chat";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: FindOneChatOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends FindOneChatOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneChatOptions>): Promise<
  GadgetRecord<
    SelectedChatOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedChatOrDefault<Options>>(
      this,
      "chat",
      id,
      DefaultChatSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "chat",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultChatSelection,
  } as any
)

  
    /**
 * Finds one chat by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneChatOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "chat";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: MaybeFindOneChatOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends MaybeFindOneChatOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneChatOptions>) => {
    const record = await findOneRunner<SelectedChatOrDefault<Options>>(
      this,
      "chat",
      id,
      DefaultChatSelection,
      apiIdentifier,
      options,
      false
    );
    return record.isEmpty() ? null : record;
  },
  {
    type: "maybeFindOne",
    findByVariableName: "id",
    operationName: "chat",
    modelApiIdentifier: "chat",
    defaultSelection: DefaultChatSelection,
  } as any
)

  
    /**
 * Finds many chat. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyChatsOptions>(options?: LimitToKnownKeys<Options, FindManyChatsOptions>):
    Promise<
      GadgetRecordList<
        SelectedChatOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "chats";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: FindManyChatsOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends FindManyChatsOptions>(options?: LimitToKnownKeys<Options, FindManyChatsOptions>):
    Promise<
      GadgetRecordList<
        SelectedChatOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedChatOrDefault<Options>>(
      this,
      "chats",
      DefaultChatSelection,
      "chat",
      options
    );
  },
  {
    type: "findMany",
    operationName: "chats",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultChatSelection,
  } as any
);

  
    /**
 * Finds the first matching chat. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstChatOptions>(options?: LimitToKnownKeys<Options, FindFirstChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "chats";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: FindFirstChatOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends FindFirstChatOptions>(options?: LimitToKnownKeys<Options, FindFirstChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedChatOrDefault<Options>>(
      this,
      "chats",
      DefaultChatSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "chats",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultChatSelection,
  } as any
);

  
    /**
 * Finds the first matching chat. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstChatOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "chats";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: MaybeFindFirstChatOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends MaybeFindFirstChatOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedChatOrDefault<Options>>(
      this,
      "chats",
      DefaultChatSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "chats",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultChatSelection,
  } as any
);

  
    /**
  * Finds one chat by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
  **/
findById: {
  <Options extends FindOneChatOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      >
    >;
  type: "findOne";
  findByVariableName: "id";
  operationName: "chats";
  modelApiIdentifier: "chat";
  defaultSelection: typeof DefaultChatSelection;
  selectionType: AvailableChatSelection;
  optionsType: FindOneChatOptions;
  schemaType: Query["chat"];
} = Object.assign(
  async <Options extends FindOneChatOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneChatOptions>):
    Promise<
      GadgetRecord<
        SelectedChatOrDefault<Options>
      >
    > =>
  {
    return await findOneByFieldRunner<SelectedChatOrDefault<Options>>(
      this,
      "chats",
      "id",
      value,
      DefaultChatSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "chats",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultChatSelection,
  } as any
)

  
    create = Object.assign(createChat,
  {
    type: "action",
    operationName: "createChat",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultChatSelection,
    variables: {
      "chat": {
        required: false,
        type: "CreateChatInput",
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
    operationName: "createChat";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chat";
    isBulk: false;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: CreateChatOptions;
    schemaType:  Query["chat"];

    variablesType: (

      (
        FullyQualifiedCreateChatVariables          | CreateChatVariables      )
    )
    // all variables are optional, so no variables can be passed at all
    | undefined
    ;
    variables: {
                    "chat": {
          required: false;
          type: "CreateChatInput";
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
  * Executes the bulkCreate action with the given inputs.
  */
  bulkCreate: {
    <Options extends CreateChatOptions>(
        inputs: (FullyQualifiedCreateChatVariables | CreateChatVariables)[],
      options?: LimitToKnownKeys<Options, CreateChatOptions>
    ): Promise<CreateChatResult<Options>[]>;
    type: "action";
    operationName: "bulkCreateChats";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chats";
    isBulk: true;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: CreateChatOptions;
    schemaType: Query["chat"];
    variablesType: (FullyQualifiedCreateChatVariables | CreateChatVariables)[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkCreateChatsInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends CreateChatOptions>(
        inputs: (FullyQualifiedCreateChatVariables | CreateChatVariables)[],
      options?: LimitToKnownKeys<Options, CreateChatOptions>
    ) => {
        const fullyQualifiedInputs = inputs.map(input =>
          disambiguateActionParams(
            this["create"],
            undefined,
            input
          )
        );
      
      return (await actionRunner<any>(
        this,
        "bulkCreateChats",
        DefaultChatSelection,
        "chat",
        "chats",
        true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkCreate"].variables["inputs"]
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
      operationName: "bulkCreateChats",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "chats",
      isBulk: true,
      defaultSelection: DefaultChatSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkCreateChatsInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    update = Object.assign(updateChat,
  {
    type: "action",
    operationName: "updateChat",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultChatSelection,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
      "chat": {
        required: false,
        type: "UpdateChatInput",
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
    operationName: "updateChat";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chat";
    isBulk: false;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: UpdateChatOptions;
    schemaType:  Query["chat"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedUpdateChatVariables          | UpdateChatVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "chat": {
          required: false;
          type: "UpdateChatInput";
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
    <Options extends UpdateChatOptions>(
        inputs: (FullyQualifiedUpdateChatVariables | UpdateChatVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateChatOptions>
    ): Promise<UpdateChatResult<Options>[]>;
    type: "action";
    operationName: "bulkUpdateChats";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chats";
    isBulk: true;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: UpdateChatOptions;
    schemaType: Query["chat"];
    variablesType: (FullyQualifiedUpdateChatVariables | UpdateChatVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkUpdateChatsInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends UpdateChatOptions>(
        inputs: (FullyQualifiedUpdateChatVariables | UpdateChatVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateChatOptions>
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
        "bulkUpdateChats",
        DefaultChatSelection,
        "chat",
        "chats",
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
      operationName: "bulkUpdateChats",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "chats",
      isBulk: true,
      defaultSelection: DefaultChatSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkUpdateChatsInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    delete = Object.assign(deleteChat,
  {
    type: "action",
    operationName: "deleteChat",
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
    operationName: "deleteChat";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chat";
    isBulk: false;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteChatOptions;
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
    <Options extends DeleteChatOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteChatOptions>
    ): Promise<DeleteChatResult<Options>[]>;
    type: "action";
    operationName: "bulkDeleteChats";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chats";
    isBulk: true;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteChatOptions;
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
    async <Options extends DeleteChatOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteChatOptions>
    ) => {

      return (await actionRunner<any>(
        this,
        "bulkDeleteChats",
        null,
        "chat",
        "chats",
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
      operationName: "bulkDeleteChats",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "chats",
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

  
    name = Object.assign(nameChat,
  {
    type: "action",
    operationName: "nameChat",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultChatSelection,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
      "chat": {
        required: false,
        type: "NameChatInput",
      },
      "firstMessage": {
        required: false,
        type: "String",
      },
    },
    hasAmbiguousIdentifier: false,
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true,
    paramOnlyVariables: ["firstMessage"],
    hasReturnType: false,
    acceptsModelInput: true,
  } as unknown as {
    type: "action";
    operationName: "nameChat";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chat";
    isBulk: false;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: NameChatOptions;
    schemaType:  Query["chat"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedNameChatVariables          | NameChatVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "chat": {
          required: false;
          type: "NameChatInput";
        };
              "firstMessage": {
          required: false;
          type: "String";
        };
          };
    hasAmbiguousIdentifier: false;
    /** @deprecated -- effects are dead, long live AAC */
    hasCreateOrUpdateEffect: true;
    paramOnlyVariables: ["firstMessage"];
    hasReturnType: false;
    acceptsModelInput: true;
  }
)

  
      /**
  * Executes the bulkName action with the given inputs.
  */
  bulkName: {
    <Options extends NameChatOptions>(
        inputs: (FullyQualifiedNameChatVariables | NameChatVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, NameChatOptions>
    ): Promise<NameChatResult<Options>[]>;
    type: "action";
    operationName: "bulkNameChats";
    namespace: null;
    modelApiIdentifier: "chat";
    modelSelectionField: "chats";
    isBulk: true;
    defaultSelection: typeof DefaultChatSelection;
    selectionType: AvailableChatSelection;
    optionsType: NameChatOptions;
    schemaType: Query["chat"];
    variablesType: (FullyQualifiedNameChatVariables | NameChatVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkNameChatsInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends NameChatOptions>(
        inputs: (FullyQualifiedNameChatVariables | NameChatVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, NameChatOptions>
    ) => {
        const fullyQualifiedInputs = inputs.map(input =>
          disambiguateActionParams(
            this["name"],
            undefined,
            input
          )
        );
      
      return (await actionRunner<any>(
        this,
        "bulkNameChats",
        DefaultChatSelection,
        "chat",
        "chats",
        true,
          {
            inputs: {
              value: fullyQualifiedInputs,
              ...this["bulkName"].variables["inputs"]
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
      operationName: "bulkNameChats",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "chats",
      isBulk: true,
      defaultSelection: DefaultChatSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkNameChatsInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
}
