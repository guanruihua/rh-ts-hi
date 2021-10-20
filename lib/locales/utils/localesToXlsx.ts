function handleData(config: any) {
	const fs = require('fs');

	const { path, dataIndex } = config;
	const { addHeader, colPatt, patt = {} } = config.format || {}
	let result: any[] = []
	let resultIndex = 0;
	if (addHeader) {
		result.push(addHeader)
		resultIndex = 1;
	}
	for (let key in dataIndex) {
		const [keyA, keyB] = dataIndex[key]
		let tempPatt = colPatt;
		if (patt[key]) tempPatt = patt[key];
		let item = fs
			.readFileSync(`${path}${dataIndex[key][2]}`, 'utf-8').match(tempPatt) || []
		item = item.map((j: string) => j
			.split(/:\s*/)
			.map((it: string) =>
				it.replace(/^\"|^\t|\"$/g, '')
			))

		item.forEach((it: any[], index: number): void => {
			const [valA, valB]: any[] = it
			let tempIndex = index + resultIndex;
			if (!result[tempIndex]) result.push([]);
			keyA !== null && (result[tempIndex][keyA] = valA)
			keyB !== null && (result[tempIndex][keyB] = valB)
		})
	}
	return result;
}


exports.localesToXlsx = (config: any): { [key: string]: any } => {
	const fs = require('fs');
	const xlsx = require("node-xlsx");

	const { entry, output } = config
	let data = [{
		name: 'sheet',
		data: handleData(entry)
	}]

	fs.writeFile(output.path, xlsx.build(data), (err: any): void => {
		if (err) console.log(err)
	})

	return data;
}