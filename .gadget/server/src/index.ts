/**
* This is the Gadget server side types library for:
*
*                                 _             _                  
*    __ _  __ _        __ _ _ __ | |_       ___| | ___  _ __   ___ 
*   / _` |/ _` |_____ / _` | '_ \| __|____ / __| |/ _ \| '_ \ / _ \
*  | (_| | (_| |_____| (_| | |_) | ||_____| (__| | (_) | | | |  __/
*   \__,_|\__,_|      \__, | .__/ \__|     \___|_|\___/|_| |_|\___|
*                     |___/|_|                                     
*
* Built for environment `Development` at version 49
* Framework version: ^0.2.0
* Edit this app here: https://aa-gpt-clone.gadget.dev/edit
*/
import type { Client } from "@gadget-client/aa-gpt-clone";
import { Logger } from "./AmbientContext";
export { InvalidRecordError } from '@gadgetinc/api-client-core'

export * from "./metadataFileTypes";
export * from "./AmbientContext";
export * from "./AppConfigs";
export * from "./AppConfiguration";
export * from "./AppConnections";
import { AppConnections } from "./AppConnections";
export * from "./auth";
export * as DefaultEmailTemplates from "./email-templates";
export * from "./emails";
export { InvalidStateTransitionError } from "./errors";
export * from "./global-actions";
export * from "./routes";
export * from "./state-chart";
export * from "./types";
export * from "./ActionOptions";
export * from "./effects";
export * from "./utils";
import type { RouteContext } from "./routes";

export {
  preventCrossShopDataAccess,
  ShopifyBulkOperationState,
  ShopifySellingPlanGroupProductState,
  ShopifySellingPlanGroupProductVariantState,
  ShopifyShopState,
  ShopifySyncState,
  abortSync,
  finishBulkOperation,
  globalShopifySync,
  shopifySync,
} from "./shopify";

/**
 * @internal
 */
import { Globals, actionContextLocalStorage } from "./globals";
export * from "./models/User";
export * from "./models/Session";
export * from "./models/Message";
export * from "./models/Chat";

/**
* A map of connection name to instantiated connection objects for the app.
*/
let connections: AppConnections;

/**
 * An instance of the Gadget logger
 */
let logger: Logger;
/**
 * An instance of the Gadget API client that has admin permissions
 */
let api: Client;

/**
* This is used internally to set the connections.
* @internal
*/
export const setConnections = (appConnections: AppConnections) => {
  connections = new Proxy(appConnections, {
    get: (target: any, prop: string) => {
      const actionContext = actionContextLocalStorage.getStore();
      if(actionContext && actionContext.connections) {
        return actionContext.connections[prop];
      }

      const routeContext = Globals.requestContext.get("requestContext");
      if(routeContext && routeContext.connections) {
        return routeContext.connections[prop];
      }

      return target[prop];
    }
  })
}

/**
 * This is used internally to set the rootLogger.
 * @internal
 */
export const setLogger = (rootLogger: Logger) => {
  Globals.logger = rootLogger;
  logger = rootLogger;
};

/**
 * This is used internally to set the client Instance
 * @internal
 */
export const setApiClient = (client: Client) => {
  api = client;
}

export {
  api, logger, connections
};

/**
 * @internal
 */
export {
  Globals,
  actionContextLocalStorage
};

