// caching + request dedup
import { generateContent } from "../helper/gemini/generateContent";

const promptCache = new Map();
const inFlightRequests = new Map();

const extractGeneratedText = (response) => {
  const generatedText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!generatedText) {
    throw new Error("No component code returned by Gemini.");
  }
  return generatedText;
};

const getCacheKey = (query) => query.trim();

export const fetchGeneratedComponentCode = async (query) => {
  const cacheKey = getCacheKey(query);
  return fetchGeneratedComponentCodeWithOptions(cacheKey);
};

const fetchGeneratedComponentCodeWithOptions = async (
  cacheKey,
  { forceRefresh = false } = {}
) => {
  if (!forceRefresh && promptCache.has(cacheKey)) {
    return promptCache.get(cacheKey);
  }

  if (!forceRefresh && inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  const requestPromise = generateContent(cacheKey)
    .then((response) => {
      const generatedText = extractGeneratedText(response);
      promptCache.set(cacheKey, generatedText);
      return generatedText;
    })
    .finally(() => {
      inFlightRequests.delete(cacheKey);
    });

  inFlightRequests.set(cacheKey, requestPromise);

  return requestPromise;
};

export const fetchGeneratedComponentCodeFresh = async (query) => {
  const cacheKey = getCacheKey(query);
  promptCache.delete(cacheKey);
  inFlightRequests.delete(cacheKey);
  return fetchGeneratedComponentCodeWithOptions(cacheKey, { forceRefresh: true });
};

export const clearPromptCacheEntry = (query) => {
  const cacheKey = getCacheKey(query);
  promptCache.delete(cacheKey);
  inFlightRequests.delete(cacheKey);
};

export const clearComponentGenerationCache = () => {
  promptCache.clear();
  inFlightRequests.clear();
};
