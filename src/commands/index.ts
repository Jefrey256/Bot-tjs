import { extractMessage, setupMessagingServices } from "../exports/message";
import { menuCaption } from "./caption";

export async function handleCommands(chico) {
  chico.ev.on("messages.upsert", async ({ messages }) => {
    const messageDetails = messages[0];
    
    if (!messageDetails.message) return;

    try {
      const { finalMessageText, from, isCommand, commandName, args, userName } = extractMessage(messageDetails);
      const { enviarAudioGravacao, enviarImagem } = setupMessagingServices(chico, from, messageDetails);
      
      switch (commandName) {
        case "menu":
        case "help":
          await enviarAudioGravacao("assets/music/iphone.ogg"),
          enviarImagem("assets/img/lol.png", menuCaption(userName));
          
          break;
      }
      
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    }
  });
};
