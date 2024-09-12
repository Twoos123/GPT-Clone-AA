import { applyParams, save, ActionOptions, CreateChatActionContext } from "gadget-server";

/**
 * @param { CreateChatActionContext } context
 */
export async function run({ params, record, logger, api, session }) {
  applyParams(params, record);

  if (!record.user) {
    record.user = {
      _link: session?.get("user")
    };
  }

  await save(record);
};

/**
 * @param { CreateChatActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create"
};
