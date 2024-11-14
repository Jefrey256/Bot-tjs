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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCommands = handleCommands;
const message_1 = require("../exports/message");
const caption_1 = require("./caption");
function handleCommands(chico) {
    return __awaiter(this, void 0, void 0, function* () {
        chico.ev.on("messages.upsert", (_a) => __awaiter(this, [_a], void 0, function* ({ messages }) {
            const messageDetails = messages[0];
            if (!messageDetails.message)
                return;
            try {
                const { finalMessageText, from, isCommand, commandName, args, userName } = (0, message_1.extractMessage)(messageDetails);
                const { enviarAudioGravacao, enviarImagem } = (0, message_1.setupMessagingServices)(chico, from, messageDetails);
                switch (commandName) {
                    case "menu":
                    case "help":
                        yield enviarAudioGravacao("assets/music/iphone.ogg"),
                            enviarImagem("assets/img/lol.png", (0, caption_1.menuCaption)(userName));
                        break;
                }
            }
            catch (error) {
                console.log("Ocorreu um erro:", error);
            }
        }));
    });
}
;
