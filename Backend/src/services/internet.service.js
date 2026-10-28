import tavily from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY });

export const searchInternet = async (query) => {
  return await tavily.search(query, {
    searchDepth: "basic",
  });
};

console.log(response);
