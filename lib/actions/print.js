"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayEnvs = exports.displayMeta = void 0;
const format_1 = require("./format");
function displaySecrets(secretsConfig, env) {
    console.log('Your configured 🤫 secrets:');
    secretsConfig.secrets.forEach((secret) => {
        const secretPath = (0, format_1.renderSecretPath)(secretsConfig, secret, env);
        console.log(` - ${secret} (${secretPath})`);
    });
    console.log('');
}
function displayMeta(secretsConfig) {
    console.log(`Project: ${secretsConfig.project}`);
    console.log(`Envs: ${secretsConfig.envs}`);
    console.log('');
}
exports.displayMeta = displayMeta;
function displayEnvs(secretsConfig) {
    secretsConfig.envs.forEach((env) => {
        console.log(`Env: ${env}`);
        displaySecrets(secretsConfig, env);
    });
    console.log('');
}
exports.displayEnvs = displayEnvs;
