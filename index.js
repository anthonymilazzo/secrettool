const yaml = require('js-yaml');
const fs   = require('fs');
const promptSync = require('prompt-sync');
const secretsManager = require('./fakeSecretsManager');

filename = 'secrets.yaml'

const prompt = promptSync({sigint: true});

function renderSecretPath(secretsConfig, secretName) {
  return `/${secretsConfig.env}/${secretsConfig.project}/${secretName}`
}

function loadSecretsConfig(filename) {
  const secretsConfig = yaml.load(fs.readFileSync(filename, 'utf8'));
  return secretsConfig
}

function displayMeta(secretsConfig) {
  console.log(`Project: ${secretsConfig.project}`)
  console.log(`Env: ${secretsConfig.env}`)
  console.log('')
}

function displaySecrets(secretsConfig) {
  console.log("Your configured 🤫 secrets:");
  secretsConfig.secrets.forEach(secret => {
    const secretPath = renderSecretPath(secretsConfig, secret);
    console.log(` - ${secret} (${secretPath})`)
  });
  console.log('')
}

function secretExists(secretsConfig, secret) {
  const secretPath = renderSecretPath(secretsConfig, secret);
  const exists = secretsManager.getSecret(secretPath)
  console.log(` >>> Checking if \"${secretPath}\" exists... ✅`);
}

function hasAccess(secretsConfig, secret) {
  const secretPath = renderSecretPath(secretsConfig, secret);
  console.log(` >>> Checking if you have access to \"${secretPath}\"... ✅`);
}

function checkAllSecrets(secretsConfig) {
  secretsConfig.secrets.forEach(secret => {
    console.log(` > Checking secret \"${secret}\"...`);
    secretExists(secretsConfig, secret);
    hasAccess(secretsConfig, secret);
    console.log(`Secret \"${secret}\" is ready for use 🚀
`);
  });
}

function chooseSecret(secretsConfig) {
  console.log(`Which one would you like to change?`)
  secretsConfig.secrets.forEach(secret => console.log(` > ${secret}`));
  let secret = prompt('?> ')
  return secret
}

function changeSecret(secretsConfig, secret) {
  const secretPath = renderSecretPath(secretsConfig, secret);
  let value = prompt('New value > ');
  secretsManager.updateSecret(secretPath, value)
  console.log(`Setting secret \"${secretPath}\"... ✅`);
}

function changeSecretLoop(secretsConfig) {
  changingSecrets = true;
  while (changingSecrets) {
    changingSecrets = setAnyValues(secretsConfig);
    console.log('');
  }
}

function setAnyValues(secretsConfig) {
  let guess = prompt("Would you like to change any secret values? (y/N): ");
  console.log("");
  if (guess == 'y') {
    secret = chooseSecret(secretsConfig);
    changeSecret(secretsConfig, secret);
    return true
  } else {
    return false
  }
}

function chooseSecretPath() {
  let secret = prompt('What would you like to name your secret? ')
  return secret
}

function createSecret(secretsConfig, secret) {
  let value = prompt('Value > ');
  const secretPath = renderSecretPath(secretsConfig, secret);
  secretsManager.createSecret(secretPath, value)
  console.log(`Creating secret \"${secret}\"... ✅`);
}

function createSecretLoop(secretsConfig) {
  creatingSecrets = true;
  while (creatingSecrets) {
    creatingSecrets = createAnySecrets(secretsConfig);
    console.log('');
  }
}

function createAnySecrets(secretsConfig) {
  let guess = prompt("Would you like to create any new secrets? (y/N): ");
  console.log("");
  if (guess == 'y') {
    secret = chooseSecretPath(secretsConfig);
    createSecret(secret);
    return true
  } else {
    return false
  }
}

function main() {
  try {
    console.log("== secrettool.io v1.0.0 [secrets.yaml] ==\n")

    const secretsConfig = loadSecretsConfig(filename)

    displayMeta(secretsConfig);

    displaySecrets(secretsConfig);
    
    checkAllSecrets(secretsConfig);

    changeSecretLoop(secretsConfig);

    createSecretLoop(secretsConfig);

    console.log('Goodbye 👋 Please be sure to commit & push any changes to secrets.yaml');
  } catch (e) {
    console.log(e);
  }
}

main()

module.exports = {}