"use strict";
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
var setTimeoutPromise = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
};
// Displays square click
var click = function (elem, ms) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        $(elem).css('opacity', '1');
        return [2 /*return*/, setTimeoutPromise(ms).then(function () {
                $(elem).css('opacity', '0.125');
            })];
    });
}); };
// Adds color to input array
var addColor = function (sequence) {
    var nextColor = [
        'red',
        'yellow',
        'green',
        'blue'
    ][Math.floor(Math.random() * 4)];
    return __spreadArrays(sequence, [nextColor]);
};
// Displays the computer's sequence
var displaySequence = function (sequence) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (sequence.length === 0) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, click($('#' + sequence[0]), 700)];
            case 1:
                _a.sent();
                // give some time to reset in case of consecutive colors
                return [2 /*return*/, setTimeoutPromise(100).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // disable player input while displaying
                                return [4 /*yield*/, displaySequence(sequence.slice(1))];
                                case 1:
                                    // disable player input while displaying
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); };
$(function () {
    var turn = '';
    var pos = 0;
    var end = false;
    var sequence = [];
    var highscore = localStorage.getItem('highscore');
    $('#end').text("High Score: " + (highscore ? highscore : 0));
    var startGame = function () {
        $('#yellow').css({ opacity: 0.125 });
        $('#blue').css({ opacity: 0.125 });
        $('#red').css({ opacity: 0.125 });
        $('#green').css({ opacity: 0.125 });
        $('#newgame').hide();
        $('#end').text('');
        end = false;
        sequence = [];
        nextRound();
    };
    var endGame = function () {
        turn = '';
        var prevHighscore = Number(localStorage.getItem('highscore'));
        var score = sequence.length;
        var highscore = score > prevHighscore ? score : prevHighscore;
        $('#end').text("Game Over!\nHigh Score: " + highscore);
        $('#newgame').show();
        localStorage.setItem('highscore', highscore + '');
    };
    var nextRound = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pos = 0;
                    sequence = addColor(sequence);
                    turn = 'computer';
                    $('#round').text("Round: " + sequence.length);
                    // give some time after user is done inputting
                    return [4 /*yield*/, setTimeoutPromise(1000)];
                case 1:
                    // give some time after user is done inputting
                    _a.sent();
                    return [2 /*return*/, displaySequence(sequence).then(function () {
                            turn = 'player';
                        })];
            }
        });
    }); };
    var input = function (color) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (turn !== 'player') {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, click($('#' + color), 90)];
                case 1:
                    _a.sent();
                    end = sequence[pos] !== color;
                    ++pos;
                    if (end) {
                        endGame();
                    }
                    else if (pos === sequence.length) {
                        nextRound();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    $('#yellow').on('click', function () {
        input('yellow');
    });
    $('#blue').on('click', function () {
        input('blue');
    });
    $('#red').on('click', function () {
        input('red');
    });
    $('#green').on('click', function () {
        input('green');
    });
    $('#newgame').on('click', function () {
        startGame();
    });
});
