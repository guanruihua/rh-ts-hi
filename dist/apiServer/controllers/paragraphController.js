"use strict";
exports.paragraph = function (req, res) {
    var LoremIpsum = require('lorem-ipsum').LoremIpsum;
    var MAX_PARAGRAPH = require('../config').MAX_PARAGRAPH;
    var lorem = (new LoremIpsum()).generateParagraphs(Math.min(parseInt(req.params[0]), MAX_PARAGRAPH));
    req.params[1] === ',' && (lorem = lorem
        .split('\r\n'));
    res.json({
        "data": lorem
    });
};
