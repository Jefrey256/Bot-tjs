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
exports.extractMessage = void 0;
exports.setupMessagingServices = setupMessagingServices;
const fs_1 = __importDefault(require("fs"));
// Extrator de mensagem
const extractMessage = (messageDetails) => {
    const finalMessageText = messageDetails.message.text || "";
    const from = messageDetails.key.remoteJid;
    const isCommand = finalMessageText.startsWith("."); // Verifica se é um comando
    const commandName = isCommand ? finalMessageText.slice(1).split(" ")[0] : ""; // Extrai o nome do comando
    const args = finalMessageText.split(" ").slice(1); // Extrai os argumentos
    const userName = messageDetails.pushName;
    return { finalMessageText, from, isCommand, commandName, args, userName };
};
exports.extractMessage = extractMessage;
// Setup de serviços de mensagem
function setupMessagingServices(chico, from, messageDetails) {
    const enviarAudioGravacao = (arquivo) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            audio: fs_1.default.readFileSync(arquivo),
            mimetype: "audio/mp4",
            ptt: true
        }, { quoted: messageDetails });
    });
    const enviarImagem = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, { image: fs_1.default.readFileSync(arquivo), caption: text }, { quoted: messageDetails });
    });
    const enviarVideo = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            video: fs_1.default.readFileSync(arquivo),
            caption: text,
            mimetype: "video/mp4"
        }, { quoted: messageDetails });
    });
    const enviarDocumento = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            document: fs_1.default.readFileSync(arquivo),
            caption: text
        }, { quoted: messageDetails });
    });
    const enviarSticker = (arquivo) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            sticker: fs_1.default.readFileSync(arquivo)
        }, { quoted: messageDetails });
    });
    const enviarLocalizacao = (latitude, longitude, text) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            location: { latitude, longitude, caption: text }
        }, { quoted: messageDetails });
    });
    const enviarContato = (numero, nome) => __awaiter(this, void 0, void 0, function* () {
        yield chico.sendMessage(from, {
            contact: {
                phone: numero,
                name: { formattedName: nome }
            }
        }, { quoted: messageDetails });
    });
    console.log('from:', from);
    console.log('messageDetails:', messageDetails);
    return {
        enviarAudioGravacao,
        enviarImagem,
        enviarVideo,
        enviarDocumento,
        enviarSticker,
        enviarLocalizacao,
        enviarContato
    };
}
