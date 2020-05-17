"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Difficulty = exports.TextEncoding = exports.QuestionsType = exports.ResponseCode = void 0;
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["Success"] = 0] = "Success";
    ResponseCode[ResponseCode["NoResults"] = 1] = "NoResults";
    ResponseCode[ResponseCode["InvalidParameter"] = 2] = "InvalidParameter";
    ResponseCode[ResponseCode["TokenNotFound"] = 3] = "TokenNotFound";
    ResponseCode[ResponseCode["TokenEmpty"] = 4] = "TokenEmpty";
})(ResponseCode = exports.ResponseCode || (exports.ResponseCode = {}));
var QuestionsType;
(function (QuestionsType) {
    QuestionsType["MultipleChoice"] = "multiple";
    QuestionsType["TrueFalse"] = "boolean";
})(QuestionsType = exports.QuestionsType || (exports.QuestionsType = {}));
var TextEncoding;
(function (TextEncoding) {
    TextEncoding["URLFC3986"] = "url3986";
    TextEncoding["BASE64"] = "base64";
})(TextEncoding = exports.TextEncoding || (exports.TextEncoding = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty["Easy"] = "easy";
    Difficulty["Medium"] = "medium";
    Difficulty["Hard"] = "hard";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
