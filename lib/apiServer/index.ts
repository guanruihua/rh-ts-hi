const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { HOST, PORT } = require('./config')
app.use(bodyParser.urlencoded({ extends: false }))
app.use(bodyParser.json())
// app.use(cors())
//设置允许跨域访问该服务.
app.all('*', function (req: any, res: any, next: any): void {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Content-Type', 'application/json;charset=utf-8');
	next();
});

app.get(/\/(\d+)(?:w|word|words)(,*)$/, require('./controllers/wordController').word)
app.get(/\/(\d+)(?:s|sentence|sentences)(,*)$/, require('./controllers/sentenceController').sentence)
app.get(/\/(\d+)(?:p|paragraph|paragraphs)(,*)$/, require('./controllers/paragraphController').paragraph)
app.get(/\/(\d+)x(\d+)\.(jpg|png)(?:,([a-zA-Z0-9]+?),([a-zA-Z0-9]+?))*$/, require('./controllers/imageController').image)
app.get(/\/random,(.+?)$/, require('./controllers/randomController').random)

app.post(/\/post\/(?:vrp|virtualPost)/, require('./controllers/virtualPost/returnParams').singleReturnParams)
app.get(/\/get\/(?:vrg|virtualGet)$/, require('./controllers/virtualGet/returnParams').singleReturnParams)

exports.app = function (host = HOST, port = PORT, callback?: any) {
	callback && callback(app);
	app.listen(port, host, () => {
		console.log(`listening at http://${host}:${port}`);
	})
}

