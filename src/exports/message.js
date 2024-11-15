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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMessagingServices = exports.extractMessage = void 0;
var fs_1 = require("fs");
// Extrator de mensagem
var extractMessage = function (messageDetails) {
    var finalMessageText = messageDetails.message.text || "";
    var from = messageDetails.key.remoteJid;
    var isCommand = finalMessageText.startsWith("."); // Verifica se é um comando
    var commandName = isCommand ? finalMessageText.slice(1).split(" ")[0] : ""; // Extrai o nome do comando
    var args = finalMessageText.split(" ").slice(1); // Extrai os argumentos
    var userName = messageDetails.pushName;
    return { finalMessageText: finalMessageText, from: from, isCommand: isCommand, commandName: commandName, args: args, userName: userName };
};
exports.extractMessage = extractMessage;
// Setup de serviços de mensagem
function setupMessagingServices(chico, from, messageDetails) {
    var _this = this;
    var enviarTexto = function (chico, from, texto, messageDetails) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 2, 3]);
                    return [4 /*yield*/, chico.sendMessage(from, { text: texto }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2: return [7 /*endfinally*/];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var enviarAudioGravacao = function (arquivo) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        audio: fs_1.default.readFileSync(arquivo),
                        mimetype: "audio/mp4",
                        ptt: true
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarImagem = function (arquivo, text) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, { image: fs_1.default.readFileSync(arquivo), caption: text }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarVideo = function (arquivo, text) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        video: fs_1.default.readFileSync(arquivo),
                        caption: text,
                        mimetype: "video/mp4"
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarDocumento = function (arquivo, text) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        document: fs_1.default.readFileSync(arquivo),
                        caption: text
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarSticker = function (arquivo) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        sticker: fs_1.default.readFileSync(arquivo)
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarLocalizacao = function (latitude, longitude, text) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        location: { latitude: latitude, longitude: longitude, caption: text }
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var enviarContato = function (numero, nome) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chico.sendMessage(from, {
                        contact: {
                            phone: numero,
                            name: { formattedName: nome }
                        }
                    }, { quoted: messageDetails })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    console.log('from:', from);
    console.log('messageDetails:', messageDetails);
    return {
        enviarAudioGravacao: enviarAudioGravacao,
        enviarImagem: enviarImagem,
        enviarVideo: enviarVideo,
        enviarDocumento: enviarDocumento,
        enviarSticker: enviarSticker,
        enviarLocalizacao: enviarLocalizacao,
        enviarContato: enviarContato
    };
}
exports.setupMessagingServices = setupMessagingServices;
