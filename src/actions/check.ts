import SecretsConfig from '../type'
import {renderSecretPath} from './format'
import * as secretsManager from '../backends/fakeSecretsManager'

function secretExists(
  secretsConfig: SecretsConfig,
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
  secretsConfig: SecretsConfig,
  secret: string,
  env: string
): void {
  console.log(
    ` >>> Checking if you have access to \"${secret}\" in \"${env}\"... ✅`
  )
}

export function checkAllEnvs(secretsConfig: SecretsConfig): void {
  secretsConfig.envs.forEach((env: string) => {
    checkAllSecrets(secretsConfig, env)
  })
}

function checkAllSecrets(secretsConfig: SecretsConfig, env: string): void {
  secretsConfig.secrets.forEach((secret: string) => {
    console.log(` > Checking secret \"${secret}\" in \"${env}\"...`)
    secretExists(secretsConfig, secret, env)
    hasAccess(secretsConfig, secret, env)
    console.log(`Secret \"${secret}\" in \"${env}\" is ready for use 🚀
`)
  })
}
