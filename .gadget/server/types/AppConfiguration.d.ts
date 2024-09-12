export interface AppConfiguration {
    GADGET_ENV: string | undefined;
    GADGET_APP: string | undefined;
    NODE_ENV: string | undefined;
    GOOGLE_CLIENT_ID: string | undefined;
    GOOGLE_CLIENT_SECRET: string | undefined;
}
declare global {
    namespace NodeJS {
        interface ProcessEnv extends AppConfiguration {
        }
    }
}
