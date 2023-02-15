import core from '../actions'
import SecretsConfig from '../type'

export function interactiveMode(secretsConfig: SecretsConfig): void {
  core.print.displayMeta(secretsConfig)

  core.print.displayEnvs(secretsConfig)

  core.check.checkAllEnvs(secretsConfig)

  core.change.changeSecretLoop(secretsConfig)

  core.create.createSecretLoop(secretsConfig)
}
