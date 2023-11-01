"use client";

import { MessageResponse } from "./chat";

export function Message({
  message,
}: {
  message: MessageResponse
}) {
  return (
    <div className="flex gap-2 flex-col border rounded-md p-2">
      <div>
        <div className="font-bold">{message.sendBy}</div>
        <div className="text-gray-500">{message.sentAt}</div>
      </div>
      <div className="flex-grow">{message.message}</div>
    </div>
  );
}
