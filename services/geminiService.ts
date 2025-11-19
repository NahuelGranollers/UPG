import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const REQUEST_TIMEOUT = 30000; // 30 seconds

const getAiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const isRetryableError = (error: any): boolean => {
  // Retry on network errors, timeouts, or 5xx server errors
  if (!error) return false;
  
  const errorMessage = error.message?.toLowerCase() || '';
  const errorStatus = error.status || error.code;
  
  // Network errors
  if (errorMessage.includes('network') || errorMessage.includes('timeout') || errorMessage.includes('fetch')) {
    return true;
  }
  
  // Server errors (5xx)
  if (errorStatus >= 500 && errorStatus < 600) {
    return true;
  }
  
  // Rate limiting (429)
  if (errorStatus === 429) {
    return true;
  }
  
  return false;
};

export const generateBotResponse = async (
  history: { role: string; content: string }[],
  userMessage: string
): Promise<string> => {
  const client = getAiClient();
  if (!client) {
    return "⚠️ Error: La API Key de Gemini no está configurada. Contacta a un administrador.";
  }

  // Validate input
  if (!userMessage || !userMessage.trim()) {
    return "Por favor, escribe un mensaje válido.";
  }

  if (userMessage.length > 2000) {
    return "El mensaje es demasiado largo. Por favor, acórtalo.";
  }

  // Construct a simple prompt context
  const systemInstruction = `
    Eres UPG Bot, un asistente útil y amigable para la comunidad de Discord llamada UPG (United Player Group).
    Tu tono es casual, gamer y divertido.
    Ayudas a los usuarios con dudas sobre el servidor, videojuegos o simplemente charlando.
    Responde de manera concisa, como un mensaje de chat de Discord.
    No uses formato markdown complejo, solo texto plano o negritas simples.
    Mantén las respuestas cortas (máximo 300 palabras).
  `;

  // Build contents array with history and current message
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

  let lastError: any = null;

  // Retry logic
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT);
      });

      // Race between the API call and timeout
      const response = await Promise.race([
        client.models.generateContent({
          model: 'gemini-2.0-flash-exp',
          contents: contents,
          config: {
            systemInstruction: systemInstruction
          }
        }),
        timeoutPromise
      ]);

      const responseText = response.text?.trim();
      
      if (!responseText) {
        return "Lo siento, no pude generar una respuesta. Intenta reformular tu pregunta.";
      }

      // Limit response length
      if (responseText.length > 2000) {
        return responseText.substring(0, 1997) + "...";
      }

      return responseText;
    } catch (error: any) {
      lastError = error;
      console.error(`Gemini API Error (attempt ${attempt}/${MAX_RETRIES}):`, error);

      // Don't retry on non-retryable errors
      if (!isRetryableError(error)) {
        break;
      }

      // If not the last attempt, wait before retrying
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY * attempt; // Exponential backoff
        await sleep(delay);
      }
    }
  }

  // All retries failed
  const errorMessage = lastError?.message?.toLowerCase() || '';
  
  if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
    return "⚠️ Lo siento, he alcanzado mi límite de uso. Intenta más tarde.";
  }
  
  if (errorMessage.includes('api key') || errorMessage.includes('authentication')) {
    return "⚠️ Error de autenticación. Contacta a un administrador.";
  }
  
  if (errorMessage.includes('timeout')) {
    return "⏱️ La solicitud tardó demasiado. Intenta de nuevo con un mensaje más corto.";
  }

  return "😅 Parece que mis circuitos están fritos. Intenta más tarde o reformula tu pregunta.";
};