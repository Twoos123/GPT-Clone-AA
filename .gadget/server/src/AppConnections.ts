    import OpenAI from "openai";



    export interface OpenAIConnection extends OpenAI {
        /**
        * the Open AI configuration that can be used to instantiate other clients
        */
        configuration: {
            apiKey: string;
            baseUrl?: string;
        }
    }
 


/**
 * A map from connection name to instantiated connection object for all the connections in aa-gpt-clone
 */
export interface AppConnections {
  /** An instantiated API client object for the OpenAI connection. */
  "openai": OpenAIConnection;
};

