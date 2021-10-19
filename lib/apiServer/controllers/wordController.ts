

exports.word = (req: any, res: any) => {
	const LoremIpsum: any = require('lorem-ipsum').LoremIpsum
	const { MAX_WORDS } = require('../config')
	let lorem = (new LoremIpsum()).generateWords(Math.min(parseInt(req.params[0]), MAX_WORDS))
	req.params[1] === ',' && (lorem = lorem.split(' '))
	res.json({ "data": lorem })

}

