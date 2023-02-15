"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const interactive_1 = __importDefault(require("./interactive"));
const cli_1 = __importDefault(require("./cli"));
function main() {
    try {
        console.log(`== secrettool.io v1.0.0 [${config_1.default.filename}] ==\n`);
        if (config_1.default.mode == "interactive") {
            interactive_1.default.interactive(config_1.default.filename);
        }
        else if (config_1.default.mode == "cli") {
            cli_1.default.setupCli(config_1.default.filename);
        }
        else {
            console.error("Unsupported mode selected");
        }
        console.log(`Goodbye 👋 Please be sure to commit & push any changes to ${config_1.default.filename}`);
    }
    catch (e) {
        console.log(e);
    }
}
main();
module.exports = {};
