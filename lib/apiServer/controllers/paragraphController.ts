
exports.paragraph = (req:any, res:any) => {
	const LoremIpsum:any = require('lorem-ipsum').LoremIpsum
	const { MAX_PARAGRAPH } = require('../config')
	let lorem:any = (new LoremIpsum()).generateParagraphs(Math.min(parseInt(req.params[0]),MAX_PARAGRAPH))
	req.params[1] === ',' && (lorem = lorem
		.split('\r\n')
		// .map(s => s.trim() + '.')
		// .filter(i => i !== '.')
	)

	res.json({
		"data": lorem
	})

}
