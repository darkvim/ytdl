import {
	insertIntoDirectoryDownloadedVideo,
	moveAllDownloadeFilesToRootDirectory,
} from './static/console/command/command.ts'
import { rl, showAllCommands } from './static/variables/variables.ts'

async function main(): Promise<void> {
	console.log(showAllCommands)

	for await (const line of rl) {
		const userCommand = line.trim()

		if (userCommand === 'exit') process.exit(0)
		if (userCommand === '-help') console.log(showAllCommands)

		if (userCommand.startsWith('-d'))
			await insertIntoDirectoryDownloadedVideo(userCommand)
		else await moveAllDownloadeFilesToRootDirectory(userCommand)
	}
}

await main()
