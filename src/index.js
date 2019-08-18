import commander from 'commander'
import { version } from '../package.json'
import iconHandler from './lib/iconHandler.js'

const program = new commander.Command()

// Conver to Image for Chrome Extension
program
    .version(version)
    .command('icon')
    .option('-i, --icon-path <iconPath>', 'Image to Convert')
    .option('-o, --output-path [outputPath]', 'Change Output Directory')
    .action(iconHandler)

program.parse(process.argv)

if (!program.args.length) {
    program.outputHelp()
    process.exit(1)
}
