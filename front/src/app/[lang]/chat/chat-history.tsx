"use client";

import { useEffect } from "react";
import { Message } from "./message";
import { MessageResponse } from "./chat";

export const ChatHistory = function ChatHistory({
  history,
}: {
  history: MessageResponse[];
}) {
  useEffect(() => {
    document.getElementById("message-end")!.scrollIntoView();
  }, [history]);

  return (
    <div className="flex flex-col gap-2 py-3 my-auto overflow-y-scroll h-full">
      {history.map((m) => {
        return (
          <Message
            key={m.messageId}
            message={m}
          />
        );
      })}

      {/* Dummy div to scroll to */}
      <div id="message-end" />
    </div>
  );
}
