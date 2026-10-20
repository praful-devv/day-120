import { ChatGoogle } from "@langchain/google/node";

const model = new ChatGoogle({
  model: "gemini-3.7-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function testAi(){  
const res =  await model.invoke("what was my first message")
console.log(res.text)
    
}