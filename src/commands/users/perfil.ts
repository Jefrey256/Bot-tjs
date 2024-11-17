import { CommandData } from "../../interface";
import { setupMessagingServices } from "../../exports/message";
import { extractMessage } from "../../exports/message";

export async function perfil(chico, from, messageDetails) {
  function geraNumero() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Corrigir: A extração correta do nome de usuário e número
  const { userName, fromUser } = extractMessage(messageDetails);
  const { enviarTexto, enviarImagem } = setupMessagingServices(chico, from, messageDetails);

  const imageUrl = "https://api.telegram.org/file/bot7893516891:AAEzMszRACX92hdaRXwxzAtLL9QfHOXeiTI/photos/file_3.jpg";

  try {
    const perfilMenuText = `
    ==== *Menu de Perfil* ====
    👤 Nome: ${userName}
    📱 Número: ${fromUser}
    🤖 Inteligência: ${geraNumero()}%
    🙃 Burrice: ${geraNumero()}%

    🔽 *Escolha uma opção:*
    1️⃣ Atualizar Foto de Perfil
    2️⃣ Ver Estatísticas
    3️⃣ Alterar Nome
    4️⃣ Sair do Menu

    Digite o número da opção para continuar.
    `;

    // Envia a imagem com a legenda, incluindo o nome de usuário
    await chico.sendMessage(from, {
      image: { url: imageUrl },
      caption: perfilMenuText, // Texto com nome de usuário incluído
    }, { quoted: messageDetails });

  } catch (error) {
    console.log("Erro ao executar o comando 'perfil':", error);
  }
}
