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
    generateCode: function() {
        return generateCode;
    },
    hashCode: function() {
        return hashCode;
    },
    preValidation: function() {
        return preValidation;
    }
});
function _interop_require_default() {
    const data = require("@swc/helpers/_/_interop_require_default");
    _interop_require_default = function() {
        return data;
    };
    return data;
}
function _nodecrypto() {
    const data = /*#__PURE__*/ _interop_require_default()._(require("node:crypto"));
    _nodecrypto = function() {
        return data;
    };
    return data;
}
const generateCode = (numBytes)=>{
    return _nodecrypto().default.randomBytes(numBytes ?? 64).toString("hex");
};
const hashCode = (code)=>{
    return _nodecrypto().default.createHash("sha256").update(code).digest("hex");
};
const getSessionFromRequest = (request)=>{
    if ("applicationSession" in request) {
        return request.applicationSession;
    }
    throw new Error("The request is not a Gadget server request");
};
const preValidation = async (request, reply)=>{
    let authenticated = false;
    const applicationSession = getSessionFromRequest(request);
    authenticated = !!applicationSession.get("user");
    if (!authenticated) {
        if (request.gadgetAuth?.redirectToSignIn) {
            await reply.redirect(request.gadgetAuth.signInPath);
        } else {
            await reply.status(403).send();
        }
    }
};
