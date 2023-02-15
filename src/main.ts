import config from './config'
import interactive from './interactive'
import cli from './cli'

function main(): void {
  try {
    console.log(`== secrettool.io ${config.version} [${config.filename}] ==\n`)

    if (config.mode == 'interactive') {
      interactive.interactive(config.filename)
    } else if (config.mode == 'cli') {
      cli.setupCli(config.filename)
    } else {
      console.error('Unsupported mode selected')
    }

    console.log(
      `Goodbye 👋 Please be sure to commit & push any changes to ${config.filename}`
    )
  } catch (e) {
    console.log(e)
  }
}

main()

module.exports = {}
