import yaml from 'js-yaml'
import fs from 'fs'
import promptSync from 'prompt-sync'
import * as secretsManager from './fakeSecretsManager'

const prompt = promptSync({sigint: true})

function renderSecretPath(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secretName: string,
  env: string
): string {
  return `/${env}/${secretsConfig.project}/${secretName}`
}

function loadSecretsConfig(filename: string): any {
  const secretsConfig = yaml.load(fs.readFileSync(filename, 'utf8'))
  return secretsConfig
}

function displayMeta(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): void {
  console.log(`Project: ${secretsConfig.project}`)
  console.log(`Envs: ${secretsConfig.envs}`)
  console.log('')
}

function displaySecrets(
  secretsConfig: {
    envs: [string]
    project: string
    secrets: [string]
  },
  env: string
): void {
  console.log('Your configured 🤫 secrets:')
  secretsConfig.secrets.forEach((secret: string) => {
    const secretPath = renderSecretPath(secretsConfig, secret, env)
    console.log(` - ${secret} (${secretPath})`)
  })
  console.log('')
}

function displayEnvs(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): void {
  secretsConfig.envs.forEach((env: string) => {
    console.log(`Env: ${env}`)
    displaySecrets(secretsConfig, env)
  })
  console.log('')
}

function secretExists(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secret: string,
  env: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret, env)
  const exists = secretsManager.getSecret(secretPath)
  if (exists) {
    console.log(` >>> Checking if \"${secret}\" exists in \"${env}\"... ✅`)
  } else {
    console.log(` >>> Checking if \"${secret}\" exists in \"${env}\"... X`)
  }
}

function hasAccess(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secret: string,
  env: string
): void {
  console.log(
    ` >>> Checking if you have access to \"${secret}\" in \"${env}\"... ✅`
  )
}

function checkAllEnvs(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): void {
  secretsConfig.envs.forEach((env: string) => {
    checkAllSecrets(secretsConfig, env)
  })
}

function checkAllSecrets(
  secretsConfig: {
    envs: [string]
    project: string
    secrets: [string]
  },
  env: string
): void {
  secretsConfig.secrets.forEach((secret: string) => {
    console.log(` > Checking secret \"${secret}\" in \"${env}\"...`)
    secretExists(secretsConfig, secret, env)
    hasAccess(secretsConfig, secret, env)
    console.log(`Secret \"${secret}\" in \"${env}\" is ready for use 🚀
`)
  })
}

function chooseSecret(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): {secret: string; env: string} {
  console.log(`Which one would you like to change?`)
  secretsConfig.secrets.forEach((secret: string) => console.log(` > ${secret}`))
  let secret = prompt('?> ')

  console.log(`Which env?`)
  secretsConfig.envs.forEach((env: string) => console.log(` > ${env}`))
  let env = prompt('?> ')
  return {secret, env}
}

function changeSecret(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secret: string,
  env: string
): void {
  let value = prompt('New value > ')
  changeSecretValue(secretsConfig, secret, env, value)
}

function changeSecretValue(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secret: string,
  env: string,
  value: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret, env)
  secretsManager.updateSecret(secretPath, value)
  console.log(`Setting secret \"${secretPath}\"... ✅`)
}

function changeSecretLoop(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): void {
  let changingSecrets = true
  while (changingSecrets) {
    changingSecrets = setAnyValues(secretsConfig)
    console.log('')
  }
}

function setAnyValues(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): boolean {
  let guess = prompt('Would you like to change any secret values? (y/N): ')
  console.log('')
  if (guess == 'y') {
    const {secret, env} = chooseSecret(secretsConfig)
    changeSecret(secretsConfig, secret, env)
    return true
  } else {
    return false
  }
}

function chooseSecretPath(): string {
  let secret = prompt('What would you like to name your secret? ')
  return secret
}

function createSecretEnvs(
  secretsConfig: {
    envs: [string]
    project: string
    secrets: [string]
  },
  secret: string
): void {
  secretsConfig.envs.forEach((env: string) => {
    createSecret(secretsConfig, secret, env)
  })
}

function createSecret(
  secretsConfig: {envs: [string]; project: string; secrets: [string]},
  secret: string,
  env: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret, env)
  let value = prompt(`Value for \"${secret}\" in \"${env}\" > `)
  secretsManager.createSecret(secretPath, value)
  console.log(`Creating secret \"${secret}\"... ✅`)
}

function createSecretLoop(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): void {
  let creatingSecrets = true
  while (creatingSecrets) {
    creatingSecrets = createAnySecrets(secretsConfig)
    console.log('')
  }
}

function createAnySecrets(secretsConfig: {
  envs: [string]
  project: string
  secrets: [string]
}): boolean {
  let guess = prompt('Would you like to create any new secrets? (y/N): ')
  console.log('')
  if (guess == 'y') {
    let secret = chooseSecretPath()
    createSecretEnvs(secretsConfig, secret)
    return true
  } else {
    return false
  }
}

export = {
  renderSecretPath,
  loadSecretsConfig,
  displayMeta,
  displaySecrets,
  displayEnvs,
  secretExists,
  hasAccess,
  checkAllEnvs,
  checkAllSecrets,
  chooseSecret,
  changeSecret,
  changeSecretValue,
  changeSecretLoop,
  setAnyValues,
  chooseSecretPath,
  createSecretEnvs,
  createSecret,
  createSecretLoop,
  createAnySecrets
}
