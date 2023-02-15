import yargs from "yargs";
import secretTool from "./secretTool";

function setupCli(filename: string): void {
  const secretsConfig = secretTool.loadSecretsConfig(filename);

  yargs
    .scriptName("secrettool")
    .usage("$0 <cmd> [args]")
    .command(
      "create [name]",
      "Create a secret",
      (yargs) => {
        yargs.positional("name", {
          type: "string",
          describe: "the name of the secret",
        });
      },
      function (argv) {
        const name: string = argv.name as string;
        secretTool.createSecretEnvs(secretsConfig, name);
      }
    )
    .command(
      "change [name] [env] [value]",
      "Modify a secret value",
      (yargs) => {
        yargs.positional("name", {
          type: "string",
          describe: "the name of the secret",
        });
        yargs.positional("env", {
          type: "string",
          describe: "the env of the secret",
        });
        yargs.positional("value", {
          type: "string",
          describe: "the value of the secret",
        });
      },
      function (argv) {
        const name: string = argv.name as string;
        const env: string = argv.env as string;
        const value: string = argv.value as string;
        secretTool.changeSecretValue(secretsConfig, name, env, value);
      }
    )
    .command(
      "print",
      "Print out the secrets metadata (project name, envs, secrets)",
      function () {
        secretTool.displayMeta(secretsConfig);
        secretTool.displayEnvs(secretsConfig);
      }
    )
    .command(
      "lint",
      "Checks if the secrets are configured correctly",
      function () {
        secretTool.checkAllEnvs(secretsConfig);
      }
    )
    .help().argv;
}

export = {
  setupCli,
};
