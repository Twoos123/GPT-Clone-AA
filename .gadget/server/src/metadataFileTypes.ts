/**
A map of roles with the role key as the map key.

Example:
```
{
  "signed-in": {
    name: "signed-in",
    default: {
      read: true,
      action: true,
    },
    models: {
      user: {
        read: {
          filter: "user/filters/tenant.gelly",
        },
        actions: {
          changePassword: {
            filter: "user/filters/tenant.gelly",
          },
          signOut: {
            filter: "user/filters/tenant.gelly",
          },
        },
      },
    },
  }
}
```
 */
type GadgetPermissions = {
  type: "gadget/permissions/v1";
  roles: {
    [x: string]: {
      storageKey: string;
      default?:
        | {
            read?: boolean | undefined;
            action?: boolean | undefined;
          }
        | undefined;
      models?:
        | {
            [x: string]: {
              read?:
                | (
                    | boolean
                    | {
                        filter: string | null;
                      }
                  )
                | undefined;
              actions?:
                | {
                    [x: string]:
                      | boolean
                      | {
                          filter: string | null;
                        };
                  }
                | undefined;
            };
          }
        | undefined;
      actions?:
        | {
            [x: string]: boolean;
          }
        | undefined;
    };
  };
};

type GadgetSettings = {
  type: "gadget/settings/v1";
  frameworkVersion: "v0.1" | "v0.2" | "v0.3" | "v0.3.1" | "v1.0.0" | "v1.1.0" | "v1.2.0" | "v1.3.0";
  plugins: {
    connections?:
      | {
          shopify?:
            | (
                | {
                    apiVersion: "2022-01" | "2022-04" | "2022-07" | "2022-10" | "2023-01" | "2023-04" | "2023-07" | "2023-10" | "2024-01" | "2024-04" | "2024-07";
                    enabledModels: string[];
                    type: "partner";
                    scopes: string[];
                    customerAuthenticationEnabled?: boolean | undefined;
                  }
                | {
                    apiVersion: "2022-01" | "2022-04" | "2022-07" | "2022-10" | "2023-01" | "2023-04" | "2023-07" | "2023-10" | "2024-01" | "2024-04" | "2024-07";
                    enabledModels: string[];
                    type: "admin";
                  }
              )
            | undefined;
          openai?: boolean | undefined;
          sentry?: boolean | undefined;
          bigcommerce?:
            | {
                type: "singleClick";
              }
            | undefined;
        }
      | undefined;
    authentications?:
      | {
          settings: {
            redirectOnSignIn: string;
            signInPath: string;
            unauthorizedUserRedirect: "redirect" | "signInPath" | "show-403-error" | "403Error";
            accessControlForSignedInUsers?: string[] | undefined;
            defaultSignedInRoles?: string[] | undefined;
          };
          methods: {
            googleOAuth?:
              | {
                  offlineAccess: boolean;
                  scopes: string[];
                }
              | undefined;
            emailPassword?: boolean | undefined;
          };
        }
      | undefined;
  };
};

