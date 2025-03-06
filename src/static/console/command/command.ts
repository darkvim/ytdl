import {
	createDirectoryAndMovesDownloadedFiles,
	createNewDirectory,
} from '../../../service/FileSystemService.ts'

import os from 'os'
import path from 'path'
import { downloadYouTubeVideo } from '../../../service/DownloadYoutubeVideo.ts'
import { pathToDirectory } from '../../variables/variables.ts'

export async function insertIntoDirectoryDownloadedVideo(userCommand: string) {
	const args = userCommand.slice(3).trim().split(' ')
	const dirname = args.shift()
	const url = args.join(' ')
	if (dirname && url) {
		const directory = await createNewDirectory(
			path.resolve(os.homedir(), 'desktop', dirname)
		)
		await downloadYouTubeVideo(url, directory)
	}
}

export async function moveAllDownloadeFilesToRootDirectory(
	userCommand: string
) {
	const youtubeVideo = await downloadYouTubeVideo(userCommand, pathToDirectory)
	if (youtubeVideo)
		await createDirectoryAndMovesDownloadedFiles(youtubeVideo, pathToDirectory)
}
