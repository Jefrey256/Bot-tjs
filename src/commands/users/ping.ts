// src/commands/ping.ts
import { CommandData } from "../../interface";

export async function executePingCommand({ chico, from }: CommandData) {
  try {
    await chico.sendMessage(from, { text: "Pong!" });
  } catch (error) {
    console.log("Erro ao executar o comando 'ping':", error);
  }
}
