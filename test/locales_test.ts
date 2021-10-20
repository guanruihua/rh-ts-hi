// const { utils, apiServer } = require('../lib')
// console.log(apiServer())
// const { locales } = require('../lib')
// console.log(locales)
// console.log(require('../lib'))

const configList: any[] = [
	{
		xlsxTolocales_entryPath: './test/mutilLang.xlsx',
		xlsxTolocales_selectSheet: 1,
		xlsxTolocales_outputPath: './test/locales/messageTemplate/',
		localesToXlsx_entryPath: './test/locales/messageTemplate/',
		localesToXlsx_outputPath: './test/locales/messageTemplate/locales.xlsx',
		// toJs: true,
		toXlsx: true,
	},
	{
		xlsxTolocales_entryPath: './test/mutilLang.xlsx',
		// xlsxTolocales_entryPath: './locales/recallClass/locales.xlsx',
		xlsxTolocales_selectSheet: 0,
		xlsxTolocales_outputPath: './test/locales/recallClass/',
		localesToXlsx_entryPath: './test/locales/recallClass/',
		localesToXlsx_outputPath: './test/locales/recallClass/locales.xlsx',
		// toJs: true,
		toXlsx: true,
	},
]

function run(): void {
	const { BaseConfig, readXlsxtToWriteFile, readlocalesToXlsx, mkdirs } = require('../lib').locales

	new Promise((resolve: (val: any) => void): void => {
		const configs: any[] = []
		configList.forEach((item: any) => {
			const {
				toJs = false, toXlsx = false,
				// xlsx => js
				xlsxTolocales_entryPath,
				xlsxTolocales_selectSheet,
				xlsxTolocales_outputPath,
				// js => xlsx
				localesToXlsx_entryPath,
				localesToXlsx_outputPath,
			} = item;

			const config: any = BaseConfig(
				xlsxTolocales_entryPath,
				xlsxTolocales_selectSheet,
				xlsxTolocales_outputPath,
				localesToXlsx_entryPath,
				localesToXlsx_outputPath,
			)
			xlsxTolocales_outputPath && mkdirs(xlsxTolocales_outputPath);
			localesToXlsx_entryPath && mkdirs(localesToXlsx_entryPath);
			configs.push({
				...config, toJs, toXlsx
			});

		})
		resolve(configs)
	})
		.then((configs: any[]): Promise<any> => {
			return new Promise((resolve: (val: any) => void): void => {
				configs.forEach((item: any): void => {
					const { toJs = false, xlsxTolocales, } = item;

					// 生成 js 文件
					toJs && readXlsxtToWriteFile(xlsxTolocales)
				})
				resolve(configs)
			})
		})
		.then((configs: any[]): Promise<any> => {
			return new Promise((resolve: (val: any) => void): void => {
				configs.forEach((item: any): void => {
					const { toXlsx = false, localesToXlsx } = item;

					// 生成 xlsx 文件
					toXlsx && readlocalesToXlsx(localesToXlsx)
				})
				resolve(configs)
			})
		})
		.catch((err: any): void => {
			console.log('生成失败', err)
		})

}

run();
