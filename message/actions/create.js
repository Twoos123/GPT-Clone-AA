import { applyParams, save, ActionOptions, CreateMessageActionContext } from "gadget-server";

/**
 * @param { CreateMessageActionContext } context
 */
export async function run({ params, record, logger, api }) {
  applyParams(params, record);
  await save(record);
};

/**
 * @param { CreateMessageActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "create"
};
