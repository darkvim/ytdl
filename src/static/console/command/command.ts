import {
	createDirectoryAndMovesDownloadedFiles,
	createNewDirectory,
	tryToAccessDirectoryOrFile,
} from '../../../service/FileSystemService.ts'

import os from 'os'
import path from 'path'
import { downloadYouTubeVideo } from '../../../service/DownloadYoutubeVideo.ts'
import { pathToDirectory } from '../../variables/variables.ts'

export async function insertIntoDirectoryDownloadedVideo(userCommand: string) {
	const args = userCommand.slice(3).trim().split(' ')
	const dirname = args.shift()
	const url = args.join(' ')
	const downloadMetadataUserCommand = args.pop()
	let downloadMetadata = false

	if (downloadMetadataUserCommand?.toLowerCase() === '-dljson')
		downloadMetadata = true

	if (dirname && url) {
		const directoryPath = path.resolve(os.homedir(), 'desktop', dirname)
		const isDirectoryExists = await tryToAccessDirectoryOrFile(directoryPath)

		if (!isDirectoryExists) await createNewDirectory(directoryPath)
		await downloadYouTubeVideo(url, directoryPath, downloadMetadata)
	}
}

export async function moveAllDownloadedFilesToRootDirectory(
	userCommand: string
) {
	const args = userCommand.slice(3).trim().split(' ')
	const downloadMetadataUserCommand = args.pop()
	let downloadMetadata = false

	if (downloadMetadataUserCommand?.toLowerCase() === '-dljson')
		downloadMetadata = true

	const youtubeVideo = await downloadYouTubeVideo(
		userCommand,
		pathToDirectory,
		downloadMetadata
	)
	if (youtubeVideo) await createDirectoryAndMovesDownloadedFiles(youtubeVideo)
}
