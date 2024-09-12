import { deleteRecord, ActionOptions, DeleteUserActionContext } from "gadget-server";

/**
 * @param { DeleteUserActionContext } context
 */
export async function run({ params, record, logger, api }) {
  await deleteRecord(record);
};

/**
 * @param { DeleteUserActionContext } context
 */
export async function onSuccess({ params, record, logger, api }) {
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
