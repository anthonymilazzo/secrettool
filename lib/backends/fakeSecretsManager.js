"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = exports.updateSecret = exports.createSecret = void 0;
function createSecret(secretName, value) {
    console.log(`*** [fake] secret create ${secretName} ${value}`);
}
exports.createSecret = createSecret;
function updateSecret(secretName, value) {
    console.log(`*** [fake] secret update ${secretName} ${value}`);
}
exports.updateSecret = updateSecret;
function getSecret(secretName) {
    console.log(`*** [fake] secret get ${secretName}`);
    return true;
}
exports.getSecret = getSecret;
