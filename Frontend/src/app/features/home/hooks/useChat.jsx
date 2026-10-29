import { sendMessage, getChat, getMessages } from "../apis/chat.api.js";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import {
  addmessages,
  addnewmessage,
  createnewchat,
  setError,
  setchat,
  setCurrentChatId,
  setLoading,
} from "../states/chat.slice.js";

const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const data = await sendMessage({ message, chatId });

      const { chat, aimessage } = data;
      const assistantRole = aimessage?.roles ?? aimessage?.role;

      if (
        !chat?._id ||
        typeof aimessage?.content !== "string" ||
        typeof assistantRole !== "string"
      ) {
        throw new Error("The chat server returned an incomplete response.");
      }

      dispatch(
        createnewchat({
          chatId: chat._id,
          title: chat.title,
        }),
      );

      dispatch(
        addnewmessage({
          chatId: chat._id,
          content: message,
          role: "user",
        }),
      );

      dispatch(
        addnewmessage({
          chatId: chat._id,
          content: aimessage.content,
          role: assistantRole,
        }),
      );

      dispatch(setCurrentChatId(chat._id));
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ??
        (error.response?.status
          ? `Request failed (${error.response.status}). Please try again.`
          : error.message || "Unable to send your message. Please try again.");
      dispatch(setError(message));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetchats() {
    dispatch(setLoading(true));
    try {
      const { chats } = await getChat();
      dispatch(
        setchat(
          chats.reduce((chatMap, chat) => {
            chatMap[chat._id] = {
              id: chat._id,
              title: chat.title,
              message: [],
              lastUpdate: chat.updatedAt,
            };
            return chatMap;
          }, {}),
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleopenchat(chatId) {
    const { messages } = await getMessages(chatId);
    const formattedMessages = messages
      .filter(
        (message) =>
          message &&
          typeof message.content === "string" &&
          typeof (message.roles ?? message.role) === "string",
      )
      .map((message) => ({
        content: message.content,
        role: message.roles ?? message.role,
      }));

    dispatch(
      addmessages({
        chatId,
        message: formattedMessages,
      }),
    );
    dispatch(setCurrentChatId(chatId));
  }

  return {
    initializedSocketConnection,
    handleSendMessage,
    handleGetchats,
    handleopenchat,
  };
};

export default useChat;
