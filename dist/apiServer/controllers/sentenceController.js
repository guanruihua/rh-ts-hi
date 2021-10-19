"use strict";
exports.sentence = function (req, res) {
    var LoremIpsum = require('lorem-ipsum').LoremIpsum;
    var MAX_SENTENCE = require('../config').MAX_SENTENCE;
    var lorem = (new LoremIpsum()).generateSentences(Math.min(parseInt(req.params[0]), MAX_SENTENCE));
    req.params[1] === ',' && (lorem = lorem
        .split('.')
        .map(function (s) { return s.trim() + '.'; })
        .filter(function (i) { return i !== '.'; }));
    res.json({ "data": lorem });
};
