"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var email_templates_exports = {};
__export(email_templates_exports, {
  renderEmailTemplate: () => renderEmailTemplate,
  renderResetPasswordTemplate: () => renderResetPasswordTemplate,
  renderVerifyEmailTemplate: () => renderVerifyEmailTemplate
});
module.exports = __toCommonJS(email_templates_exports);
var import_AppConfigs = require("../AppConfigs");
var import_emails = require("../emails");
var import_errors = require("../errors");
var import_globals = require("../globals");
var import_reset_password = require("./reset-password");
var import_verify_email = require("./verify-email");
const renderEmailTemplate = (template, data) => {
  if (!import_emails.emails) {
    throw new import_errors.GlobalNotSetError("emails is not yet defined");
  }
  try {
    return import_emails.emails.render(template, data);
  } catch (error) {
    import_globals.Globals.logger.error({ error, name: "emails" }, "An error occurred rendering your EJS email template");
    throw error;
  }
};
const renderVerifyEmailTemplate = (data) => {
  if (!import_AppConfigs.Config.appName && !data.app_name) {
    throw new import_errors.GlobalNotSetError("Config.appName is not yet defined");
  }
  const url = data.url;
  const app_name = data.app_name ?? import_AppConfigs.Config.appName;
  return renderEmailTemplate(import_verify_email.VERIFY_EMAIL_TEMPLATE, { app_name, url });
};
const renderResetPasswordTemplate = (data) => {
  if (!import_AppConfigs.Config.appName && !data.app_name) {
    throw new import_errors.GlobalNotSetError("Config.appName is not yet defined");
  }
  const url = data.url;
  const app_name = data.app_name ?? import_AppConfigs.Config.appName;
  return renderEmailTemplate(import_reset_password.RESET_PASSWORD_TEMPLATE, { app_name, url });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderEmailTemplate,
  renderResetPasswordTemplate,
  renderVerifyEmailTemplate
});
//# sourceMappingURL=index.js.map
