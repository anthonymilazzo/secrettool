"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const yargs_1 = __importDefault(require("yargs"));
const secretTool_1 = __importDefault(require("./secretTool"));
function setupCli(filename) {
    const secretsConfig = secretTool_1.default.loadSecretsConfig(filename);
    yargs_1.default
        .scriptName('secrettool')
        .usage('$0 <cmd> [args]')
        .command('create [name]', 'Create a secret', yargs => {
        yargs.positional('name', {
            type: 'string',
            describe: 'the name of the secret'
        });
    }, function (argv) {
        const name = argv.name;
        secretTool_1.default.createSecretEnvs(secretsConfig, name);
    })
        .command('change [name] [env] [value]', 'Modify a secret value', yargs => {
        yargs.positional('name', {
            type: 'string',
            describe: 'the name of the secret'
        });
        yargs.positional('env', {
            type: 'string',
            describe: 'the env of the secret'
        });
        yargs.positional('value', {
            type: 'string',
            describe: 'the value of the secret'
        });
    }, function (argv) {
        const name = argv.name;
        const env = argv.env;
        const value = argv.value;
        secretTool_1.default.changeSecretValue(secretsConfig, name, env, value);
    })
        .command('print', 'Print out the secrets metadata (project name, envs, secrets)', function () {
        secretTool_1.default.displayMeta(secretsConfig);
        secretTool_1.default.displayEnvs(secretsConfig);
    })
        .command('lint', 'Checks if the secrets are configured correctly', function () {
        secretTool_1.default.checkAllEnvs(secretsConfig);
    })
        .help().argv;
}
module.exports = {
    setupCli
};
