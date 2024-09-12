import { Client } from "@gadget-client/aa-gpt-clone";
import { FastifyLoggerInstance } from "fastify";
import { AppConfiguration } from "./AppConfiguration";
import { AppConnections } from "./AppConnections";
import { Session } from "./Session";
import { GadgetMailer, RequestData } from "./types";
export type Logger = FastifyLoggerInstance;
export interface AmbientContext {
    session?: Session;
    sessionID?: string;
    config: AppConfiguration;
    connections: AppConnections;
    logger: Logger;
    api: Client;
    request?: RequestData;
    currentAppUrl: string;
    emails: GadgetMailer;
}
