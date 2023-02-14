import yaml from "js-yaml";
import fs from "fs";
import promptSync from "prompt-sync";
import * as secretsManager from "./fakeSecretsManager";

const filename = "secrets.yaml";

const prompt = promptSync({ sigint: true });

function renderSecretPath(
  secretsConfig: { env: string; project: string; secrets: [string] },
  secretName: string
): string {
  return `/${secretsConfig.env}/${secretsConfig.project}/${secretName}`;
}

function loadSecretsConfig(filename: string): any {
  const secretsConfig = yaml.load(fs.readFileSync(filename, "utf8"));
  return secretsConfig;
}

function displayMeta(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): void {
  console.log(`Project: ${secretsConfig.project}`);
  console.log(`Env: ${secretsConfig.env}`);
  console.log("");
}

function displaySecrets(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): void {
  console.log("Your configured 🤫 secrets:");
  secretsConfig.secrets.forEach((secret: string) => {
    const secretPath = renderSecretPath(secretsConfig, secret);
    console.log(` - ${secret} (${secretPath})`);
  });
  console.log("");
}

function secretExists(
  secretsConfig: { env: string; project: string; secrets: [string] },
  secret: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret);
  const exists = secretsManager.getSecret(secretPath);
  if (exists) {
    console.log(` >>> Checking if \"${secretPath}\" exists... ✅`);
  } else {
    console.log(` >>> Checking if \"${secretPath}\" exists... X`);
  }
}

function hasAccess(
  secretsConfig: { env: string; project: string; secrets: [string] },
  secret: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret);
  console.log(` >>> Checking if you have access to \"${secretPath}\"... ✅`);
}

function checkAllSecrets(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): void {
  secretsConfig.secrets.forEach((secret: string) => {
    console.log(` > Checking secret \"${secret}\"...`);
    secretExists(secretsConfig, secret);
    hasAccess(secretsConfig, secret);
    console.log(`Secret \"${secret}\" is ready for use 🚀
`);
  });
}

function chooseSecret(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): string {
  console.log(`Which one would you like to change?`);
  secretsConfig.secrets.forEach((secret: string) =>
    console.log(` > ${secret}`)
  );
  let secret = prompt("?> ");
  return secret;
}

function changeSecret(
  secretsConfig: { env: string; project: string; secrets: [string] },
  secret: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret);
  let value = prompt("New value > ");
  secretsManager.updateSecret(secretPath, value);
  console.log(`Setting secret \"${secretPath}\"... ✅`);
}

function changeSecretLoop(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): void {
  let changingSecrets = true;
  while (changingSecrets) {
    changingSecrets = setAnyValues(secretsConfig);
    console.log("");
  }
}

function setAnyValues(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): boolean {
  let guess = prompt("Would you like to change any secret values? (y/N): ");
  console.log("");
  if (guess == "y") {
    const secret = chooseSecret(secretsConfig);
    changeSecret(secretsConfig, secret);
    return true;
  } else {
    return false;
  }
}

function chooseSecretPath(): string {
  let secret = prompt("What would you like to name your secret? ");
  return secret;
}

function createSecret(
  secretsConfig: { env: string; project: string; secrets: [string] },
  secret: string
): void {
  let value = prompt("Value > ");
  const secretPath = renderSecretPath(secretsConfig, secret);
  secretsManager.createSecret(secretPath, value);
  console.log(`Creating secret \"${secret}\"... ✅`);
}

function createSecretLoop(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): void {
  let creatingSecrets = true;
  while (creatingSecrets) {
    creatingSecrets = createAnySecrets(secretsConfig);
    console.log("");
  }
}

function createAnySecrets(secretsConfig: {
  env: string;
  project: string;
  secrets: [string];
}): boolean {
  let guess = prompt("Would you like to create any new secrets? (y/N): ");
  console.log("");
  if (guess == "y") {
    let secret = chooseSecretPath();
    createSecret(secretsConfig, secret);
    return true;
  } else {
    return false;
  }
}

function main(): void {
  try {
    console.log("== secrettool.io v1.0.0 [secrets.yaml] ==\n");

    const secretsConfig: { env: string; project: string; secrets: [string] } =
      loadSecretsConfig(filename);

    displayMeta(secretsConfig);

    displaySecrets(secretsConfig);

    checkAllSecrets(secretsConfig);

    changeSecretLoop(secretsConfig);

    createSecretLoop(secretsConfig);

    console.log(
      "Goodbye 👋 Please be sure to commit & push any changes to secrets.yaml"
    );
  } catch (e) {
    console.log(e);
  }
}

main();

module.exports = {};
