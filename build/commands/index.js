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
exports.handleMenuCommand = handleMenuCommand;
const help_1 = require("./users/help");
const menu_1 = require("./users/menu");
const ping_1 = require("./users/ping");
const alt_1 = require("./admin/alt");
const perfil_1 = require("./users/perfil");
// Função para tratar os comandos
function handleMenuCommand(chico, from, messageDetails) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extração do comando a partir da mensagem (ajuste conforme necessário)
        const messageText = messageDetails.message.conversation || "";
        const commandName = messageText.trim().toLowerCase().replace(/^./, ""); // Remove prefixo como '.' ou '!'
        // Mapeamento de comandos
        const commands = {
            p: perfil_1.perfil,
            menu: menu_1.executeMenuCommand,
            help: help_1.executeHelpCommand,
            ping: ping_1.executePingCommand,
            alt: alt_1.executeSetProfilePictureCommand,
        };
        // Verifique se o comando existe
        if (commands[commandName]) {
            try {
                yield commands[commandName](chico, from, messageDetails); // Executa o comando
            }
            catch (error) {
                console.log(`Erro ao executar o comando '${commandName}':`, error);
            }
        }
        else {
            console.log(`Comando '${commandName}' não encontrado.`);
        }
    });
}
