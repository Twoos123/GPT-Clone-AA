"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  DefaultEmailTemplates: () => DefaultEmailTemplates,
  Globals: () => import_globals.Globals,
  InvalidRecordError: () => import_api_client_core.InvalidRecordError,
  InvalidStateTransitionError: () => import_errors.InvalidStateTransitionError,
  ShopifyBulkOperationState: () => import_shopify.ShopifyBulkOperationState,
  ShopifySellingPlanGroupProductState: () => import_shopify.ShopifySellingPlanGroupProductState,
  ShopifySellingPlanGroupProductVariantState: () => import_shopify.ShopifySellingPlanGroupProductVariantState,
  ShopifyShopState: () => import_shopify.ShopifyShopState,
  ShopifySyncState: () => import_shopify.ShopifySyncState,
  abortSync: () => import_shopify.abortSync,
  actionContextLocalStorage: () => import_globals.actionContextLocalStorage,
  api: () => api,
  connections: () => connections,
  finishBulkOperation: () => import_shopify.finishBulkOperation,
  globalShopifySync: () => import_shopify.globalShopifySync,
  logger: () => logger,
  preventCrossShopDataAccess: () => import_shopify.preventCrossShopDataAccess,
  setApiClient: () => setApiClient,
  setConnections: () => setConnections,
  setLogger: () => setLogger,
  shopifySync: () => import_shopify.shopifySync
});
module.exports = __toCommonJS(src_exports);
var import_api_client_core = require("@gadgetinc/api-client-core");
__reExport(src_exports, require("./metadataFileTypes"), module.exports);
__reExport(src_exports, require("./AmbientContext"), module.exports);
__reExport(src_exports, require("./AppConfigs"), module.exports);
__reExport(src_exports, require("./AppConfiguration"), module.exports);
__reExport(src_exports, require("./AppConnections"), module.exports);
__reExport(src_exports, require("./auth"), module.exports);
var DefaultEmailTemplates = __toESM(require("./email-templates"));
__reExport(src_exports, require("./emails"), module.exports);
var import_errors = require("./errors");
__reExport(src_exports, require("./global-actions"), module.exports);
__reExport(src_exports, require("./routes"), module.exports);
__reExport(src_exports, require("./state-chart"), module.exports);
__reExport(src_exports, require("./types"), module.exports);
__reExport(src_exports, require("./ActionOptions"), module.exports);
__reExport(src_exports, require("./effects"), module.exports);
__reExport(src_exports, require("./utils"), module.exports);
var import_shopify = require("./shopify");
var import_globals = require("./globals");
__reExport(src_exports, require("./models/User"), module.exports);
__reExport(src_exports, require("./models/Session"), module.exports);
__reExport(src_exports, require("./models/Message"), module.exports);
__reExport(src_exports, require("./models/Chat"), module.exports);
let connections;
let logger;
let api;
const setConnections = (appConnections) => {
  connections = new Proxy(appConnections, {
    get: (target, prop) => {
      const actionContext = import_globals.actionContextLocalStorage.getStore();
      if (actionContext && actionContext.connections) {
        return actionContext.connections[prop];
      }
      const routeContext = import_globals.Globals.requestContext.get("requestContext");
      if (routeContext && routeContext.connections) {
        return routeContext.connections[prop];
      }
      return target[prop];
    }
  });
};
const setLogger = (rootLogger) => {
  import_globals.Globals.logger = rootLogger;
  logger = rootLogger;
};
const setApiClient = (client) => {
  api = client;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultEmailTemplates,
  Globals,
  InvalidRecordError,
  InvalidStateTransitionError,
  ShopifyBulkOperationState,
  ShopifySellingPlanGroupProductState,
  ShopifySellingPlanGroupProductVariantState,
  ShopifyShopState,
  ShopifySyncState,
  abortSync,
  actionContextLocalStorage,
  api,
  connections,
  finishBulkOperation,
  globalShopifySync,
  logger,
  preventCrossShopDataAccess,
  setApiClient,
  setConnections,
  setLogger,
  shopifySync,
  ...require("./metadataFileTypes"),
  ...require("./AmbientContext"),
  ...require("./AppConfigs"),
  ...require("./AppConfiguration"),
  ...require("./AppConnections"),
  ...require("./auth"),
  ...require("./emails"),
  ...require("./global-actions"),
  ...require("./routes"),
  ...require("./state-chart"),
  ...require("./types"),
  ...require("./ActionOptions"),
  ...require("./effects"),
  ...require("./utils"),
  ...require("./models/User"),
  ...require("./models/Session"),
  ...require("./models/Message"),
  ...require("./models/Chat")
});
//# sourceMappingURL=index.js.map
