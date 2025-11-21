// ⚠️ SERVICIO NO UTILIZADO - La lógica del bot ahora está en el backend (server/index.js)
// El bot responde automáticamente cuando se le menciona con @upg usando Hugging Face API gratuita

// Este archivo se mantiene por compatibilidad pero no se usa en producción
// Para modificar el comportamiento del bot, edita server/index.js

export const generateBotResponse = async (
  history: { role: string; content: string }[],
  userMessage: string
): Promise<string> => {
  return "⚠️ Este servicio ya no se usa. El bot ahora responde automáticamente cuando se menciona @upg en el chat.";
};