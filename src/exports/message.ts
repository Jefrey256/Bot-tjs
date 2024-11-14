import { PREFIX } from "../settings.json";
import fs from "fs";

// Extrator de mensagem
export function extractMessage(messageDetails: any) {
  const extendedTextMessage = messageDetails?.message?.extendedTextMessage?.text;
  const textConversation = messageDetails?.message?.conversation;

  const finalMessageText = extendedTextMessage || textConversation;
  const from = messageDetails?.key?.remoteJid;
  const isCommand = finalMessageText?.startsWith(PREFIX) ?? false;

  const commandName = isCommand ? finalMessageText.slice(1).trim().split(/ +/).shift()?.toLowerCase() : "";
  const args = isCommand ? finalMessageText.trim().split(/ +/).slice(1) : [];
  const userName = messageDetails?.pushName ?? "";

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
export function setupMessagingServices(chico: any, from: string, messageDetails: any) {
  const enviarAudioGravacao = async (arquivo: string) => {
    await chico.sendMessage(from, { audio: fs.readFileSync(arquivo), mimetype: "audio/mp4", ptt: true }, { quoted: messageDetails });
  };

  const enviarImagem = async (arquivo: string, text: string) => {
    await chico.sendMessage(from, { image: fs.readFileSync(arquivo), caption: text }, { quoted: messageDetails });
  };

  return {
    enviarAudioGravacao,
    enviarImagem,
  };
}
