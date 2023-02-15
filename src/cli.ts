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
    .help().argv;
}

export = {
  setupCli,
};
