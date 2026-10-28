import { Api } from "../../../../config/axios";

export const sendMessage = async ({ message, chatId }) => {
  const response = await Api.post("/chat/message", { message, chatId });
  console.log(response.data)
  return response.data;
};

export const getChat = async () => {
  const response = await Api.get("/chat");
  return response.data;
};

export const getMessages = async (chatId) => {
  const response = await Api.get(`/chat/${chatId}/messages`);

  return response.data;
};
