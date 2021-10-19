const fs = require('fs')


export function mkdir(pos: number, dirArray: any[], _callback: any): void {
	let len: number = dirArray.length;
	if (pos >= len || pos > 10) {
		_callback();
		return;
	}
	let currentDir: string = '';
	for (var i = 0; i <= pos; i++) {
		if (i != 0) currentDir += '/';
		currentDir += dirArray[i];
	}
	fs.exists(currentDir, function (exists: boolean) {
		if (!exists) {
			fs.mkdir(currentDir, function (err: any): void {
				if (err) {
					console.log('创建文件夹出错！');
				} else {
					console.log(currentDir + '文件夹-创建成功！');
					mkdir(pos + 1, dirArray, _callback);
				}
			});
		} else {
			console.log(currentDir + '文件夹-已存在！');
			mkdir(pos + 1, dirArray, _callback);
		}
	});
}

export function mkdirs(dirpath: string, _callback: any): void {
	var dirArray: string[] = dirpath.split('/');
	fs.exists(dirpath, function (exists: boolean): void {
		if (!exists) {
			mkdir(0, dirArray, function (): void {
				console.log(dirpath, '文件夹创建完毕!准备写入文件!');
				_callback && _callback();
			});
		} else {
			console.log(dirpath, '文件夹已经存在!准备写入文件!');
			_callback && _callback();
		}
	});
}

// exports.mkdirs = mkdirs
