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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMessage = extractMessage;
exports.setupMessagingServices = setupMessagingServices;
const settings_json_1 = require("../settings.json");
const fs_1 = __importDefault(require("fs"));
// Extrator de mensagem
function extractMessage(messageDetails) {
    var _a, _b, _c, _d, _e, _f, _g;
    const extendedTextMessage = (_b = (_a = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.text;
    const textConversation = (_c = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.message) === null || _c === void 0 ? void 0 : _c.conversation;
    const finalMessageText = extendedTextMessage || textConversation;
    const from = (_d = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.key) === null || _d === void 0 ? void 0 : _d.remoteJid;
    const isCommand = (_e = finalMessageText === null || finalMessageText === void 0 ? void 0 : finalMessageText.startsWith(settings_json_1.PREFIX)) !== null && _e !== void 0 ? _e : false;
    const commandName = isCommand ? (_f = finalMessageText.slice(1).trim().split(/ +/).shift()) === null || _f === void 0 ? void 0 : _f.toLowerCase() : "";
    const args = isCommand ? finalMessageText.trim().split(/ +/).slice(1) : [];
    const userName = (_g = messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.pushName) !== null && _g !== void 0 ? _g : "";
    return {
        finalMessageText,
        from,
        isCommand,
        commandName,
        args,
        userName,
    };
}
// Setup de serviços de mensagem
function setupMessagingServices(chico, from, messageDetails) {
    const enviarAudioGravacao = (arquivo) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, { audio: fs_1.default.readFileSync(arquivo), mimetype: "audio/mp4", ptt: true }, { quoted: messageDetails });
    });
    const enviarImagem = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, { image: fs_1.default.readFileSync(arquivo), caption: text }, { quoted: messageDetails });
    });
    return {
        enviarAudioGravacao,
        enviarImagem,
    };
}
