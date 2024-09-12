"use strict";
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
    emails: function() {
        return emails;
    },
    setGadgetNodeMailer: function() {
        return setGadgetNodeMailer;
    }
});
let emails;
const setGadgetNodeMailer = (transporter)=>{
    emails = transporter;
};
