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
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const secretsManager = __importStar(require("./fakeSecretsManager"));
const prompt = (0, prompt_sync_1.default)({ sigint: true });
function renderSecretPath(secretsConfig, secretName, env) {
    return `/${env}/${secretsConfig.project}/${secretName}`;
}
function loadSecretsConfig(filename) {
    const secretsConfig = js_yaml_1.default.load(fs_1.default.readFileSync(filename, "utf8"));
    return secretsConfig;
}
function displayMeta(secretsConfig) {
    console.log(`Project: ${secretsConfig.project}`);
    console.log(`Envs: ${secretsConfig.envs}`);
    console.log("");
}
function displaySecrets(secretsConfig, env) {
    console.log("Your configured 🤫 secrets:");
    secretsConfig.secrets.forEach((secret) => {
        const secretPath = renderSecretPath(secretsConfig, secret, env);
        console.log(` - ${secret} (${secretPath})`);
    });
    console.log("");
}
function displayEnvs(secretsConfig) {
    secretsConfig.envs.forEach((env) => {
        console.log(`Env: ${env}`);
        displaySecrets(secretsConfig, env);
    });
    console.log("");
}
function secretExists(secretsConfig, secret, env) {
    const secretPath = renderSecretPath(secretsConfig, secret, env);
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
function checkAllSecrets(secretsConfig, env) {
    secretsConfig.secrets.forEach((secret) => {
        console.log(` > Checking secret \"${secret}\" in \"${env}\"...`);
        secretExists(secretsConfig, secret, env);
        hasAccess(secretsConfig, secret, env);
        console.log(`Secret \"${secret}\" in \"${env}\" is ready for use 🚀
`);
    });
}
function chooseSecret(secretsConfig) {
    console.log(`Which one would you like to change?`);
    secretsConfig.secrets.forEach((secret) => console.log(` > ${secret}`));
    let secret = prompt("?> ");
    console.log(`Which env?`);
    secretsConfig.envs.forEach((env) => console.log(` > ${env}`));
    let env = prompt("?> ");
    return { secret, env };
}
function changeSecret(secretsConfig, secret, env) {
    const secretPath = renderSecretPath(secretsConfig, secret, env);
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
        const { secret, env } = chooseSecret(secretsConfig);
        changeSecret(secretsConfig, secret, env);
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
function createSecretEnvs(secretsConfig, secret) {
    secretsConfig.envs.forEach((env) => {
        createSecret(secretsConfig, secret, env);
    });
}
function createSecret(secretsConfig, secret, env) {
    const secretPath = renderSecretPath(secretsConfig, secret, env);
    let value = prompt(`Value for \"${secret}\" in \"${env}\" > `);
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
        createSecretEnvs(secretsConfig, secret);
        return true;
    }
    else {
        return false;
    }
}
module.exports = {
    renderSecretPath,
    loadSecretsConfig,
    displayMeta,
    displaySecrets,
    displayEnvs,
    secretExists,
    hasAccess,
    checkAllEnvs,
    checkAllSecrets,
    chooseSecret,
    changeSecret,
    changeSecretLoop,
    setAnyValues,
    chooseSecretPath,
    createSecretEnvs,
    createSecret,
    createSecretLoop,
    createAnySecrets,
};
