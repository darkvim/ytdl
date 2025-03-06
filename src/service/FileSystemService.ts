import fs from 'fs/promises'
import path from 'path'

export async function createNewDirectory(directory: string): Promise<string> {
	const isDirectoryExists = await tryToAccessDirectoryOrFile(directory)
	if (isDirectoryExists) return ''
	else {
		await fs
			.mkdir(directory, { recursive: true })
			.then(() => console.log(`Директория создана ${directory}`))
			.catch(err => console.error('Ошибка при создании директории: ', err))
		return directory
	}
}

export const createDirectoryAndMovesDownloadedFiles = async (
	youtubeVideo: [string, string, string],
	pathToDirectory: string
) => {
	const outputPath = youtubeVideo[0]
	const videoMetadataJSONFile = youtubeVideo[1]
	const videoTitle = youtubeVideo[2]

	const newDirectory = await createNewDirectory(
		path.resolve(pathToDirectory, videoTitle)
	)
	await moveFilesToDirectory(newDirectory, [outputPath, videoMetadataJSONFile])
}

export const moveFilesToDirectory = async (
	directory: string,
	files: string[]
) => {
	try {
		console.log(
			'moveFilesToDirectory:\n',
			'directory -> ',
			directory,
			'files -> ',
			files
		)

		files.forEach(async file => {
			const fileName = path.basename(file)
			const newPath = path.join(directory, fileName)
			await fs.rename(file, newPath)
		})
	} catch (err) {
		console.error('[moveFileToDirectory] ERROR: ', err)
	}
}

export const tryToAccessDirectoryOrFile = async (
	directory: string
): Promise<boolean> => {
	try {
		await fs.access(directory)
		return true
	} catch {
		return false
	}
}

export const createUniqueMetadataJSONFile = async (
	output: string,
	fileName: string,
	metadata: any
): Promise<string> => {
	await fs.writeFile(
		path.resolve(output, `${fileName}.json`),
		JSON.stringify(metadata)
	)
	return path.resolve(output, `${fileName}.json`)
}
