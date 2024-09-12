import { applyParams, save, ActionOptions, UpdateMessageActionContext } from "gadget-server";

/**
 * @param { UpdateMessageActionContext } context
 */
export async function run({ params, record, logger, api }) {
  applyParams(params, record);
  await save(record);
};

/**
 * @param { UpdateMessageActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "update"
};
