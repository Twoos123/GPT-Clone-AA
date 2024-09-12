import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger } from "../types";
import { GadgetRecord, User } from "@gadget-client/aa-gpt-clone";
import { Select } from "@gadgetinc/api-client-core";
export type DefaultUserServerSelection = {
    readonly __typename: true;
    readonly id: true;
    readonly createdAt: true;
    readonly updatedAt: true;
    readonly lastName: true;
    readonly firstName: true;
    readonly chats: false;
    readonly googleImageUrl: true;
    readonly lastSignedIn: true;
    readonly roles: true;
    readonly email: true;
};
export interface SignUpUserActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<User, DefaultUserServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: SignUpUserActionContext;
}
export interface SignInUserActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<User, DefaultUserServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: SignInUserActionContext;
}
export interface SignOutUserActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<User, DefaultUserServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: SignOutUserActionContext;
}
export interface UpdateUserActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<User, DefaultUserServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: UpdateUserActionContext;
}
export interface DeleteUserActionContext extends AmbientContext {
    model: NotYetTyped;
    record: GadgetRecord<Select<User, DefaultUserServerSelection>>;
    scope: ActionExecutionScope;
    trigger: ActionTrigger;
    params: {
    };
    context: DeleteUserActionContext;
}
