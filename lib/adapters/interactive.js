"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveMode = void 0;
const actions_1 = __importDefault(require("../actions"));
function interactiveMode(secretsConfig) {
    actions_1.default.print.displayMeta(secretsConfig);
    actions_1.default.print.displayEnvs(secretsConfig);
    actions_1.default.check.checkAllEnvs(secretsConfig);
    actions_1.default.change.changeSecretLoop(secretsConfig);
    actions_1.default.create.createSecretLoop(secretsConfig);
}
exports.interactiveMode = interactiveMode;
