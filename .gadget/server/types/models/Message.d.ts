import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger } from "../types";
import { GadgetRecord, Message } from "@gadget-client/aa-gpt-clone";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultMessageServerSelection = {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly updatedAt: true;
    readonly content: true;
    readonly order: true;
    readonly chatId: true;
    readonly chat: false;
    readonly role: true;
};
export interface CreateMessageActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Message, DefaultMessageServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: CreateMessageActionContext;
}
export interface UpdateMessageActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Message, DefaultMessageServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: UpdateMessageActionContext;
}
export interface DeleteMessageActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Message, DefaultMessageServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: DeleteMessageActionContext;
}
