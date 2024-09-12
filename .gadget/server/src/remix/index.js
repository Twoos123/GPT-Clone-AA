/**
 * Parameters for running a Remix app in Gadget.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "remixViteOptions", {
    enumerable: true,
    get: function() {
        return remixViteOptions;
    }
});
const remixViteOptions = {
    buildDirectory: ".gadget/remix-dist/build",
    appDirectory: "web"
};
