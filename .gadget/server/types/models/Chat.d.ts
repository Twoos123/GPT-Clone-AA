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
export interface CreateChatActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: CreateChatActionContext;
}
export interface UpdateChatActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: UpdateChatActionContext;
}
export interface DeleteChatActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: DeleteChatActionContext;
}
export interface NameChatActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<Chat, DefaultChatServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
        firstMessage?: string;
    };
    context: NameChatActionContext;
}
