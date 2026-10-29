import { ChatGoogle } from "@langchain/google/node";

import {
  createAgent,
  tool,
  SystemMessage,
  HumanMessage,
  AIMessage,
} from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const model = new ChatGoogle({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const emailtool = tool(sendEmail, {
  name: "email",
  description: "send email to user",
  schema: z.object({
    to: z.string().describe("user email"),
    html: z.string().describe("html content"),
    subject: z.string().describe("email subject"),
  }),
});

const agent = createAgent({
  model,
  tools: [emailtool],
});

const searchTool = tool(searchInternet, {
  name: "search_internet",
  description:
    "Search the web for current facts, news, or information explicitly requested by the user. Return relevant results with source URLs.",
  schema: z.object({
    query: z.string().describe("The search query to look up on the internet"),
  }),
});

const internetagent = createAgent({
  model,
  tools: [searchTool],
});

export async function generateResponse(messages) {
  const res = await internetagent.invoke({
    messages: [
      new SystemMessage(
        `You are a helpful assistant with access to the search_internet tool.

Web search instructions:
- You MUST call search_internet when the user explicitly asks you to search, look something up, or find sources.
- You MUST call search_internet for questions about current, latest, recent, or time-sensitive information, including news, weather, prices, schedules, and current events.
- Do not use web search for stable, general knowledge unless the user asks for it.
- Send a concise, specific search query that preserves the user's intent.
- Answer using the search results. Summarize the relevant findings and include the URLs returned by the tool as sources.
- If search returns no useful results or fails, say so clearly; do not invent facts or imply that a search succeeded.`,
      ),
      ...messages.map((msg) => {
        if (!msg || typeof msg.content !== "string") {
          throw new Error("Cannot generate a response from an invalid message.");
        }

        if (msg.roles === "user") return new HumanMessage(msg.content);
        if (msg.roles === "ai") return new AIMessage(msg.content);

        throw new Error(`Cannot generate a response for role "${msg.roles}".`);
      }),
    ],
  });

  const lastMessage = res.messages[res.messages.length - 1];
  if (!lastMessage) {
    throw new Error("The AI service returned no response message.");
  }

  return lastMessage.text;
}

export async function generateChatTitle(message) {
  const response = await model.invoke([
    new SystemMessage(
      "you are helpfull assistant that generates the title for chat conversation.based on user first message you generate hte title of chat conversation",
    ),
    new HumanMessage(message),
  ]);

  return response.text;
}
