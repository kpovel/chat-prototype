"use client";

import { useEffect } from "react";
import { Message } from "./message";

export function ChatHistory() {
  useEffect(() => {
    document.getElementById("message-end")!.scrollIntoView();
  }, []);

  return (
    <div className="flex flex-col gap-2 py-3 my-auto overflow-y-scroll h-full">
      <Message
        message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae"
        author="user1"
        sentAt="2021-10-10 10:10:10"
      />

      {/* Dummy div to scroll to */}
      <div id="message-end" />
    </div>
  );
}
