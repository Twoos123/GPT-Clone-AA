import type { FastifyReply, FastifyRequest } from "fastify";
import crypto from "node:crypto";
import type { Session } from "./Session";
declare module "fastify" {
    interface FastifyRequest {
        gadgetAuth?: {
            redirectToSignIn: boolean;
            signInPath: string;
        };
    }
}
export declare const generateCode: (numBytes?: number) => string;
export declare const hashCode: (code: string) => string;
declare const getSessionFromRequest: <Request extends FastifyRequest>(request: Request) => Session;
export declare const preValidation: <RouteContext extends FastifyRequest>(request: RouteContext, reply: FastifyReply) => Promise<void>;
