type ms = number;
type s = number;
type AuthenticationType = AuthenticationTypeCustom | AuthenticationTypeLogin | AuthenticationTypeOAuth2;
interface Credentials {
    user: string;
    pass: string;
}
interface OAuth2 {
    user?: string | undefined;
    clientId?: string | undefined;
    clientSecret?: string | undefined;
    refreshToken?: string | undefined;
    accessUrl?: string | undefined;
    accessToken?: string | undefined;
    privateKey?: string | {
        key: string;
        passphrase: string;
    } | undefined;
    expires?: ms | undefined;
    timeout?: s | undefined;
    provisionCallback?(user: string, renew: boolean, callback: (err: Error | null, accessToken: string, expires: number) => void): void;
    serviceClient?: string | undefined;
}
interface AuthenticationTypeCustom extends Credentials {
    type: "custom" | "Custom" | "CUSTOM";
    method: string;
}
interface AuthenticationTypeLogin extends Credentials {
    type?: "login" | "Login" | "LOGIN" | undefined;
}
interface AuthenticationTypeOAuth2 extends OAuth2 {
    type?: "oauth2" | "OAuth2" | "OAUTH2" | undefined;
}
export interface SMTPTransportConfig {
    host?: string | undefined;
    port?: number | undefined;
    auth?: AuthenticationType | undefined;
    secure?: boolean | undefined;
    name?: string | undefined;
    localAddress?: string | undefined;
    connectionTimeout?: ms | undefined;
    greetingTimeout?: ms | undefined;
    socketTimeout?: ms | undefined;
    dnsTimeout?: ms | undefined;
    transactionLog?: boolean | undefined;
    debug?: boolean | undefined;
    authMethod?: string | undefined;
    lmtp?: boolean | undefined;
}
export interface SendmailTransportConfig {
    sendmail: true;
    path?: string | undefined;
    newline?: string | undefined;
    args?: string[] | undefined;
}
export interface StreamTransportConfig {
    streamTransport: true;
    buffer?: boolean | undefined;
    newline?: string | undefined;
}
export interface JSONTransportConfig {
    jsonTransport: true;
    skipEncoding?: boolean | undefined;
}
export interface SESTransportConfig {
    SES: any;
    maxConnections?: number | undefined;
    sendingRate?: number | undefined;
}
