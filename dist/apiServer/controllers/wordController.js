"use strict";
exports.word = function (req, res) {
    var LoremIpsum = require('lorem-ipsum').LoremIpsum;
    var MAX_WORDS = require('../config').MAX_WORDS;
    var lorem = (new LoremIpsum()).generateWords(Math.min(parseInt(req.params[0]), MAX_WORDS));
    req.params[1] === ',' && (lorem = lorem.split(' '));
    res.json({ "data": lorem });
};
