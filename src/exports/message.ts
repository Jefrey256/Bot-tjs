import { PREFIX } from "../settings.json";
import fs from "fs";

// Extrator de mensagem
export const extractMessage = (messageDetails) => {
  const finalMessageText = messageDetails.message.text || "";
  const from = messageDetails.key.remoteJid;
  const isCommand = finalMessageText.startsWith("."); // Verifica se é um comando
  const commandName = isCommand ? finalMessageText.slice(1).split(" ")[0] : ""; // Extrai o nome do comando
  const args = finalMessageText.split(" ").slice(1); // Extrai os argumentos
  const userName = messageDetails.pushName;

  return { finalMessageText, from, isCommand, commandName, args, userName };
};


// Setup de serviços de mensagem




export function setupMessagingServices(chico, from, messageDetails) {
  const enviarTexto = async (chico, from, texto, messageDetails) =>{
    try{
      await chico.sendMessage(from,
      {text: texto},
      {quoted: messageDetails}
      )
    }
  }
  
  const enviarAudioGravacao = async (arquivo) => {
    await chico.sendMessage(from, { 
      audio: fs.readFileSync(arquivo), 
      mimetype: "audio/mp4", 
      ptt: true 
    }, { quoted: messageDetails });
  };
   const enviarImagem = async(arquivo, text) =>{
    await chico.sendMessage(from,{ image: fs.readFileSync(arquivo), caption: text },{quoted: messageDetails})
  }
  

  const enviarVideo = async (arquivo: string, text: string) => {
    await chico.sendMessage(from, { 
      video: fs.readFileSync(arquivo), 
      caption: text, 
      mimetype: "video/mp4" 
    }, { quoted: messageDetails });
  };

  const enviarDocumento = async (arquivo: string, text: string) => {
    await chico.sendMessage(from, { 
      document: fs.readFileSync(arquivo), 
      caption: text 
    }, { quoted: messageDetails });
  };

  const enviarSticker = async (arquivo: string) => {
    await chico.sendMessage(from, { 
      sticker: fs.readFileSync(arquivo) 
    }, { quoted: messageDetails });
  };

  const enviarLocalizacao = async (latitude: number, longitude: number, text: string) => {
    await chico.sendMessage(from, { 
      location: { latitude, longitude, caption: text } 
    }, { quoted: messageDetails });
  };

  const enviarContato = async (numero: string, nome: string) => {
    await chico.sendMessage(from, { 
      contact: { 
        phone: numero, 
        name: { formattedName: nome } 
      } 
    }, { quoted: messageDetails });
  };
  
  console.log('from:', from);
  console.log('messageDetails:', messageDetails);


  return {
    enviarAudioGravacao,
    enviarImagem,
    enviarVideo,
    enviarDocumento,
    enviarSticker,
    enviarLocalizacao,
    enviarContato
  };
}

