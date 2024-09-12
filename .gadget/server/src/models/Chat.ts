// All the generated types for the "chat" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger } from "../types";
import { GadgetRecord, Chat } from "@gadget-client/aa-gpt-clone";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultChatServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly name: true;
      readonly userId: true;
    readonly user: false;
      readonly messages: false;
  };

  
/** Context of the `create` action on the `chat` model. */
export interface CreateChatActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `chat` record this action is operating on.
  */
  record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ActionTrigger;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {

};
  /**
  * @private The context of this action.
  */
  context: CreateChatActionContext;
};


    
/** Context of the `update` action on the `chat` model. */
export interface UpdateChatActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `chat` record this action is operating on.
  */
  record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ActionTrigger;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {

};
  /**
  * @private The context of this action.
  */
  context: UpdateChatActionContext;
};


    
/** Context of the `delete` action on the `chat` model. */
export interface DeleteChatActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `chat` record this action is operating on.
  */
  record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ActionTrigger;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {

};
  /**
  * @private The context of this action.
  */
  context: DeleteChatActionContext;
};


    
/** Context of the `name` action on the `chat` model. */
export interface NameChatActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `chat` record this action is operating on.
  */
  record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ActionTrigger;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
firstMessage?: string;
};
  /**
  * @private The context of this action.
  */
  context: NameChatActionContext;
};


  