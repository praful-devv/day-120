import { ChatGoogle } from "@langchain/google/node";

const model = new ChatGoogle({
  model: "gemini-3.7-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function testAi(){
    model.invoke("what is capital of india")
    .then((res)=>{console.log(res.text)})
}