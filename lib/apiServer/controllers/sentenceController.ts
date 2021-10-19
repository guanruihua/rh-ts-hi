
exports.sentence = (req: any, res: any) => {
	const LoremIpsum: any = require('lorem-ipsum').LoremIpsum
	const { MAX_SENTENCE } = require('../config')
	let lorem = (new LoremIpsum()).generateSentences(Math.min(parseInt(req.params[0]), MAX_SENTENCE))
	req.params[1] === ',' && (
		lorem = lorem
			.split('.')
			.map((s: string): string => s.trim() + '.')
			.filter((i: string): boolean => i !== '.'))

	res.json({ "data": lorem })

}
