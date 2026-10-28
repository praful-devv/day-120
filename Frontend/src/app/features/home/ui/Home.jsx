import { useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import { useSelector } from "react-redux";

const Home = () => {
  const [message, setmessage] = useState("");

  const { initializedSocketConnection, handleSendMessage } = useChat();

  const { chats, currentChatId } = useSelector((store) => store.chat);

  useEffect(() => {
    initializedSocketConnection();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    handleSendMessage({
      message: message,
      chatId: currentChatId,
    });

    setmessage("");
  };

  return (
    <main className="h-screen grid grid-cols-[1fr_5fr] ">
      <aside className="bg-gray-100 hidden md:flex border-r border-s-gray-500">
        d
      </aside>

      <section className="flex flex-col w-screen md:w-auto  overflow-auto">
        <div className="grow bg-gray-100  overflow-auto">
          {chats[currentChatId]?.message?.map((message) => {
            return (
              <div
                key={message.id}
                className={`w-fit  rounded text-sm md:text-md ${message.role === "user" ? "ml-auto rounded-br-none bg-white/12 text-white" : "mr-auto border border-white/25 "}

            `}
              >
                <p
                  className={`text-black bg-gray-500 p-2 m-2 w-fit rounded-2xl`}
                >
                  {message.content}
                </p>
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="h-30 flex justify-center items-center bg-gray-100 p-4 gap-4"
        >
          <input
            onChange={(e) => setmessage(e.target.value)}
            value={message}
            type="text"
            className="border w-120 h-fit p-2 rounded-2xl "
            placeholder="Ask"
          />
          <button>Send</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
