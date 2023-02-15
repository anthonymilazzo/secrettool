import SecretsConfig from '../type'

export function renderSecretPath(
  secretsConfig: SecretsConfig,
  secretName: string,
  env: string
): string {
  return `/${env}/${secretsConfig.project}/${secretName}`
}
