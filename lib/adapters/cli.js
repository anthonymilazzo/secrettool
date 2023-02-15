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
exports.setupCli = void 0;
const yargs_1 = __importDefault(require("yargs"));
const actions_1 = __importDefault(require("../actions"));
const interactive = __importStar(require("./interactive"));
function setupCli(filename) {
    const secretsConfig = actions_1.default.secretsConfig.loadSecretsConfig(filename);
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
        actions_1.default.create.createSecretEnvs(secretsConfig, name);
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
        actions_1.default.change.changeSecretValue(secretsConfig, name, env, value);
    })
        .command('print', 'Print out the secrets metadata (project name, envs, secrets)', function () {
        actions_1.default.print.displayMeta(secretsConfig);
        actions_1.default.print.displayEnvs(secretsConfig);
    })
        .command('lint', 'Checks if the secrets are configured correctly', function () {
        actions_1.default.check.checkAllEnvs(secretsConfig);
    })
        .command('interactive', 'Run interactively and prompt', function () {
        interactive.interactiveMode(secretsConfig);
    })
        .help().argv;
}
exports.setupCli = setupCli;
