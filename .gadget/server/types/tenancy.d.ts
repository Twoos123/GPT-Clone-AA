export declare const AppTenancyKey: unique symbol;
export type AppTenant = Partial<{
    shopify: ShopifyTenant;
    bigcommerce: BigCommerceTenant;
}>;
export type AppTenancy = Partial<{
    shopify: ShopifyTenancy;
    bigcommerce: BigCommerceTenancy;
}>;
export type ShopifyTenant = Pick<ShopifyTenancy, "shopId" | "customerId" | "currentSession">;
export type ShopifyTenancy = {
    shopId: bigint;
    domain: string;
    accessToken: string;
    apiVersion: string;
    clientId: string;
    clientSecret: string;
    customerId?: string;
    currentSession?: {
        token: string;
        userId?: string;
    };
};
export type BigCommerceTenant = Pick<BigCommerceTenancy, "storeHash" | "userId">;
export type BigCommerceTenancy = {
    storeHash: string;
    storeId: string;
    userId?: string;
    accessToken: string;
    clientId: string;
    clientSecret: string;
};
