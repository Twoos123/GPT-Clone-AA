/**
 * An object containing the app's base configuration variables
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    Config: function() {
        return Config;
    },
    setAppConfigs: function() {
        return setAppConfigs;
    }
});
let Config;
const setAppConfigs = (configs)=>{
    Config = configs;
};
