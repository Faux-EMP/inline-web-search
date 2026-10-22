export function activate(spindle) {
  const dispose = spindle.tools.register({
    name: "web_search",
    label: "Inline Web Search",
    description: "Search the live web using SearXNG. Call this tool ONLY when the user asks for current events, post-cutoff facts, live information, or explicit web research. Do NOT call this tool during casual chat, creative writing, or roleplay.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A concise, keyword-focused search query."
        },
        limit: {
          type: "number",
          description: "Number of results to fetch (default 5, max 10)."
        }
      },
      required: ["query"]
    },
    execute: async (args) => {
      const response = await spindle.webSearch.query({
        query: args.query,
        limit: args.limit || 5,
        scrapeContent: true
      });
      return response.formattedContext || JSON.stringify(response.results, null, 2);
    }
  });

  return () => dispose();
}