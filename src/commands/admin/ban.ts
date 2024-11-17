import {setupMessagingServices} from "../../exports/message"
import {extractMessage} from "../../exports/message"

export async function ban(chico, from, messageDetails) {
  const { enviarTexto } = setupMessagingServices(chico, from, messageDetails);
  const {mentions, isBotAdmin} = extractMessage(messageDetails)

  try {
    // Obtém a mensagem completa e verifica as menções
    //const mentions = messageDetails.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];

    if (mentions.length === 0) {
      // Se não houver menções, retorna uma mensagem de erro
      await enviarTexto("Por favor, mencione o(s) usuário(s) que deseja banir.");
      return;
    }

    // Verifica se o bot tem permissões de administrador no grupo
    

    if (!isBotAdmin) {
      await enviarTexto("Eu preciso ser administrador para banir membros do grupo.");
      return;
    }

    // Remove os usuários mencionados
    const response = await chico.groupParticipantsUpdate(
      from, // ID do grupo
      mentions, // IDs dos participantes mencionados
      "remove" // Ação: remover
    );

    console.log("Participantes removidos com sucesso:", response);
    await enviarTexto("Usuário(s) removido(s) com sucesso!");
  } catch (error) {
    console.error("Erro ao tentar banir participantes:", error);
    await enviarTexto("Ocorreu um erro ao tentar banir os usuários.");
  }
}
