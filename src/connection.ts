 import { makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, AuthenticationState } from "@whiskeysockets/baileys";
import readline from "readline";
import { question } from "./exports/index"; // Assegure-se de que question esteja exportada corretamente
import { handleMenuCommand } from "./commands";
import path from "path";
import pino from "pino"

// Configuração do readline para usar no question
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questionAsync = (query: string): Promise<string> => {
  return new Promise((resolve) => rl.question(query, resolve));
};
const logger = pino({level: "silent"})

export async function pico(): Promise<void> {
  
    const { version } = await fetchLatestBaileysVersion();
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, "..", "database", "qr-code"));

    const chico = makeWASocket({
      printQRInTerminal: false,
      version,
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: state as AuthenticationState,
      logger,
      markOnlineOnConnect: true,
    });

    if (!chico.authState.creds.registered) {
      let phoneNumber: string = await questionAsync("Informe o seu número de telefone: ");
      phoneNumber = phoneNumber.replace(/[^0-9]/g, ""); // Limpa caracteres não numéricos

      if (!phoneNumber) {
        throw new Error("Número de telefone inválido!");
      }

      const code: string = await chico.requestPairingCode(phoneNumber);
      console.log(`Código de pareamento: ${code}`);
    }

    chico.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;

      if (connection === "close") {
        const shouldReconnect = (lastDisconnect?.error as any)?.statusCode !== DisconnectReason.loggedOut;

        console.log("Conexão fechada devido ao erro:", lastDisconnect?.error, "Fazendo reconexão...", shouldReconnect);

        if (shouldReconnect) {
          pico(); // Reconectar, mas é melhor usar outra estratégia para evitar chamadas recursivas infinitas
        }
      } else if (connection === "open") {
        console.log("Conexão aberta com sucesso!");
      }
    });

    chico.ev.on("creds.update", saveCreds);
    
    chico.ev.on("messages.upsert", async ({ messages }) => {
    const messageDetails = messages[0];
    if (!messageDetails.message) return;

    const from = messageDetails.key.remoteJid;
    const userName = messageDetails.message.conversation;  // Ajuste para extrair o comando conforme a sua lógica

    // Chama o comando de menu com os dados necessários
    await handleMenuCommand(chico, from, messageDetails);

  });
    
}