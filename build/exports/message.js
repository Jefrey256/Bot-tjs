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
const settings_json_1 = require("../settings.json");
const fs_1 = __importDefault(require("fs"));
// Extrator de mensagem
const extractMessage = (messageDetails) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    const finalMessageText = ((_a = messageDetails.message) === null || _a === void 0 ? void 0 : _a.conversation) || "";
    // O 'from' já existe, então apenas pegamos o número sem o sufixo '@s.whatsapp.net' (se for de grupo)
    const fromUser = ((_c = (_b = messageDetails.key) === null || _b === void 0 ? void 0 : _b.participant) === null || _c === void 0 ? void 0 : _c.split('@')[0]) || ((_e = (_d = messageDetails.key) === null || _d === void 0 ? void 0 : _d.remoteJid) === null || _e === void 0 ? void 0 : _e.split('@')[0]);
    const from = ((_f = messageDetails.key) === null || _f === void 0 ? void 0 : _f.remoteJid) || "Remetente desconhecido";
    const userName = (messageDetails === null || messageDetails === void 0 ? void 0 : messageDetails.pushName) || "Usuário Desconhecido";
    const isCommand = finalMessageText.startsWith(settings_json_1.PREFIX);
    const participant = ((_g = messageDetails.key) === null || _g === void 0 ? void 0 : _g.participant) || ((_h = messageDetails.key) === null || _h === void 0 ? void 0 : _h.remoteJid);
    const commandName = isCommand ? finalMessageText.slice(settings_json_1.PREFIX.length).split(" ")[0] : "";
    const args = finalMessageText.split(" ").slice(1);
    // Extração das mídias
    const imageMessage = ((_j = messageDetails.message) === null || _j === void 0 ? void 0 : _j.imageMessage) || null;
    const videoMessage = ((_k = messageDetails.message) === null || _k === void 0 ? void 0 : _k.videoMessage) || null;
    const audioMessage = ((_l = messageDetails.message) === null || _l === void 0 ? void 0 : _l.audioMessage) || null;
    return {
        finalMessageText, // Texto completo da mensagem
        from, // ID do remetente (pode ser do grupo)
        fromUser, // Número do usuário sem o sufixo
        isCommand, // Se é ou não um comando
        commandName, // Nome do comando (se aplicável)
        args, // Lista de argumentos do comando
        userName, // Nome do usuário
        participant, // ID do participante (se for de grupo ou privado)
        imageMessage, // Imagem enviada (se houver)
        videoMessage, // Vídeo enviado (se houver)
        audioMessage, // Áudio enviado (se houver)
    };
};
exports.extractMessage = extractMessage;
// Setup de serviços de mensagem
function setupMessagingServices(chico, from, messageDetails) {
    const enviarTexto = (texto) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, { text: texto }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar texto:', error);
        }
    });
    const enviarAudioGravacao = (arquivo) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                audio: fs_1.default.readFileSync(arquivo),
                mimetype: "audio/mp4",
                ptt: true,
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar áudio:', error);
        }
    });
    const enviarImagem = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Verifica se 'arquivo' é uma URL (string que começa com 'http')
            if (typeof arquivo === 'string' && arquivo.startsWith('http')) {
                // Envia a imagem diretamente pela URL
                yield chico.sendMessage(from, {
                    image: { url: arquivo }, // Envia a imagem pela URL
                    caption: text
                }, { quoted: messageDetails });
            }
            else if (Buffer.isBuffer(arquivo)) {
                // Se 'arquivo' for um Buffer (dados binários da imagem)
                yield chico.sendMessage(from, {
                    image: arquivo, // Envia a imagem a partir do Buffer
                    caption: text
                }, { quoted: messageDetails });
            }
            else if (typeof arquivo === 'string') {
                // Se 'arquivo' for um caminho local, lê o arquivo diretamente
                if (fs_1.default.existsSync(arquivo)) {
                    // Lê o arquivo de imagem como Buffer
                    const imageBuffer = fs_1.default.readFileSync(arquivo);
                    // Envia a imagem a partir do Buffer
                    yield chico.sendMessage(from, {
                        image: imageBuffer, // Envia a imagem a partir do Buffer
                        caption: text
                    }, { quoted: messageDetails });
                }
                else {
                    console.error('Arquivo não encontrado:', arquivo);
                }
            }
            else {
                console.error('O arquivo ou URL não é válido:', arquivo);
            }
        }
        catch (error) {
            console.error('Erro ao enviar imagem:', error);
        }
    });
    const enviarVideo = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                video: fs_1.default.readFileSync(arquivo),
                caption: text,
                mimetype: "video/mp4"
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar vídeo:', error);
        }
    });
    const enviarDocumento = (arquivo, text) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                document: fs_1.default.readFileSync(arquivo),
                caption: text
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar documento:', error);
        }
    });
    const enviarSticker = (arquivo) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                sticker: fs_1.default.readFileSync(arquivo)
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar sticker:', error);
        }
    });
    const enviarLocalizacao = (latitude, longitude, text) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                location: { latitude, longitude, caption: text }
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar localização:', error);
        }
    });
    const enviarContato = (numero, nome) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield chico.sendMessage(from, {
                contact: {
                    phone: numero,
                    name: { formattedName: nome }
                }
            }, { quoted: messageDetails });
        }
        catch (error) {
            console.error('Erro ao enviar contato:', error);
        }
    });
    //console.log('from:', from);
    //console.log('messageDetails:', messageDetails);
    return {
        enviarTexto,
        enviarAudioGravacao,
        enviarImagem,
        enviarVideo,
        enviarDocumento,
        enviarSticker,
        enviarLocalizacao,
        enviarContato
    };
}
