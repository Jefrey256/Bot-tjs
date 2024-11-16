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
exports.handleMenuCommand = void 0;
var help_1 = require("./users/help");
var menu_1 = require("./users/menu");
var ping_1 = require("./users/ping");
//import { alt } from "./admin/alt";
var perfil_1 = require("./users/perfil");
var message_1 = require("../exports/message");
var message_2 = require("../exports/message");
// Função para tratar os comandos
function handleMenuCommand(chico, from, messageDetails) {
    return __awaiter(this, void 0, void 0, function () {
        var enviarTexto, _a, finalMessageText, commandName, commands, error_1, validCommands;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    enviarTexto = (0, message_1.setupMessagingServices)(chico, from, messageDetails).enviarTexto;
                    _a = (0, message_2.extractMessage)(messageDetails), finalMessageText = _a.finalMessageText, commandName = _a.commandName;
                    commands = {
                        p: perfil_1.perfil,
                        menu: menu_1.executeMenuCommand,
                        help: help_1.executeHelpCommand,
                        ping: ping_1.executePingCommand,
                    };
                    if (!commands[commandName]) return [3 /*break*/, 6];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 5]);
                    return [4 /*yield*/, commands[commandName](chico, from, messageDetails)];
                case 2:
                    _b.sent(); // Executa o comando
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _b.sent();
                    return [4 /*yield*/, enviarTexto("Erro ao executar o comando '".concat(commandName, "': ").concat(error_1.message))];
                case 4:
                    _b.sent();
                    console.log("Erro ao executar o comando '".concat(commandName, "':"), error_1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 8];
                case 6:
                    validCommands = Object.keys(commands).join(", ");
                    return [4 /*yield*/, enviarTexto("Comando '".concat(commandName, "' n\u00E3o encontrado. Comandos v\u00E1lidos: ").concat(validCommands))];
                case 7:
                    _b.sent();
                    console.log("Comando '".concat(commandName, "' n\u00E3o encontrado."));
                    _b.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.handleMenuCommand = handleMenuCommand;
