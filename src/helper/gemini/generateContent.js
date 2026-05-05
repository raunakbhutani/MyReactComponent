// API call
import { geminiClient } from "./client";
import { buildComponentPrompt } from "./prompt";

const MODEL_NAME = "gemini-3-flash-preview";

const GENERATION_CONFIG = {
  temperature: 0.1,
  maxOutputTokens: 8000
};

export const generateContent = async (userQuery) => {
  const prompt = buildComponentPrompt(userQuery);

  const response = await geminiClient.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: GENERATION_CONFIG,
  });

  return response;
};

