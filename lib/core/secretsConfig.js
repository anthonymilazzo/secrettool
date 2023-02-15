"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSecretsConfig = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importDefault(require("fs"));
function loadSecretsConfig(filename) {
    const secretsConfig = js_yaml_1.default.load(fs_1.default.readFileSync(filename, 'utf8'));
    return secretsConfig;
}
exports.loadSecretsConfig = loadSecretsConfig;
