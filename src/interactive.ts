import secretTool from './secretTool'

function interactive(filename: string): void {
  const secretsConfig = secretTool.loadSecretsConfig(filename)

  secretTool.displayMeta(secretsConfig)

  secretTool.displayEnvs(secretsConfig)

  secretTool.checkAllEnvs(secretsConfig)

  secretTool.changeSecretLoop(secretsConfig)

  secretTool.createSecretLoop(secretsConfig)
}

export = {
  interactive
}
