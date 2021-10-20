function bq_test1() {
	const { BlockingQueue } = require('../lib').utils
	const que: any = new BlockingQueue();

	// 用来模拟不同的返回值
	let index: number = 0

	function request(index: number): Promise<any> {
		return new Promise((resolve: any): void => {
			setTimeout(() => {
				resolve({
					data: index + "jkfjskdfjk",
					callback: (data: any): any => {
						console.log('running callback', { data2: data })
						return {
							data2: data,
						}
					}
				})
			}, 500)
		})
	}


	function clickMe(): void {
		que.addQueue((): Promise<any> => request(index++))
	}


	for (let i: number = 5; i--;) {
		clickMe();
	}
}

function bq_test2(): void {
	let urlList: any[] = [
		'./test/dir1/a',
		'./test/dir1/b',
	]
	const run: any = (): void => {
		const fs = require('fs')
		const callback = (err: any): void => { console.log('err', err); }

		fs.mkdir('./test/dir1', callback)
		fs.mkdir('./test/dir1', callback)
	}

	run();
}

bq_test2();