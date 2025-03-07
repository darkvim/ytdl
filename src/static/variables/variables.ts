import path from 'path'
import os from 'os'

import readline from 'readline'

export const projectRoot = path.resolve(
	os.homedir(),
	'desktop',
	'DownloadYoutubeVideo'
)

export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

export const pathToDirectory = path.resolve(
	os.homedir(),
	'desktop',
	'MyYouTubeDownloads'
)

export const showAllCommands = `
	Доступные команды:
	- [Youtube URL]				 - Скачать ютуб-видео
	- -d {dirname} [Youtube URL]  		 - Куда переместить видео
	- -help       			         - Показать меню помощи
	- -exit					 - Завершить программу
	- -dljson				 - Скачать метаданные в JSON формате
	`
