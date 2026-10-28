import { sendMessage, getChat, getMessages } from "../apis/chat.api.js";
import { initializedSocketConnection } from "../service/chat.socket.js";
import { useDispatch } from "react-redux";
import {
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

  return { initializedSocketConnection, handleSendMessage };
};

export default useChat;
