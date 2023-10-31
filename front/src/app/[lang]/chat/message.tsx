"use client";

export function Message({
  message,
  author,
  sentAt,
}: {
  message: string;
  author: string;
  sentAt: string;
}) {
  return (
    <div className="flex gap-2 flex-col border rounded-md p-2">
      <div>
        <div className="font-bold">{author}</div>
        <div className="text-gray-500">{sentAt}</div>
      </div>
      <div className="flex-grow">{message}</div>
    </div>
  );
}
