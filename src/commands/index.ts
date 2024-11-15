import { executeHelpCommand } from "./users/help";
import { executeMenuCommand } from "./users/menu";
import { executePingCommand } from "./users/ping";
import { executeSetProfilePictureCommand } from "./admin/alt";


// Função para tratar os comandos
export async function handleMenuCommand(chico, from, messageDetails) {
  // Extração do comando a partir da mensagem (ajuste conforme necessário)
  const messageText = messageDetails.message.conversation || "";
  const commandName = messageText.trim().toLowerCase().replace(/^./, ""); // Remove prefixo como '.' ou '!'
  
  // Mapeamento de comandos
  const commands = {
    menu: executeMenuCommand,
    help: executeHelpCommand,
    ping: executePingCommand,
    alt: executeSetProfilePictureCommand,
  };

  // Verifique se o comando existe
  if (commands[commandName]) {
    try {
      await commands[commandName](chico, from, messageDetails);  // Executa o comando
    } catch (error) {
      console.log(`Erro ao executar o comando '${commandName}':`, error);
    }
  } else {
    console.log(`Comando '${commandName}' não encontrado.`);
  }
}
