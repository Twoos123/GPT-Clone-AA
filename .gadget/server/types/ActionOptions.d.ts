export interface ActionOptions {
    actionType?: "create" | "update" | "delete" | "custom";
    transactional?: boolean;
    timeoutMS?: number;
    returnType?: boolean;
}
