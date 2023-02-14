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
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const secretsManager = __importStar(require("./fakeSecretsManager"));
const filename = "secrets.yaml";
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function renderSecretPath(secretsConfig, secretName) {
    return `/${secretsConfig.env}/${secretsConfig.project}/${secretName}`;
}
function loadSecretsConfig(filename) {
    const secretsConfig = js_yaml_1.default.load(fs_1.default.readFileSync(filename, "utf8"));
    return secretsConfig;
}
function displayMeta(secretsConfig) {
    console.log(`Project: ${secretsConfig.project}`);
    console.log(`Env: ${secretsConfig.env}`);
    console.log("");
}
function displaySecrets(secretsConfig) {
    console.log("Your configured 🤫 secrets:");
    secretsConfig.secrets.forEach((secret) => {
        const secretPath = renderSecretPath(secretsConfig, secret);
        console.log(` - ${secret} (${secretPath})`);
    });
    console.log("");
}
function secretExists(secretsConfig, secret) {
    const secretPath = renderSecretPath(secretsConfig, secret);
    const exists = secretsManager.getSecret(secretPath);
    if (exists) {
        console.log(` >>> Checking if \"${secretPath}\" exists... ✅`);
    }
    else {
        console.log(` >>> Checking if \"${secretPath}\" exists... X`);
    }
}
function hasAccess(secretsConfig, secret) {
    const secretPath = renderSecretPath(secretsConfig, secret);
    console.log(` >>> Checking if you have access to \"${secretPath}\"... ✅`);
}
function checkAllSecrets(secretsConfig) {
    secretsConfig.secrets.forEach((secret) => {
        console.log(` > Checking secret \"${secret}\"...`);
        secretExists(secretsConfig, secret);
        hasAccess(secretsConfig, secret);
        console.log(`Secret \"${secret}\" is ready for use 🚀
`);
    });
}
function chooseSecret(secretsConfig) {
    console.log(`Which one would you like to change?`);
    secretsConfig.secrets.forEach((secret) => console.log(` > ${secret}`));
    let secret = prompt("?> ");
    return secret;
}
function changeSecret(secretsConfig, secret) {
    const secretPath = renderSecretPath(secretsConfig, secret);
    let value = prompt("New value > ");
    secretsManager.updateSecret(secretPath, value);
    console.log(`Setting secret \"${secretPath}\"... ✅`);
}
function changeSecretLoop(secretsConfig) {
    let changingSecrets = true;
    while (changingSecrets) {
        changingSecrets = setAnyValues(secretsConfig);
        console.log("");
    }
}
function setAnyValues(secretsConfig) {
    let guess = prompt("Would you like to change any secret values? (y/N): ");
    console.log("");
    if (guess == "y") {
        const secret = chooseSecret(secretsConfig);
        changeSecret(secretsConfig, secret);
        return true;
    }
    else {
        return false;
    }
}
function chooseSecretPath() {
    let secret = prompt("What would you like to name your secret? ");
    return secret;
}
function createSecret(secretsConfig, secret) {
    let value = prompt("Value > ");
    const secretPath = renderSecretPath(secretsConfig, secret);
    secretsManager.createSecret(secretPath, value);
    console.log(`Creating secret \"${secret}\"... ✅`);
}
function createSecretLoop(secretsConfig) {
    let creatingSecrets = true;
    while (creatingSecrets) {
        creatingSecrets = createAnySecrets(secretsConfig);
        console.log("");
    }
}
function createAnySecrets(secretsConfig) {
    let guess = prompt("Would you like to create any new secrets? (y/N): ");
    console.log("");
    if (guess == "y") {
        let secret = chooseSecretPath();
        createSecret(secretsConfig, secret);
        return true;
    }
    else {
        return false;
    }
}
function main() {
    try {
        console.log("== secrettool.io v1.0.0 [secrets.yaml] ==\n");
        const secretsConfig = loadSecretsConfig(filename);
        displayMeta(secretsConfig);
        displaySecrets(secretsConfig);
        checkAllSecrets(secretsConfig);
        changeSecretLoop(secretsConfig);
        createSecretLoop(secretsConfig);
        console.log("Goodbye 👋 Please be sure to commit & push any changes to secrets.yaml");
    }
    catch (e) {
        console.log(e);
    }
}
main();
module.exports = {};
