"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const yargs_1 = __importDefault(require("yargs"));
const secretTool_1 = __importDefault(require("./secretTool"));
function setupCli(filename) {
    const secretsConfig = secretTool_1.default.loadSecretsConfig(filename);
    yargs_1.default
        .scriptName("secrettool")
        .usage("$0 <cmd> [args]")
        .command("create [name]", "Create a secret", (yargs) => {
        yargs.positional("name", {
            type: "string",
            describe: "the name of the secret",
        });
    }, function (argv) {
        const name = argv.name;
        secretTool_1.default.createSecretEnvs(secretsConfig, name);
    })
        .help().argv;
}
module.exports = {
    setupCli,
};
