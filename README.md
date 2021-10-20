# NPM 包 说明
> - 该包只是测试包, 用于测试工具方法的测试包
> - https://github.com/guanruihua/rh-ts-hi
> - 工具包

## 使用前说明
> - 使用说明: node > 14  
> - 需要在使用的项目添加依赖

```json
	"@types/node": "^16.11.1",
	"typescript": "^4.3.2",
	"express": "^4.17.1",
	"lorem-ipsum": "^2.0.4",
	"nodemon": "^2.0.13",
	"canvas":"^2.8.0",
	"cors":"2.8.5",
	"node-xlsx": "^0.17.1"
```
## 使用
```js
const { apiServer } = require('rh-ts-hi');
apiServer()
```

## 方法说明
###  locales
> toJs 和 toXlsx 不可以同时设置为true, 每次执行设置一个即可
> 需要自己定制 一些相关配置, 需要重写BaseConfig方法
> 若还需要更加自定制, 则需要重写 readXlsxtToWriteFile, readlocalesToXlsx 方法

```ts
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
```

### `apiServer([host[, port[, callback]]])`
> 不传就会是默认值
> callback(app): 这个app就是express的app, 方便开发者进行二次修改

## 虚拟接口服务器
> 使用 : `host:port/ + (加上以下配置)`
>- `[number](w|word|words)[,]` : 随机数量词    
>- `[number](s|sentence|sentences)[,]` : 随机数量句子  
>- `[number](p|paragraph|paragraphs)[,]` : 随机数量自然段  
>- `[number]x[number].(jpg|png)[[背景颜色], [字体颜色]]` (rgb颜色不用#) : 随机图片  
>- `random,[value1 [, value2][, value3] ...]` : 多选一字符  
> 补充: 加上逗号`,`会变成数组形式

### 例如
> http://localhost:3000/3p,

## 版本
- 1.0.9 : 添加 locales 方法
- 1.0.5 : 添加虚拟接口服务器
- 1.0.4-beta : 添加虚拟接口服务器测试
