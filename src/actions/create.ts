import SecretsConfig from '../type'
import {renderSecretPath} from './format'
import * as secretsManager from '../backends/fakeSecretsManager'

import promptSync from 'prompt-sync'
const prompt = promptSync({sigint: true})

function createSecret(
  secretsConfig: SecretsConfig,
  secret: string,
  env: string
): void {
  const secretPath = renderSecretPath(secretsConfig, secret, env)
  let value = prompt(`Value for \"${secret}\" in \"${env}\" > `)
  secretsManager.createSecret(secretPath, value)
  console.log(`Creating secret \"${secret}\"... ✅`)
}

function chooseSecretPath(): string {
  let secret = prompt('What would you like to name your secret? ')
  return secret
}

function createAnySecrets(secretsConfig: SecretsConfig): boolean {
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

export function createSecretLoop(secretsConfig: SecretsConfig): void {
  let creatingSecrets = true
  while (creatingSecrets) {
    creatingSecrets = createAnySecrets(secretsConfig)
    console.log('')
  }
}

export function createSecretEnvs(
  secretsConfig: SecretsConfig,
  secret: string
): void {
  secretsConfig.envs.forEach((env: string) => {
    createSecret(secretsConfig, secret, env)
  })
}
