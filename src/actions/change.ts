import SecretsConfig from '../type'
import {renderSecretPath} from './format'
import * as secretsManager from '../backends/fakeSecretsManager'

import promptSync from 'prompt-sync'
const prompt = promptSync({sigint: true})

function chooseSecret(secretsConfig: SecretsConfig): {
  secret: string
  env: string
} {
  console.log(`Which one would you like to change?`)
  secretsConfig.secrets.forEach((secret: string) => console.log(` > ${secret}`))
  let secret = prompt('?> ')

  console.log(`Which env?`)
  secretsConfig.envs.forEach((env: string) => console.log(` > ${env}`))
  let env = prompt('?> ')
  return {secret, env}
}

function changeSecret(
  secretsConfig: SecretsConfig,
  secret: string,
  env: string
): void {
  let value = prompt('New value > ')
  changeSecretValue(secretsConfig, secret, env, value)
}

function setAnyValues(secretsConfig: SecretsConfig): boolean {
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

export function changeSecretValue(
  secretsConfig: SecretsConfig,
  secret: string,
  env: string,
  value: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret, env)
  secretsManager.updateSecret(secretPath, value)
  console.log(`Setting secret \"${secretPath}\"... ✅`)
}

export function changeSecretLoop(secretsConfig: SecretsConfig): void {
  let changingSecrets = true
  while (changingSecrets) {
    changingSecrets = setAnyValues(secretsConfig)
    console.log('')
  }
}

export function chooseSecretPath(): string {
  let secret = prompt('What would you like to name your secret? ')
  return secret
}
