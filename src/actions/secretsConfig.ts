import yaml from 'js-yaml'
import fs from 'fs'
import SecretsConfig from '../type'

export function loadSecretsConfig(filename: string): SecretsConfig {
  const secretsConfig = yaml.load(
    fs.readFileSync(filename, 'utf8')
  ) as SecretsConfig
  return secretsConfig
}
