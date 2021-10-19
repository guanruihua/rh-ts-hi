"use strict";
exports.random = function (req, res) {
    var randomSource = req.params[0].split(',');
    res.json({ "data": randomSource[Math.floor(Math.random() * randomSource.length)] });
};
