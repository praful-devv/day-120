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

export async function generateResponse(messages) {
  const res = await model.invoke(
    messages.map((msg) => {
      if (msg.roles == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.roles == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );
  return res.text;
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
