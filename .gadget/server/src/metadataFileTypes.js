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
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