type GadgetModel = {
  type: "gadget/model-schema/v1";
  /** The storage key addressing this model's data in the database */
  storageKey: string;
  /** A list of fields of the model */
  fields: {
    [x: string]:
      | {
          /** The stored datatype of the field. number fields store numeric values. */
          type: "number";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: number | undefined;
          /** The number of decimal places of the field */
          decimals?: number | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                numberRange?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. string fields store strings of UTF-8 characters. */
          type: "string";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                stringLength?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Ensure values for this field match a regular expression */
                regex?: (string | null)[] | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                          caseSensitive?: boolean | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. richText fields store markdown content for human consumption. */
          type: "richText";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?:
            | {
                markdown: string;
              }
            | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                stringLength?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Ensure values for this field match a regular expression */
                regex?: (string | null)[] | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                          caseSensitive?: boolean | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. email fields store one well-formatted email address as a string. */
          type: "email";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                stringLength?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Ensure values for this field match a regular expression */
                regex?: (string | null)[] | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                          caseSensitive?: boolean | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. url fields store a well-formatted URL as a string. */
          type: "url";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                stringLength?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Ensure values for this field match a regular expression */
                regex?: (string | null)[] | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                          caseSensitive?: boolean | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. color fields store a well-formatted hex color as a string. */
          type: "color";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                stringLength?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Ensure values for this field match a regular expression */
                regex?: (string | null)[] | undefined;
                /** Validate that the field value is a valid hex color string */
                color?: boolean | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. json fields store arbitrary JSON, including objects, arrays, and primitive values. The value must be valid JSON. */
          type: "json";
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records, represented as JSON */
          default?: any | undefined;
          /** The default value of the field for newly created records, represented as a string. Mutually exclusive with `default`. Prefer `default` over `defaultAsString`. */
          defaultAsString?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. enum fields store a single string or an array of strings constrained to a list of valid options (unless the `acceptUnlistedOptions` flag is set). */
          type: "enum";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: (string | string[]) | undefined;
          /** Whether this field stores an array or a single string selection */
          acceptMultipleSelections?: boolean | undefined;
          /** Whether this field accepts any option or only the listed options */
          acceptUnlistedOptions?: boolean | undefined;
          /** The list of available options for this field */
          options: string[];
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. boolean fields store one true or false value */
          type: "boolean";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The default value of the field for newly created records */
          default?: boolean | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. dateTime fields store one timestamp with millisecond precision in the UTC timezone, or a date with day precision and no timezone if `includeTime` is off. */
          type: "dateTime";
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** Whether this field includes time */
          includeTime?: boolean | undefined;
          /** The default value of the field for newly created records */
          default?: string | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. vector fields store a list of floats suitable for vector similarity operations. */
          type: "vector";
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate vectors stored in this field have a specific number of dimensions */
                dimensionCount?: (number | null) | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. file fields store a reference to a single file uploaded to cloud storage. */
          type: "file";
          /** Whether this field allows public access */
          allowPublicAccess?: boolean | undefined;
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate this field's length is within a given range */
                fileSizeRange?:
                  | {
                      /** The minimum length of the field */
                      min: number | null;
                      /** The maximum length of the field */
                      max: number | null;
                    }
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
                imagesOnly?:
                  | (
                      | boolean
                      | {
                          allowAnimatedImages: boolean;
                        }
                    )
                  | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. encryptedString fields store a string that is encrypted at rest. */
          type: "encryptedString";
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The datatype of the field. computed fields store a value that is computed using a Gelly expression. */
          type: "computed";
          /** The source file of the field */
          sourceFile?: (string | null) | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. belongsTo fields store an ID pointing to a record of the parent model. */
          type: "belongsTo";
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                unique?:
                  | (
                      | {
                          /** The field to scope the uniqueness validation by */
                          scopeByField?: string | undefined;
                        }
                      | boolean
                    )
                  | undefined;
                /** Validate values for this field with a JavaScript function from a file */
                run?: (string | null)[] | undefined;
              }
            | undefined;
          /** The api identifier of the parent model of the field */
          parent?:
            | {
                model: string | null;
              }
            | undefined;
          /** Optionally connect this field to a metafield within Shopify */
          shopifyMetafield?:
            | {
                /** Whether this metafield is private */
                privateMetafield?: boolean | undefined;
                /** The namespace of the metafield */
                namespace?: string | undefined;
                /** The key of the metafield */
                key?: string | undefined;
                /** The type of the metafield */
                metafieldType?: string | undefined;
                /** Whether this metafield allows multiple entries */
                allowMultipleEntries?: boolean | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. hasOne fields fetch a single record from a child model, powered by a belongsTo field on the child model. */
          type: "hasOne";
          /** The api identifier of the child model powering the field */
          child?:
            | {
                /** The api identifier of the other model that this field creates a relationship with */
                model: string | null;
                /** The api identifier of the belongsTo field on the related model that powers this field */
                belongsToField: string | null;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. hasMany fields fetch a list of records from a child model, powered by a belongsTo field on the child model. */
          type: "hasMany";
          children?:
            | {
                /** The api identifier of the other model that this field creates a relationship with */
                model: string | null;
                /** The api identifier of the belongsTo field on the related model that powers this field */
                belongsToField: string | null;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. hasManyThrough fields fetch a list of sibling records, powered by an intermediate model with two belongsTos pointing at this model and the sibling model. */
          type: "hasManyThrough";
          /** The sibling model this field creates a relationship to */
          sibling?:
            | {
                /** The api identifier of the sibling model */
                model: string | null;
                /** The api identifier of the inverse related field on the sibling model that points back at this model */
                relatedField: string | null;
              }
            | undefined;
          /** The intermediate join model that powers this hasManyThrough relationship to the sibling model */
          join?:
            | {
                /** The api identifier of the intermediate join model */
                model: string | null;
                /** The api identifier of the belongsTo field on the intermediate join model that points to the this model */
                belongsToSelfField: string | null;
                /** The api identifier of the belongsTo field on the intermediate join model that points to the sibling model */
                belongsToSiblingField: string | null;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. password fields store a hashed and salted bcrypt string. */
          type: "password";
          /** The set of validations to apply to this field when saving records of this model */
          validations?:
            | {
                /** Validate that this field has a value for every record */
                required?: boolean | undefined;
                /** Validate that the field value is a strong password */
                strongPassword?: boolean | undefined;
              }
            | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          /** The stored datatype of the field. roleAssignments fields store a list of role names from the app's role list. */
          type: "roleList";
          /** The default value of the field for newly created records */
          default?: string[] | undefined;
          /** The storage key addressing this field's data in the database */
          storageKey: string;
        }
      | {
          storageKey: string;
          /** @deprecated This field type is deprecated. */
          type: "money";
          default?:
            | {
                amount: number;
              }
            | undefined;
          currency?: string | undefined;
        }
      | {
          storageKey: string;
          /** @deprecated This field type is deprecated. */
          type: "recordState";
        };
  };
  /** Configuration for this model's connection to Shopify */
  shopify?:
    | {
        /** The API identifiers of the fields to retrieve from Shopify */
        fields?: string[] | undefined;
      }
    | undefined;
};

export type { GadgetPermissions, GadgetSettings, GadgetModel };
