"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ASCII = void 0;
exports.base64ASCII = function (base64) {
    var buff = new Buffer(base64, "base64");
    return buff.toString("ascii");
};
