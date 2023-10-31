"use server";
import { Metadata } from "next";
import { validateSession } from "./actions";
import { Chat } from "./chat";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Chat page',
  }
}

export default async function Page() {
  await validateSession();

  // todo: load chat history

  return (
    <main className="container mx-auto">
      <h2 className="text-2xl">Chat page</h2>
      <Chat />
    </main>
  );
}
