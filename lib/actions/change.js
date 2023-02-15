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
exports.chooseSecretPath = exports.changeSecretLoop = exports.changeSecretValue = void 0;
const format_1 = require("./format");
const secretsManager = __importStar(require("../backends/fakeSecretsManager"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function chooseSecret(secretsConfig) {
    console.log(`Which one would you like to change?`);
    secretsConfig.secrets.forEach((secret) => console.log(` > ${secret}`));
    let secret = prompt('?> ');
    console.log(`Which env?`);
    secretsConfig.envs.forEach((env) => console.log(` > ${env}`));
    let env = prompt('?> ');
    return { secret, env };
}
function changeSecret(secretsConfig, secret, env) {
    let value = prompt('New value > ');
    changeSecretValue(secretsConfig, secret, env, value);
}
function setAnyValues(secretsConfig) {
    let guess = prompt('Would you like to change any secret values? (y/N): ');
    console.log('');
    if (guess == 'y') {
        const { secret, env } = chooseSecret(secretsConfig);
        changeSecret(secretsConfig, secret, env);
        return true;
    }
    else {
        return false;
    }
}
function changeSecretValue(secretsConfig, secret, env, value) {
    const secretPath = (0, format_1.renderSecretPath)(secretsConfig, secret, env);
    secretsManager.updateSecret(secretPath, value);
    console.log(`Setting secret \"${secretPath}\"... ✅`);
}
exports.changeSecretValue = changeSecretValue;
function changeSecretLoop(secretsConfig) {
    let changingSecrets = true;
    while (changingSecrets) {
        changingSecrets = setAnyValues(secretsConfig);
        console.log('');
    }
}
exports.changeSecretLoop = changeSecretLoop;
function chooseSecretPath() {
    let secret = prompt('What would you like to name your secret? ');
    return secret;
}
exports.chooseSecretPath = chooseSecretPath;
