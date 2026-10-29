import { useEffect, useState } from "react";
import useChat from "../hooks/useChat";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

const Home = () => {
  const [message, setMessage] = useState("");

  const {
    initializedSocketConnection,
    handleSendMessage,
    handleGetchats,
    handleopenchat,
  } = useChat();

  const { chats, currentChatId, isLoading, error } = useSelector(
    (store) => store.chat,
  );

  useEffect(() => {
    initializedSocketConnection();
    handleGetchats();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const sent = await handleSendMessage({
      message: message,
      chatId: currentChatId,
    });

    if (sent) setMessage("");
  };

  const openchat =(chatid)=>{
    handleopenchat(chatid)
  }

  return (
    <main className="grid h-dvh min-h-0 grid-cols-[1fr_5fr] overflow-hidden">
      <aside className="hidden min-h-0 flex-col overflow-y-auto border-r border-s-gray-500 bg-gray-100 md:flex">
        {Object.values(chats).map((chat, index) => (
          <button
            onClick={() => openchat(chat.id)}
            className="rounded border cursor-pointer px-3 py-2 text-left text-black"
            key={chat.id ?? index}
            type="button"
          >
            {chat.title}
          </button>
        ))}
      </aside>

      <section className="flex  flex-col overflow-hidden w-screen md:w-full">
        <div className="min-h-0 min-w-0 grow overflow-y-auto overflow-x-hidden bg-gray-100">
          {(chats[currentChatId]?.message ?? []).map((chatMessage, index) => {
            if (!chatMessage || typeof chatMessage !== "object") return null;

            const role = chatMessage?.role;
            const isUserMessage = role === "user";

            return (
              <div
                key={chatMessage.id ?? `${role ?? "message"}-${index}`}
                className={`my-2 w-fit max-w-[90%] break-words rounded text-sm md:text-md ${
                  isUserMessage
                    ? "ml-auto rounded-br-none bg-white/12 text-white"
                    : "mr-auto border border-white/25"
                }`}
              >
                {isUserMessage ? (
                  <p className="m-2 w-fit max-w-full whitespace-pre-wrap rounded-2xl bg-gray-500 p-2 text-black">
                    {chatMessage.content}
                  </p>
                ) : (
                  <div className="markdown-content m-2 max-w-full overflow-x-auto break-words rounded-2xl bg-gray-500 p-2 text-black">
                    <ReactMarkdown>{chatMessage.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex shrink-0 items-center justify-center gap-4  bg-gray-100 p-4"
        >
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            type="text"
            className="h-fit  w-full max-w-[30rem] rounded-2xl border p-2"
            placeholder="Ask"
          />
          <button type="submit" className="shrink-0" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
        {error && (
          <p className="px-4 pb-3 text-center text-red-600" role="alert">
            {error}
          </p>
        )}
      </section>
    </main>
  );
};

export default Home;
