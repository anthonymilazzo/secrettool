import config from './config'
import * as cli from './adapters/cli'

function main(): void {
  try {
    console.log(`== secrettool.io ${config.version} [${config.filename}] ==\n`)

    cli.setupCli(config.filename)

    console.log(
      `Goodbye 👋 Please be sure to commit & push any changes to ${config.filename}`
    )
  } catch (e) {
    console.log(e)
  }
}

main()

module.exports = {}
