"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAllEnvs = void 0;
const format_1 = require("./format");
const secretsManager = __importStar(require("../backends/fakeSecretsManager"));
function secretExists(secretsConfig, secret, env) {
    const secretPath = (0, format_1.renderSecretPath)(secretsConfig, secret, env);
    const exists = secretsManager.getSecret(secretPath);
    if (exists) {
        console.log(` >>> Checking if \"${secret}\" exists in \"${env}\"... ✅`);
    }
    else {
        console.log(` >>> Checking if \"${secret}\" exists in \"${env}\"... X`);
    }
}
function hasAccess(secretsConfig, secret, env) {
    console.log(` >>> Checking if you have access to \"${secret}\" in \"${env}\"... ✅`);
}
function checkAllEnvs(secretsConfig) {
    secretsConfig.envs.forEach((env) => {
        checkAllSecrets(secretsConfig, env);
    });
}
exports.checkAllEnvs = checkAllEnvs;
function checkAllSecrets(secretsConfig, env) {
    secretsConfig.secrets.forEach((secret) => {
        console.log(` > Checking secret \"${secret}\" in \"${env}\"...`);
        secretExists(secretsConfig, secret, env);
        hasAccess(secretsConfig, secret, env);
        console.log(`Secret \"${secret}\" in \"${env}\" is ready for use 🚀
`);
    });
}
