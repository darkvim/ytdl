import {
	insertIntoDirectoryDownloadedVideo,
	moveAllDownloadedFilesToRootDirectory,
} from './static/console/command/command.ts'
import { rl, showAllCommands } from './static/variables/variables.ts'
import process from 'process'

async function main(): Promise<void> {
	console.log(showAllCommands)

	for await (const line of rl) {
		const userCommand = line.trim()

		if (userCommand === 'exit') process.exit(0)
		if (userCommand === 'help') {
			console.log(showAllCommands)
			continue
		}

		if (userCommand.startsWith('-d'))
			await insertIntoDirectoryDownloadedVideo(userCommand)
		else await moveAllDownloadedFilesToRootDirectory(userCommand)
	}
}

await main()
