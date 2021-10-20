module.exports = class {
	queue: any[] = [] // 异步请求队列
	running: boolean = false

	processFn(): void {
		const item: any = this.queue.shift();
		if (item) {
			item().then((res: any) => {
				console.log('已经处理事件', res)
				const { data, callback }: { data: any, callback: (data: any) => any } = res;
				callback && callback(data);
				this.processFn();
			})
		}
	}

	addQueue(item: any): void {
		this.queue.push(item)
		if (this.queue.length > 0 && !this.running) {
			this.running = true;
			this.processFn();
		}
	}

}


