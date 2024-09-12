/**
* A map from configuration value name to value all the configuration values and secrets in aa-gpt-clone.
* __Note__: Any encrypted configuration values are decrypted and ready for use in this map.
*/
export interface AppConfiguration {
  GADGET_ENV: string | undefined;
  GADGET_APP: string | undefined;
  /**
  * The value for the NODE_ENV environment variable set in the Gadget Environment Variables settings section. 
  */
  NODE_ENV: string | undefined;
  /**
  * The value for the GOOGLE_CLIENT_ID environment variable set in the Gadget Environment Variables settings section. 
  */
  GOOGLE_CLIENT_ID: string | undefined;
  /**
  * The value for the GOOGLE_CLIENT_SECRET environment variable set in the Gadget Environment Variables settings section. 
  */
  GOOGLE_CLIENT_SECRET: string | undefined;
};


declare global {
  namespace NodeJS {
    interface ProcessEnv extends AppConfiguration {
    }
  }
}
