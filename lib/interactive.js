"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const secretTool_1 = __importDefault(require("./secretTool"));
function interactive(filename) {
    const secretsConfig = secretTool_1.default.loadSecretsConfig(filename);
    secretTool_1.default.displayMeta(secretsConfig);
    secretTool_1.default.displayEnvs(secretsConfig);
    secretTool_1.default.checkAllEnvs(secretsConfig);
    secretTool_1.default.changeSecretLoop(secretsConfig);
    secretTool_1.default.createSecretLoop(secretsConfig);
}
module.exports = {
    interactive
};
