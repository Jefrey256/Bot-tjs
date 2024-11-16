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
exports.executeSetProfilePictureCommand = executeSetProfilePictureCommand;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function executeSetProfilePictureCommand(chico, messageDetails, from) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const from = messageDetails.key.remoteJid;
            // Verificar se uma imagem foi enviada
            if (!((_a = messageDetails.message) === null || _a === void 0 ? void 0 : _a.imageMessage)) {
                yield chico.sendMessage(from, { text: "Por favor, envie uma imagem junto com o comando!" });
                return;
            }
            // Obter buffer da imagem
            const mediaMessage = messageDetails.message.imageMessage;
            const mediaBuffer = yield chico.downloadMediaMessage(messageDetails);
            if (!mediaBuffer) {
                yield chico.sendMessage(from, { text: "Erro ao baixar a imagem. Tente novamente." });
                return;
            }
            // Caminho para salvar a imagem
            const imagePath = path_1.default.join(__dirname, "../../assets/img/lol.png");
            // Salvar a imagem localmente
            fs_1.default.writeFileSync(imagePath, mediaBuffer);
            // Atualizar a foto de perfil
            yield chico.updateProfilePicture("me", { url: imagePath });
            yield chico.sendMessage(from, { text: "Foto de perfil atualizada com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao atualizar a foto de perfil:", error);
            yield chico.sendMessage(from, { text: "Erro ao atualizar a foto de perfil. Tente novamente!" });
        }
    });
}
