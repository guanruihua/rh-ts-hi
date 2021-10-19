"use strict";
var express = require('express');
var app = express();
var cors = require('cors');
var _a = require('./config'), HOST = _a.HOST, PORT = _a.PORT;
app.use(cors());
app.get(/\/(\d+)(?:w|word|words)(,*)$/, require('./controllers/wordController').word);
app.get(/\/(\d+)(?:s|sentence|sentences)(,*)$/, require('./controllers/sentenceController').sentence);
app.get(/\/(\d+)(?:p|paragraph|paragraphs)(,*)$/, require('./controllers/paragraphController').paragraph);
app.get(/\/(\d+)x(\d+)\.(jpg|png)(?:,([a-zA-Z0-9]+?),([a-zA-Z0-9]+?))*$/, require('./controllers/imageController').image);
app.get(/\/random,(.+?)$/, require('./controllers/randomController').random);
exports.app = function (host, port, callback) {
    if (host === void 0) { host = HOST; }
    if (port === void 0) { port = PORT; }
    callback && callback(app);
    app.listen(port, host, function () {
        console.log("listening at http://" + host + ":" + port);
    });
};
