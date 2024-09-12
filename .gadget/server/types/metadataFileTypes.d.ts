type GadgetPermissions = {
    type: "gadget/permissions/v1";
    roles: {
        [x: string]: {
            storageKey: string;
            default?: {
                read?: boolean | undefined;
                action?: boolean | undefined;
            } | undefined;
            models?: {
                [x: string]: {
                    read?: (boolean | {
                        filter: string | null;
                    }) | undefined;
                    actions?: {
                        [x: string]: boolean | {
                            filter: string | null;
                        };
                    } | undefined;
                };
            } | undefined;
            actions?: {
                [x: string]: boolean;
            } | undefined;
        };
    };
};
type GadgetSettings = {
    type: "gadget/settings/v1";
    frameworkVersion: "v0.1" | "v0.2" | "v0.3" | "v0.3.1" | "v1.0.0" | "v1.1.0" | "v1.2.0" | "v1.3.0";
    plugins: {
        connections?: {
            shopify?: ({
                apiVersion: "2022-01" | "2022-04" | "2022-07" | "2022-10" | "2023-01" | "2023-04" | "2023-07" | "2023-10" | "2024-01" | "2024-04" | "2024-07";
                enabledModels: string[];
                type: "partner";
                scopes: string[];
                customerAuthenticationEnabled?: boolean | undefined;
            } | {
                apiVersion: "2022-01" | "2022-04" | "2022-07" | "2022-10" | "2023-01" | "2023-04" | "2023-07" | "2023-10" | "2024-01" | "2024-04" | "2024-07";
                enabledModels: string[];
                type: "admin";
            }) | undefined;
            openai?: boolean | undefined;
            sentry?: boolean | undefined;
            bigcommerce?: {
                type: "singleClick";
            } | undefined;
        } | undefined;
        authentications?: {
            settings: {
                redirectOnSignIn: string;
                signInPath: string;
                unauthorizedUserRedirect: "redirect" | "signInPath" | "show-403-error" | "403Error";
                accessControlForSignedInUsers?: string[] | undefined;
                defaultSignedInRoles?: string[] | undefined;
            };
            methods: {
                googleOAuth?: {
                    offlineAccess: boolean;
                    scopes: string[];
                } | undefined;
                emailPassword?: boolean | undefined;
            };
        } | undefined;
    };
};
type GadgetModel = {
    type: "gadget/model-schema/v1";
    storageKey: string;
    fields: {
        [x: string]: {
            type: "number";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: number | undefined;
            decimals?: number | undefined;
            validations?: {
                required?: boolean | undefined;
                numberRange?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "string";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                stringLength?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                regex?: (string | null)[] | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                    caseSensitive?: boolean | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "richText";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: {
                markdown: string;
            } | undefined;
            validations?: {
                required?: boolean | undefined;
                stringLength?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                regex?: (string | null)[] | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                    caseSensitive?: boolean | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "email";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                stringLength?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                regex?: (string | null)[] | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                    caseSensitive?: boolean | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "url";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                stringLength?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                regex?: (string | null)[] | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                    caseSensitive?: boolean | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "color";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                stringLength?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                regex?: (string | null)[] | undefined;
                color?: boolean | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "json";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: any | undefined;
            defaultAsString?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "enum";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: (string | string[]) | undefined;
            acceptMultipleSelections?: boolean | undefined;
            acceptUnlistedOptions?: boolean | undefined;
            options: string[];
            validations?: {
                required?: boolean | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "boolean";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            default?: boolean | undefined;
            validations?: {
                required?: boolean | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "dateTime";
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            includeTime?: boolean | undefined;
            default?: string | undefined;
            validations?: {
                required?: boolean | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "vector";
            validations?: {
                required?: boolean | undefined;
                dimensionCount?: (number | null) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "file";
            allowPublicAccess?: boolean | undefined;
            validations?: {
                required?: boolean | undefined;
                fileSizeRange?: {
                    min: number | null;
                    max: number | null;
                } | undefined;
                run?: (string | null)[] | undefined;
                imagesOnly?: (boolean | {
                    allowAnimatedImages: boolean;
                }) | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "encryptedString";
            validations?: {
                required?: boolean | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "computed";
            sourceFile?: (string | null) | undefined;
            storageKey: string;
        } | {
            type: "belongsTo";
            validations?: {
                required?: boolean | undefined;
                unique?: ({
                    scopeByField?: string | undefined;
                } | boolean) | undefined;
                run?: (string | null)[] | undefined;
            } | undefined;
            parent?: {
                model: string | null;
            } | undefined;
            shopifyMetafield?: {
                privateMetafield?: boolean | undefined;
                namespace?: string | undefined;
                key?: string | undefined;
                metafieldType?: string | undefined;
                allowMultipleEntries?: boolean | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "hasOne";
            child?: {
                model: string | null;
                belongsToField: string | null;
            } | undefined;
            storageKey: string;
        } | {
            type: "hasMany";
            children?: {
                model: string | null;
                belongsToField: string | null;
            } | undefined;
            storageKey: string;
        } | {
            type: "hasManyThrough";
            sibling?: {
                model: string | null;
                relatedField: string | null;
            } | undefined;
            join?: {
                model: string | null;
                belongsToSelfField: string | null;
                belongsToSiblingField: string | null;
            } | undefined;
            storageKey: string;
        } | {
            type: "password";
            validations?: {
                required?: boolean | undefined;
                strongPassword?: boolean | undefined;
            } | undefined;
            storageKey: string;
        } | {
            type: "roleList";
            default?: string[] | undefined;
            storageKey: string;
        } | {
            storageKey: string;
            type: "money";
            default?: {
                amount: number;
            } | undefined;
            currency?: string | undefined;
        } | {
            storageKey: string;
            type: "recordState";
        };
    };
    shopify?: {
        fields?: string[] | undefined;
    } | undefined;
};
export type { GadgetPermissions, GadgetSettings, GadgetModel };
