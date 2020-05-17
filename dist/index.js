"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.getQuestions = void 0;
var axios_1 = require("axios");
var dotenv_1 = require("dotenv");
var opentrivia_1 = require("./opentrivia");
__exportStar(require("./opentrivia"), exports);
__exportStar(require("./helpers"), exports);
__exportStar(require("./pexels"), exports);
__exportStar(require("./question-categories"), exports);
dotenv_1.config();
var OPEN_TRIVIA_BASE_URL = "https://opentdb.com/api.php?";
var PEXELS_BASE_URL = "https://api.pexels.com/v1/search?";
/**
 * function creates return a url based on parameters provided
 * @param params
 */
var setRequestURL = function (params) {
    var amount = params.amount ? "amount=" + params.amount : "amount=" + 10;
    var catergory = params.catergory ? "&category=" + params.catergory : "";
    var difficulty = params.difficulty
        ? "&difficulty=" + params.difficulty
        : "";
    var type = params.type ? "&type=" + params.type : "";
    var encode = params.encode ? "&encode=" + params.encode : "";
    var url = "" + OPEN_TRIVIA_BASE_URL + amount + catergory + difficulty + type + encode;
    return url;
};
/**
 *
 * returns a list of questions from the Open Trivia API
 *
 * @param params
 */
exports.getQuestions = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, results, questionList_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = setRequestURL(params);
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                data = (_a.sent()).data;
                if (!(data.response_code === opentrivia_1.ResponseCode.Success)) return [3 /*break*/, 3];
                results = data.results;
                questionList_1 = [];
                return [4 /*yield*/, results.forEach(function (question, i) {
                        questionList_1.push({
                            category: question.category,
                            type: question.type,
                            difficulty: question.difficulty,
                            question: question.question,
                            correct_answer: question["correct_answer"],
                            all_answers: __spreadArrays([
                                question["correct_answer"]
                            ], question["incorrect_answers"]).sort(function () { return 0.5 - Math.random(); }),
                        });
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/, questionList_1];
            case 3: return [2 /*return*/, []];
        }
    });
}); };
/**
 *
 * @param query
 * @param size
 */
exports.getImage = function (query, size) { return __awaiter(void 0, void 0, void 0, function () {
    var data, photos, photo, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(PEXELS_BASE_URL, {
                    headers: {
                        Authorization: process.env.PEXELS_API_KEY,
                    },
                    params: {
                        query: query,
                        per_page: 1,
                    },
                })];
            case 1:
                data = (_a.sent()).data;
                photos = data.photos;
                photo = photos[0];
                image = {
                    id: photo.id,
                    imagesize: size,
                    src: photo.src[size],
                };
                return [2 /*return*/, image];
        }
    });
}); };
// const paramaters: OpenTriviaRequest = {
//   amount: 10,
//   catergory: OpenTriviaCategory.Entertainment_Board_Games,
//   difficulty: Difficulty.Easy,
//   type: QuestionsType.MultipleChoice,
//   encode: TextEncoding.BASE64,
// };
// getQuestions(paramaters).then((res) => {
//   res.forEach((element) => {
//     console.log(element);
//   });
// });