import { sendMessage ,getChat,getMessages} from '../apis/chat.api.js';
import {initializedSocketConnection} from '../service/chat.socket.js'
import {useDispatch} from "react-redux"
import { setchat, setCurrentChatId, setLoading } from '../states/chat.slice.js';

const useChat = () => {

  const dispatch = useDispatch()
  
 async function handleSendMessage({message,chatId}){

    dispatch(setLoading(true))

    const data = await sendMessage({message,chatId})

    const {chat , aimessage} = data

    dispatch(setchat((prev)=>{
      return {
        ...prev,
        [chat._id]:{
          ...chat,
          messages:[{content:message,role:"user"},aimessage]
        }
      }
    }))

    dispatch(setCurrentChatId(chat._id))


  }

  return { initializedSocketConnection,handleSendMessage };
};

export default useChat;
