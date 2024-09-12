/**
 * Specifies action configurations in Gadget
 *
 * @property actionType - defines the behaviour of an action in a data model, which usually means changing the data on a record (defaults to 'custom').
 * @property transactional - indicates whether `run` function should be transactional or not (defaults to `true` for model actions, and `false` for actions).
 * @property timeoutMS - specifies max time in milliseconds for the action to run before being terminated (defaults to 180000ms[3 mins]).
 * @property returnType - specifies if an action should return the result of the `run` function (defaults to `false` for model actions and `true` for actions).
 * @property triggers - specifies the triggers to an action.
 */
export interface ActionOptions {
  actionType?: "create" | "update" | "delete" | "custom";
  transactional?: boolean;
  timeoutMS?: number;
  returnType?: boolean;
}
