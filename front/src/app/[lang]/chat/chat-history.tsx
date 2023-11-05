"use client";

import { useEffect } from "react";
import { Message } from "./page";
import { MessageView } from "./message";

export const ChatHistory = function ChatHistory({
  history,
}: {
  history: Message[];
}) {
  useEffect(() => {
    document.getElementById("message-end")!.scrollIntoView();
  }, [history]);

  return (
    <div className="flex flex-col gap-2 py-3 my-auto overflow-y-scroll h-full">
      {history.map((m) => {
        return <MessageView key={m.MessageId} message={m} />;
      })}

      {/* Dummy div to scroll to */}
      <div id="message-end" />
    </div>
  );
};
