"use client";

import { memo, useEffect } from "react";
import { Message } from "./message";

export const ChatHistory = function ChatHistory({
  history,
}: {
  history: { message: string; sentAt: string; author: string }[];
}) {
  useEffect(() => {
    document.getElementById("message-end")!.scrollIntoView();
  }, []);

  return (
    <div className="flex flex-col gap-2 py-3 my-auto overflow-y-scroll h-full">
      {history.map((m) => {
        return (
          <Message
            key={m.sentAt}
            message={m.message}
            author={m.author}
            sentAt={m.sentAt}
          />
        );
      })}

      {/* Dummy div to scroll to */}
      <div id="message-end" />
    </div>
  );
}
