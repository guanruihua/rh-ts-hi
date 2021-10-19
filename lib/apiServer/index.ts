const express = require('express');
const app = express()
const cors = require('cors')
const { HOST, PORT } = require('./config')
app.use(cors())

app.get(/\/(\d+)(?:w|word|words)(,*)$/, require('./controllers/wordController').word)
app.get(/\/(\d+)(?:s|sentence|sentences)(,*)$/, require('./controllers/sentenceController').sentence)
app.get(/\/(\d+)(?:p|paragraph|paragraphs)(,*)$/, require('./controllers/paragraphController').paragraph)
app.get(/\/(\d+)x(\d+)\.(jpg|png)(?:,([a-zA-Z0-9]+?),([a-zA-Z0-9]+?))*$/, require('./controllers/imageController').image)
app.get(/\/random,(.+?)$/, require('./controllers/randomController').random)

exports.app = function (host = HOST, port = PORT, callback?:any) {
	callback && callback(app);
	app.listen(port, host, () => {
		console.log(`listening at http://${host}:${port}`);
	})
}
