import { applyParams, save, ActionOptions, UpdateChatActionContext } from "gadget-server";

/**
 * @param { UpdateChatActionContext } context
 */
export async function run({ params, record, logger, api }) {
  applyParams(params, record);
  await save(record);
};

/**
 * @param { UpdateChatActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update"
};
