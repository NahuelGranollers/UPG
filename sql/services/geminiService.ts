import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const generateBotResponse = async (
  history: { role: string; content: string }[],
  userMessage: string
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "Error: API Key not configured properly.";
  }

  try {
    const model = client.models;
    
    // Construct a simple prompt context
    const systemInstruction = `
      Eres UPG Bot, un asistente útil y amigable para la comunidad de Discord llamada UPG (United Player Group).
      Tu tono es casual, gamer y divertido.
      Ayudas a los usuarios con dudas sobre el servidor, videojuegos o simplemente charlando.
      Responde de manera concisa, como un mensaje de chat de Discord.
      No uses formato markdown complejo, solo texto plano o negritas simples.
    `;

    const contents = [
        ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        })),
        {
            role: 'user',
            parts: [{ text: userMessage }]
        }
    ];

    const response = await model.generateContent({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });

    return response.text || "Lo siento, tuve un error procesando eso.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Parece que mis circuitos están fritos (Error de API). Intenta más tarde.";
  }
};