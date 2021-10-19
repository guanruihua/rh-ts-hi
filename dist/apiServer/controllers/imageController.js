"use strict";
exports.image = function (req, res) {
    var createCanvas = require('canvas').createCanvas;
    var _a = require('../config'), IMAGE_MAX_HEIGTH = _a.IMAGE_MAX_HEIGTH, IMAGE_MAX_WIDTH = _a.IMAGE_MAX_WIDTH;
    var _b = Object.values(req.params), width = _b[0], height = _b[1], format = _b[2], bgColor = _b[3], textColor = _b[4];
    width = Math.min(parseInt(width), IMAGE_MAX_WIDTH);
    height = Math.min(parseInt(height), IMAGE_MAX_HEIGTH);
    typeof bgColor === 'undefined' && (bgColor = '#333333');
    isHexColor(bgColor) && (bgColor = "#" + bgColor);
    typeof textColor === 'undefined' && (textColor = '#ffffff');
    isHexColor(textColor) && (textColor = "#" + textColor);
    var canvas = createCanvas(width, height);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    var fontSize = width / 10;
    ctx.fillStyle = textColor;
    ctx.font = fontSize + "px Sans";
    var text = width + " x " + height;
    var textWidht = ctx.measureText(text).width;
    ctx.fillText(text, width / 2 - textWidht / 2, height / 2);
    res.setHeader('Content-Type', "image/" + format);
    if (format === 'png') {
        canvas.pngStream().pipe(res);
    }
    else {
        canvas.jpegStream().pipe(res);
    }
};
function isHexColor(hex) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex));
}
