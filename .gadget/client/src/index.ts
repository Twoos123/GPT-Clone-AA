/**
* This is the Gadget API client library for:
*
*                                 _             _                  
*    __ _  __ _        __ _ _ __ | |_       ___| | ___  _ __   ___ 
*   / _` |/ _` |_____ / _` | '_ \| __|____ / __| |/ _ \| '_ \ / _ \
*  | (_| | (_| |_____| (_| | |_) | ||_____| (__| | (_) | | | |  __/
*   \__,_|\__,_|      \__, | .__/ \__|     \___|_|\___/|_| |_|\___|
*                     |___/|_|                                     
*
* Built for environment "Development" at version 49
* API docs: https://docs.gadget.dev/api/aa-gpt-clone
* Edit this app here: https://aa-gpt-clone.gadget.app/edit
*/
export {
  BrowserSessionStorageType, GadgetClientError, GadgetConnection, GadgetInternalError, GadgetOperationError, GadgetRecord,
  GadgetRecordList, GadgetValidationError, InvalidRecordError
} from "@gadgetinc/api-client-core";

export type { AuthenticationModeOptions, BrowserSessionAuthenticationModeOptions, ClientOptions, InvalidFieldError, Select } from "@gadgetinc/api-client-core";

export * from "./Client.js";
export * from "./types.js";

declare global {
  interface Window {
    gadgetConfig: {
      apiKeys: {
        shopify: string;
      };
      environment: string;
      env: Record<string, any>;
      authentication?: {
        signInPath: string;
        redirectOnSuccessfulSignInPath: string;
      }
    };
  }
}
