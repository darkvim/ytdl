import { spawn } from 'child_process'
import { createUniqueMetadataJSONFile } from './FileSystemService.ts'

export async function downloadYouTubeVideo(
	videoUrl: string,
	outputDir: string
): Promise<[string, string, string] | undefined> {
	const youtubeVideoMetadata = await getYouTubeVideoMetadata(videoUrl)
	if (youtubeVideoMetadata) {
		const youtubeVideoTitle = youtubeVideoMetadata.title

		const uniqueMetadataJSONFile = await createUniqueMetadataJSONFile(
			outputDir,
			youtubeVideoTitle,
			youtubeVideoMetadata
		)

		const outputPath = await downloadProcess(
			outputDir,
			videoUrl,
			youtubeVideoMetadata
		)

		return [outputPath, uniqueMetadataJSONFile, youtubeVideoTitle]
	} else return
}

const downloadProcess = async (
	outputDir: string,
	videoUrl: string,
	youtubeVideoMetadata: any
): Promise<string> => {
	const outputPath = `${outputDir}/${youtubeVideoMetadata.title}.webm`
	const ytDlpProcess = spawn('yt-dlp', ['-o', outputPath, videoUrl])

	ytDlpProcess.stdout.on('data', data => console.log(`📥 Загрузка: ${data}`))
	ytDlpProcess.stderr.on('data', data => console.error(`⚠️ Ошибка: ${data}`))

	await new Promise<void>((resolve, reject) => {
		ytDlpProcess.on('close', code => {
			if (code === 0) {
				console.log(`✅ Видео сохранено в ${outputPath}`)
				console.log('Можно отправлять новую ссылку ^_^')
				resolve()
			} else reject(`❌ yt-dlp завершился с кодом ${code}`)
		})
	})

	return outputPath
}

export async function getYouTubeVideoMetadata(
	videoUrl: string
): Promise<any | null> {
	const ytDlpProcess = spawn('yt-dlp', ['--dump-json', videoUrl])
	let jsonData = ''

	ytDlpProcess.stdout.on('data', data => (jsonData += data.toString()))

	return new Promise<any>((resolve, reject) => {
		ytDlpProcess.on('close', code => {
			if (code === 0) {
				const metadata = parseMetadataToJSON(jsonData)
				if (metadata) resolve(metadata)
				else reject('Ошибка парсинга метаданных')
			} else reject(`❌ yt-dlp завершился с кодом ${code}`)
		})
	})
}

const parseMetadataToJSON = (jsonData: string): any => {
	try {
		return JSON.parse(jsonData)
	} catch (error) {
		console.error('❌ Ошибка парсинга JSON:', error)
	}
}
