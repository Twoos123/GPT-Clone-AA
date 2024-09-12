import type { FastifyBaseLogger } from "fastify";

/** Gadget-internal facing type declaration for the generated module */
declare module "./AmbientContext" {
  export type Logger = FastifyBaseLogger;
}
