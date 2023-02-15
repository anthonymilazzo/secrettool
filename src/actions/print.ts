import SecretsConfig from '../type'
import {renderSecretPath} from './format'

function displaySecrets(secretsConfig: SecretsConfig, env: string): void {
  console.log('Your configured 🤫 secrets:')
  secretsConfig.secrets.forEach((secret: string) => {
    const secretPath = renderSecretPath(secretsConfig, secret, env)
    console.log(` - ${secret} (${secretPath})`)
  })
  console.log('')
}

export function displayMeta(secretsConfig: SecretsConfig): void {
  console.log(`Project: ${secretsConfig.project}`)
  console.log(`Envs: ${secretsConfig.envs}`)
  console.log('')
}

export function displayEnvs(secretsConfig: SecretsConfig): void {
  secretsConfig.envs.forEach((env: string) => {
    console.log(`Env: ${env}`)
    displaySecrets(secretsConfig, env)
  })
  console.log('')
}
