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
      Message,
      MessageSort,
      MessageFilter,
      AvailableMessageSelection,
      CreateMessageInput,
      UpdateMessageInput,
  
} from "../types.js";

import { disambiguateActionParams } from "../support.js";

export const DefaultMessageSelection = {
  "__typename": true,
  "content": true,
  "createdAt": true,
  "id": true,
  "order": true,
  "role": true,
  "updatedAt": true
} as const;

/**
* Produce a type that holds only the selected fields (and nested fields) of "message". The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedMessageOrDefault<Options extends Selectable<AvailableMessageSelection>> = DeepFilterNever<
  Select<
    Message,
    DefaultSelection<
      AvailableMessageSelection,
      Options,
      typeof DefaultMessageSelection
    >
  >>;

/** Options that can be passed to the `MessageManager#findOne` method */
export interface FindOneMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
};

/** Options that can be passed to the `MessageManager#maybeFindOne` method */
export interface MaybeFindOneMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
};

/** Options that can be passed to the `MessageManager#findMany` method */
export interface FindManyMessagesOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
  /** Return records sorted by these sorts */
  sort?: MessageSort | MessageSort[] | null;
  /** Only return records matching these filters. */
  filter?: MessageFilter | MessageFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};

/** Options that can be passed to the `MessageManager#findFirst` method */
export interface FindFirstMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
  /** Return records sorted by these sorts */
  sort?: MessageSort | MessageSort[] | null;
  /** Only return records matching these filters. */
  filter?: MessageFilter | MessageFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};

/** Options that can be passed to the `MessageManager#maybeFindFirst` method */
export interface MaybeFindFirstMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
  /** Return records sorted by these sorts */
  sort?: MessageSort | MessageSort[] | null;
  /** Only return records matching these filters. */
  filter?: MessageFilter | MessageFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};


export interface CreateMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
};


export interface UpdateMessageOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableMessageSelection;
};


export interface DeleteMessageOptions {
};


const apiIdentifier = "message";
const pluralApiIdentifier = "messages";


    
  /**
   * The fully-qualified, expanded form of the inputs for executing this action.
   * The flattened style should be preferred over this style, but for models with ambiguous API identifiers, this style can be used to remove any ambiguity.
   **/
  export type FullyQualifiedCreateMessageVariables = {
          message?: CreateMessageInput,
      }

  /**
   * The inputs for executing create on message.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type CreateMessageVariables = CreateMessageInput;



/**
 * The return value from executing create on message.
 * "Is a GadgetRecord of the model's type."
 **/
export type CreateMessageResult<Options extends CreateMessageOptions> =
  SelectedMessageOrDefault<Options> extends void ? void : GadgetRecord<SelectedMessageOrDefault<Options>>
;


/**
  * Executes the create action. Accepts the parameters for the action via the `variables` argument. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function createMessage<Options extends CreateMessageOptions>(
  
    variables: CreateMessageVariables,

  options?: LimitToKnownKeys<Options, CreateMessageOptions>
): Promise<CreateMessageResult<Options>>;

// Fully qualified, nested api identifier overload
async function createMessage<Options extends CreateMessageOptions>(
  
      variables: FullyQualifiedCreateMessageVariables,
  
  options?: LimitToKnownKeys<Options, CreateMessageOptions>
): Promise<CreateMessageResult<Options>>;

// Function implementation
async function createMessage<Options extends CreateMessageOptions>(
  this: MessageManager,
  
      variables: CreateMessageVariables | FullyQualifiedCreateMessageVariables,
  
  options?: LimitToKnownKeys<Options, CreateMessageOptions>
): Promise<CreateMessageResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["create"],
       undefined,
      variables
    );

    
  return (await actionRunner<SelectedMessageOrDefault<Options>>(
    this,
    "createMessage",
    DefaultMessageSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
                    "message": {
          value: newVariables.message,
          required: false,
          type: "CreateMessageInput",
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
  export type FullyQualifiedUpdateMessageVariables = {
          message?: UpdateMessageInput,
      }

  /**
   * The inputs for executing update on message.
   * This is the flattened style of inputs, suitable for general use, and should be preferred.
   **/

    export type UpdateMessageVariables = UpdateMessageInput;



/**
 * The return value from executing update on message.
 * "Is a GadgetRecord of the model's type."
 **/
