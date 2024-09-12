import { Client } from "@gadget-client/aa-gpt-clone";
import type { FastifyInstance, FastifyReply, FastifyRequest, RequestGenericInterface } from "fastify";
import { Logger } from "./AmbientContext";
import { AppConfiguration } from "./AppConfiguration";
import { AppConnections } from "./AppConnections";
import { Session } from "./Session";
import { GadgetConfig } from "./types";
declare module "fastify" {
    interface FastifyRequest {
        session: Session | null;
        sessionID: string | null;
        config: AppConfiguration;
        connections: AppConnections;
        logger: Logger;
        gadgetConfig: GadgetConfig;
        gadgetContext: Record<string, any>;
        api: Client;
        currentAppUrl: string;
        request: this;
        reply: FastifyReply;
        applicationSession?: Session;
        applicationSessionID?: string;
    }
    interface FastifyReply {
    }
}
export type Server = FastifyInstance;
export type RouteContext<InputTypes extends RequestGenericInterface = RequestGenericInterface> = FastifyRequest<InputTypes>;
export type Request<InputTypes extends RequestGenericInterface = RequestGenericInterface> = FastifyRequest<InputTypes>;
export type Reply = FastifyReply;
