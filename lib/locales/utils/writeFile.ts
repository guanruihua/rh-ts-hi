
exports.writeFile = (path: string, data: any, callback?: any) => {
	const fs: any = require('fs')
	fs.writeFile(path, data, (err: any, data: any): void => {
		if (err) {
			callback && callback(err, data);
			throw err;
		}
	})
}

exports.writeFileByList = (list = []): void => {
	const fs: any = require('fs')
	list.forEach((item: any): void => {
		const { path, data, callback }: any = item;
		fs.writeFile(path, data, (err: any, data: any): void => {
			if (err) {
				callback && callback(err, data);
				throw err;
			}
		})
	})
}