export type UpdateMessageResult<Options extends UpdateMessageOptions> =
  SelectedMessageOrDefault<Options> extends void ? void : GadgetRecord<SelectedMessageOrDefault<Options>>
;


/**
  * Executes the update action on one record specified by `id`. Runs the action and returns a Promise for the updated record.
  */

// Flat style overload
async function updateMessage<Options extends UpdateMessageOptions>(
  id: string,
    variables: UpdateMessageVariables,

  options?: LimitToKnownKeys<Options, UpdateMessageOptions>
): Promise<UpdateMessageResult<Options>>;

// Fully qualified, nested api identifier overload
async function updateMessage<Options extends UpdateMessageOptions>(
  id: string,
      variables: FullyQualifiedUpdateMessageVariables,
  
  options?: LimitToKnownKeys<Options, UpdateMessageOptions>
): Promise<UpdateMessageResult<Options>>;

// Function implementation
async function updateMessage<Options extends UpdateMessageOptions>(
  this: MessageManager,
  id: string,
      variables: UpdateMessageVariables | FullyQualifiedUpdateMessageVariables,
  
  options?: LimitToKnownKeys<Options, UpdateMessageOptions>
): Promise<UpdateMessageResult<Options>> {
    const newVariables = disambiguateActionParams(
      this["update"],
       id,
      variables
    );

    
  return (await actionRunner<SelectedMessageOrDefault<Options>>(
    this,
    "updateMessage",
    DefaultMessageSelection,
    apiIdentifier,
    apiIdentifier,
    false,
    {
              id: {
          value: id,
          required: true,
          type: "GadgetID",
        },
                    "message": {
          value: newVariables.message,
          required: false,
          type: "UpdateMessageInput",
        },
          },
    options,
    null,
    false
  ));
}

  
    

/**
 * The return value from executing delete on message.
 * "Is void because this action deletes the record"
 **/
export type DeleteMessageResult<Options extends DeleteMessageOptions> =
  void extends void ? void : GadgetRecord<SelectedMessageOrDefault<Options>>
;


/**
  * Executes the delete action on one record specified by `id`. Deletes the record on the server. Returns a Promise that resolves if the delete succeeds.
  */

// Fully qualified, nested api identifier overload
async function deleteMessage<Options extends DeleteMessageOptions>(
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteMessageOptions>
): Promise<DeleteMessageResult<Options>>;

