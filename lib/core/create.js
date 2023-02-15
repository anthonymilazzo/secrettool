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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSecretEnvs = exports.createSecretLoop = void 0;
const format_1 = require("./format");
const secretsManager = __importStar(require("../backends/fakeSecretsManager"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function createSecret(secretsConfig, secret, env) {
    const secretPath = (0, format_1.renderSecretPath)(secretsConfig, secret, env);
    let value = prompt(`Value for \"${secret}\" in \"${env}\" > `);
    secretsManager.createSecret(secretPath, value);
    console.log(`Creating secret \"${secret}\"... ✅`);
}
function chooseSecretPath() {
    let secret = prompt('What would you like to name your secret? ');
    return secret;
}
function createAnySecrets(secretsConfig) {
    let guess = prompt('Would you like to create any new secrets? (y/N): ');
    console.log('');
    if (guess == 'y') {
        let secret = chooseSecretPath();
        createSecretEnvs(secretsConfig, secret);
        return true;
    }
    else {
        return false;
    }
}
function createSecretLoop(secretsConfig) {
    let creatingSecrets = true;
    while (creatingSecrets) {
        creatingSecrets = createAnySecrets(secretsConfig);
        console.log('');
    }
}
exports.createSecretLoop = createSecretLoop;
function createSecretEnvs(secretsConfig, secret) {
    secretsConfig.envs.forEach((env) => {
        createSecret(secretsConfig, secret, env);
    });
}
exports.createSecretEnvs = createSecretEnvs;
