import { sendMessage, getChat, getMessages } from "../apis/chat.api.js";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import {
  addmessages,
  addnewmessage,
  createnewchat,
  setchat,
  setCurrentChatId,
  setLoading,
} from "../states/chat.slice.js";

const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));

    const data = await sendMessage({ message, chatId });

    const { chat, aimessage } = data;

    dispatch(
      createnewchat({
        chatId: chat._id,
        title: chat.title,
      }),
    );

    dispatch(addnewmessage({
      chatId:chat._id,
      content:message,
      role:"user"
    }))

    dispatch(addnewmessage({
      chatId:chat._id,
      content:aimessage.content,
      role:aimessage.role
    }))

    dispatch(setCurrentChatId(chat._id));
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
    const formattedMessages = messages.map((message) => ({
      content: message.content,
      role: message.roles,
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
