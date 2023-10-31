"use client";

import { SyntheticEvent, useMemo, useState } from "react";
import { ChatHistory } from "./chat-history";

export function Chat({ wsPath }: { wsPath: string }) {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<
    { message: string; sentAt: string; author: string }[]
  >([]);
  // todo: load chat history

  const ws = useMemo(() => {
    const ws = new WebSocket(wsPath);
    ws.onerror = function (error) {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = function (event) {
      console.log("WebSocket Closed:", event);
    };

    ws.onmessage = function (e) {
      setHistory((p) => {
        return [
          ...p,
          {
            message: e.data,
            sentAt: new Date().toDateString(),
            author: "author1",
          },
        ];
      });
    };

    return ws;
  }, [wsPath]);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    ws.send(message);
    setMessage("");
  }

  return (
    <div className="p-3 h-[80vh] min-h-96 w-96 border rounded-lg flex flex-col gap-3">
      <div className="border rounded-lg h-full p-3">
        <ChatHistory history={history} />
      </div>
      <form
        className="flex flex-row gap-2"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          className="grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="border grow-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}
