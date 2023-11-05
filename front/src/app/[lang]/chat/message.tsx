"use client";

import { Message } from "./page";

export function MessageView({ message }: { message: Message }) {
  return (
    <div className="flex gap-2 flex-col border rounded-md p-2">
      <div>
        <div className="font-bold">{message.SentBy}</div>
        <div className="text-gray-500">{message.SentAt}</div>
      </div>
      <div className="flex-grow">{message.Message}</div>
    </div>
  );
}
