import { deleteRecord, ActionOptions, DeleteMessageActionContext } from "gadget-server";

/**
 * @param { DeleteMessageActionContext } context
 */
export async function run({ params, record, logger, api }) {
  await deleteRecord(record);
};

/**
 * @param { DeleteMessageActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
