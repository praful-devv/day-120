import { tavily } from "@tavily/core";

export const searchInternet = async ({ query }) => {
  const apiKey = process.env.TAVILY_API_KEY || process.env.TAVILY;
  if (!apiKey) {
    throw new Error("Tavily is not configured. Set TAVILY_API_KEY.");
  }

  if (typeof query !== "string" || !query.trim()) {
    throw new Error("A non-empty search query is required.");
  }

  const client = tavily({ apiKey });
  const result = await client.search(query.trim(), {
    maxResults: 5,
    searchDepth: "basic",
    includeAnswer: true,
  });

  return JSON.stringify({
    answer: result.answer,
    query: result.query,
    results: result.results.map(({ title, url, content, score, publishedDate }) => ({
      title,
      url,
      content,
      score,
      publishedDate,
    })),
  });
};
