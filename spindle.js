// index.js
function activate(spindle) {
  const dispose = spindle.tools.register({
    name: "web_search",
    label: "Inline Web Search",
    description: "Search the live web using SearXNG. Call this tool ONLY when the user asks for current events, post-cutoff facts, live information, or explicit web research.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "A concise, keyword-focused search query."
        }
      },
      required: ["query"]
    },
    execute: async (args) => {
      console.log("=== SEARXNG TOOL TRIGGERED ===", args.query);
      try {
        const response = await spindle.webSearch.query({
          query: args.query,
          limit: 5,
          scrapeContent: true
        });
        return response.formattedContext || JSON.stringify(response.results, null, 2);
      } catch (error) {
        console.error("Search failed:", error);
        return "Web search failed or timed out. Inform the user.";
      }
    }
  });
  return () => dispose();
}
export {
  activate
};
