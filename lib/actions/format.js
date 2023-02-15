"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderSecretPath = void 0;
function renderSecretPath(secretsConfig, secretName, env) {
    return `/${env}/${secretsConfig.project}/${secretName}`;
}
exports.renderSecretPath = renderSecretPath;
