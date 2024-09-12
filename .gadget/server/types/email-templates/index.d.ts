import { Config } from "../AppConfigs";
import { emails } from "../emails";
import { GlobalNotSetError } from "../errors";
import { Globals } from "../globals";
import { RESET_PASSWORD_TEMPLATE } from "./reset-password";
import { VERIFY_EMAIL_TEMPLATE } from "./verify-email";
interface templateData {
    app_name?: string;
    url: string;
}
export declare const renderEmailTemplate: (template: string, data: Record<string, any>) => string;
export declare const renderVerifyEmailTemplate: (data: templateData) => string;
export declare const renderResetPasswordTemplate: (data: templateData) => string;
