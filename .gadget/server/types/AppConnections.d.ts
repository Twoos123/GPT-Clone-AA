import OpenAI from "openai";
export interface OpenAIConnection extends OpenAI {
    configuration: {
        apiKey: string;
        baseUrl?: string;
    };
}
export interface AppConnections {
    "openai": OpenAIConnection;
}
