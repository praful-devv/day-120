import { ChatGoogle } from "@langchain/google/node";
import { createAgent, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const model = new ChatGoogle({
  model: "gemini-3.7-flash",
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

export async function testAi() {
  const res = await agent.invoke({
    messages: [
      {
        role: "user",
        content:
          "send email to prafulanilwankhade3010@gmail.com and send about how to land fullstck developer job at big companies ",
      },
    ],
  });
  return res
}
