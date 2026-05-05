//  Gemini client init
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("Missing VITE_GOOGLE_API_KEY. Gemini requests will fail until it is set.");
}

export const geminiClient = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
