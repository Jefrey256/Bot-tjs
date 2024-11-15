import fs from "fs";
import path from "path";
import { setupMessagingServices } from "../../exports/message";


export async function executeSetProfilePictureCommand(chico, messageDetails, from) {
  
  try {
    const from = messageDetails.key.remoteJid;

    // Verificar se uma imagem foi enviada
    if (!messageDetails.message?.imageMessage) {
      await chico.sendMessage(from, { text: "Por favor, envie uma imagem junto com o comando!" });
      return;
    }

    // Obter buffer da imagem
    const mediaMessage = messageDetails.message.imageMessage;
    const mediaBuffer = await chico.downloadMediaMessage(messageDetails);

    if (!mediaBuffer) {
      await chico.sendMessage(from, { text: "Erro ao baixar a imagem. Tente novamente." });
      return;
    }

    // Caminho para salvar a imagem
    const imagePath = path.join(__dirname, "../../assets/img/lol.png");

    // Salvar a imagem localmente
    fs.writeFileSync(imagePath, mediaBuffer);

    // Atualizar a foto de perfil
    await chico.updateProfilePicture("me", { url: imagePath });

    await chico.sendMessage(from, { text: "Foto de perfil atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar a foto de perfil:", error);
    await chico.sendMessage(from, { text: "Erro ao atualizar a foto de perfil. Tente novamente!" });
  }
}
