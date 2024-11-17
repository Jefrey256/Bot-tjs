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
exports.pico = pico;
const baileys_1 = require("@whiskeysockets/baileys");
const readline_1 = __importDefault(require("readline"));
const commands_1 = require("./commands");
const path_1 = __importDefault(require("path"));
const pino_1 = __importDefault(require("pino"));
// Configuração do readline para usar no question
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const questionAsync = (query) => {
    return new Promise((resolve) => rl.question(query, resolve));
};
const logger = (0, pino_1.default)({ level: "silent" });
function pico() {
    return __awaiter(this, void 0, void 0, function* () {
        const { version } = yield (0, baileys_1.fetchLatestBaileysVersion)();
        const { state, saveCreds } = yield (0, baileys_1.useMultiFileAuthState)(path_1.default.resolve(__dirname, "..", "database", "qr-code"));
        const chico = (0, baileys_1.makeWASocket)({
            printQRInTerminal: false,
            version,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            auth: state,
            logger,
            markOnlineOnConnect: true,
        });
        if (!chico.authState.creds.registered) {
            let phoneNumber = yield questionAsync("Informe o seu número de telefone: ");
            phoneNumber = phoneNumber.replace(/[^0-9]/g, ""); // Limpa caracteres não numéricos
            if (!phoneNumber) {
                throw new Error("Número de telefone inválido!");
            }
            const code = yield chico.requestPairingCode(phoneNumber);
            console.log(`Código de pareamento: ${code}`);
        }
        chico.ev.on("connection.update", (update) => {
            var _a;
            const { connection, lastDisconnect } = update;
            if (connection === "close") {
                const shouldReconnect = ((_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.statusCode) !== baileys_1.DisconnectReason.loggedOut;
                console.log("Conexão fechada devido ao erro:", lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error, "Fazendo reconexão...", shouldReconnect);
                if (shouldReconnect) {
                    pico(); // Reconectar, mas é melhor usar outra estratégia para evitar chamadas recursivas infinitas
                }
            }
            else if (connection === "open") {
                console.log("Conexão aberta com sucesso!");
            }
        });
        chico.ev.on("creds.update", saveCreds);
        chico.ev.on("messages.upsert", (_a) => __awaiter(this, [_a], void 0, function* ({ messages }) {
            const messageDetails = messages[0];
            if (!messageDetails.message)
                return;
            const from = messageDetails.key.remoteJid;
            const userName = messageDetails.message.conversation; // Ajuste para extrair o comando conforme a sua lógica
            // Chama o comando de menu com os dados necessários
            yield (0, commands_1.handleMenuCommand)(chico, from, messageDetails);
        }));
    });
}
