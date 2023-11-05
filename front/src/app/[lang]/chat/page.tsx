"use server";
import { Metadata } from "next";
import { validateSession } from "./actions";
import { Chat } from "./chat";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Chat page",
  };
}

export type Message = {
  MessageId: number;
  Message: string;
  SentBy: string;
  SentAt: string;
};

export default async function Page() {
  await validateSession();
  const wsPath = `ws://${new URL(process.env.SERVER_URL!).host}/ws/chat`;

  const historyResponse = await fetch(`${process.env.SERVER_URL}/chat/history`);
  const chatHistory = (await historyResponse.json()) as Message[];

  return (
    <main className="container mx-auto">
      <h2 className="text-2xl">Chat page</h2>
      <Chat wsPath={wsPath} chatHistory={chatHistory} />
    </main>
  );
}