// Function implementation
async function deleteMessage<Options extends DeleteMessageOptions>(
  this: MessageManager,
  id: string,
  
  options?: LimitToKnownKeys<Options, DeleteMessageOptions>
): Promise<DeleteMessageResult<Options>> {

    
  return (await actionRunner<void>(
    this,
    "deleteMessage",
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

  



/** All the actions available at the collection level and record level for "message" */
export class MessageManager {
  constructor(readonly connection: GadgetConnection) {}

  
    /**
 * Finds one message by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
findOne: {
  <Options extends FindOneMessageOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    >;
  type: "findOne",
  findByVariableName: "id";
  operationName: "message";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: FindOneMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends FindOneMessageOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>): Promise<
  GadgetRecord<
    SelectedMessageOrDefault<Options>
  >
> => {
    return await findOneRunner<SelectedMessageOrDefault<Options>>(
      this,
      "message",
      id,
      DefaultMessageSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "message",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
)

  
    /**
 * Finds one message by ID. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
 **/
maybeFindOne: {
  <Options extends MaybeFindOneMessageOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      > | null
    >;
  type: "maybeFindOne";
  findByVariableName: "id";
  operationName: "message";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: MaybeFindOneMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends MaybeFindOneMessageOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneMessageOptions>) => {
    const record = await findOneRunner<SelectedMessageOrDefault<Options>>(
      this,
      "message",
      id,
      DefaultMessageSelection,
      apiIdentifier,
      options,
      false
    );
    return record.isEmpty() ? null : record;
  },
  {
    type: "maybeFindOne",
    findByVariableName: "id",
    operationName: "message",
    modelApiIdentifier: "message",
    defaultSelection: DefaultMessageSelection,
  } as any
)

  
    /**
 * Finds many message. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findMany: {
  <Options extends FindManyMessagesOptions>(options?: LimitToKnownKeys<Options, FindManyMessagesOptions>):
    Promise<
      GadgetRecordList<
        SelectedMessageOrDefault<Options>
      >
    >;
  type: "findMany";
  operationName: "messages";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: FindManyMessagesOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends FindManyMessagesOptions>(options?: LimitToKnownKeys<Options, FindManyMessagesOptions>):
    Promise<
      GadgetRecordList<
        SelectedMessageOrDefault<Options>
      >
    > =>
  {
    return await findManyRunner<SelectedMessageOrDefault<Options>>(
      this,
      "messages",
      DefaultMessageSelection,
      "message",
      options
    );
  },
  {
    type: "findMany",
    operationName: "messages",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
);

  
    /**
 * Finds the first matching message. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
 **/
findFirst: {
  <Options extends FindFirstMessageOptions>(options?: LimitToKnownKeys<Options, FindFirstMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    >;
  type: "findFirst";
  operationName: "messages";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: FindFirstMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends FindFirstMessageOptions>(options?: LimitToKnownKeys<Options, FindFirstMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    > =>
  {
    const list = await findManyRunner<SelectedMessageOrDefault<Options>>(
      this,
      "messages",
      DefaultMessageSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      true
    );
    return list[0];
  },
  {
    type: "findFirst",
    operationName: "messages",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
);

  
    /**
 * Finds the first matching message. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
 **/
maybeFindFirst: {
  <Options extends MaybeFindFirstMessageOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      > | null
    >;
  type: "maybeFindFirst";
  operationName: "messages";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: MaybeFindFirstMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends MaybeFindFirstMessageOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      > | null
    > =>
  {
    const list = await findManyRunner<SelectedMessageOrDefault<Options>>(
      this,
      "messages",
      DefaultMessageSelection,
      apiIdentifier,
      { ...options, first: 1, last: undefined, before: undefined, after: undefined },
      false
    );
    return list?.[0] ?? null;
  },
  {
    type: "maybeFindFirst",
    operationName: "messages",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
);

  
    /**
  * Finds one message by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
  **/
findById: {
  <Options extends FindOneMessageOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    >;
  type: "findOne";
  findByVariableName: "id";
  operationName: "messages";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: FindOneMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends FindOneMessageOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    > =>
  {
    return await findOneByFieldRunner<SelectedMessageOrDefault<Options>>(
      this,
      "messages",
      "id",
      value,
      DefaultMessageSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "id",
    operationName: "messages",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
)

  
    /**
  * Finds one message by its order. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
  **/
findByOrder: {
  <Options extends FindOneMessageOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    >;
  type: "findOne";
  findByVariableName: "order";
  operationName: "messages";
  modelApiIdentifier: "message";
  defaultSelection: typeof DefaultMessageSelection;
  selectionType: AvailableMessageSelection;
  optionsType: FindOneMessageOptions;
  schemaType: Query["message"];
} = Object.assign(
  async <Options extends FindOneMessageOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneMessageOptions>):
    Promise<
      GadgetRecord<
        SelectedMessageOrDefault<Options>
      >
    > =>
  {
    return await findOneByFieldRunner<SelectedMessageOrDefault<Options>>(
      this,
      "messages",
      "order",
      value,
      DefaultMessageSelection,
      apiIdentifier,
      options
    ) as any;
  },
  {
    type: "findOne",
    findByVariableName: "order",
    operationName: "messages",
    modelApiIdentifier: apiIdentifier,
    defaultSelection: DefaultMessageSelection,
  } as any
)

  
    create = Object.assign(createMessage,
  {
    type: "action",
    operationName: "createMessage",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultMessageSelection,
    variables: {
      "message": {
        required: false,
        type: "CreateMessageInput",
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
    operationName: "createMessage";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "message";
    isBulk: false;
    defaultSelection: typeof DefaultMessageSelection;
    selectionType: AvailableMessageSelection;
    optionsType: CreateMessageOptions;
    schemaType:  Query["message"];

    variablesType: (

      (
        FullyQualifiedCreateMessageVariables          | CreateMessageVariables      )
    )
    // all variables are optional, so no variables can be passed at all
    | undefined
    ;
    variables: {
                    "message": {
          required: false;
          type: "CreateMessageInput";
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
    <Options extends CreateMessageOptions>(
        inputs: (FullyQualifiedCreateMessageVariables | CreateMessageVariables)[],
      options?: LimitToKnownKeys<Options, CreateMessageOptions>
    ): Promise<CreateMessageResult<Options>[]>;
    type: "action";
    operationName: "bulkCreateMessages";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "messages";
    isBulk: true;
    defaultSelection: typeof DefaultMessageSelection;
    selectionType: AvailableMessageSelection;
    optionsType: CreateMessageOptions;
    schemaType: Query["message"];
    variablesType: (FullyQualifiedCreateMessageVariables | CreateMessageVariables)[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkCreateMessagesInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends CreateMessageOptions>(
        inputs: (FullyQualifiedCreateMessageVariables | CreateMessageVariables)[],
      options?: LimitToKnownKeys<Options, CreateMessageOptions>
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
        "bulkCreateMessages",
        DefaultMessageSelection,
        "message",
        "messages",
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
      operationName: "bulkCreateMessages",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "messages",
      isBulk: true,
      defaultSelection: DefaultMessageSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkCreateMessagesInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    update = Object.assign(updateMessage,
  {
    type: "action",
    operationName: "updateMessage",
    namespace: null,
    modelApiIdentifier: apiIdentifier,
    modelSelectionField: apiIdentifier,
    isBulk: false,
    defaultSelection: DefaultMessageSelection,
    variables: {
      id: {
        required: true,
        type: "GadgetID",
      },
      "message": {
        required: false,
        type: "UpdateMessageInput",
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
    operationName: "updateMessage";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "message";
    isBulk: false;
    defaultSelection: typeof DefaultMessageSelection;
    selectionType: AvailableMessageSelection;
    optionsType: UpdateMessageOptions;
    schemaType:  Query["message"];

    variablesType: (
        { id: string } &

      (
        FullyQualifiedUpdateMessageVariables          | UpdateMessageVariables      )
    )
    ;
    variables: {
              id: {
          required: true;
          type: "GadgetID";
        };
                    "message": {
          required: false;
          type: "UpdateMessageInput";
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
    <Options extends UpdateMessageOptions>(
        inputs: (FullyQualifiedUpdateMessageVariables | UpdateMessageVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateMessageOptions>
    ): Promise<UpdateMessageResult<Options>[]>;
    type: "action";
    operationName: "bulkUpdateMessages";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "messages";
    isBulk: true;
    defaultSelection: typeof DefaultMessageSelection;
    selectionType: AvailableMessageSelection;
    optionsType: UpdateMessageOptions;
    schemaType: Query["message"];
    variablesType: (FullyQualifiedUpdateMessageVariables | UpdateMessageVariables & { id: string })[];
    variables: {
        inputs: {
          required: true;
          type: "[BulkUpdateMessagesInput!]";
        };
      };
    hasReturnType: boolean;
    acceptsModelInput: boolean;
  } = Object.assign(
    async <Options extends UpdateMessageOptions>(
        inputs: (FullyQualifiedUpdateMessageVariables | UpdateMessageVariables & { id: string })[],
      options?: LimitToKnownKeys<Options, UpdateMessageOptions>
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
        "bulkUpdateMessages",
        DefaultMessageSelection,
        "message",
        "messages",
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
      operationName: "bulkUpdateMessages",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "messages",
      isBulk: true,
      defaultSelection: DefaultMessageSelection,
      variables: {
        inputs: {
          required: true,
          type: "[BulkUpdateMessagesInput!]",
        },
      },
      hasReturnType: false,
      acceptsModelInput: true,
    } as any
  );

  
    delete = Object.assign(deleteMessage,
  {
    type: "action",
    operationName: "deleteMessage",
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
    operationName: "deleteMessage";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "message";
    isBulk: false;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteMessageOptions;
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
    <Options extends DeleteMessageOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteMessageOptions>
    ): Promise<DeleteMessageResult<Options>[]>;
    type: "action";
    operationName: "bulkDeleteMessages";
    namespace: null;
    modelApiIdentifier: "message";
    modelSelectionField: "messages";
    isBulk: true;
    defaultSelection: null;
    selectionType: Record<string, never>;
    optionsType: DeleteMessageOptions;
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
    async <Options extends DeleteMessageOptions>(
        ids: string[],
      options?: LimitToKnownKeys<Options, DeleteMessageOptions>
    ) => {

      return (await actionRunner<any>(
        this,
        "bulkDeleteMessages",
        null,
        "message",
        "messages",
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
      operationName: "bulkDeleteMessages",
      namespace: null,
      modelApiIdentifier: apiIdentifier,
      modelSelectionField: "messages",
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
