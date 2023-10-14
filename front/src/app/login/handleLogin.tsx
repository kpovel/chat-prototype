"use server";

import { redirect } from "next/navigation";

export async function handleLogin(login: string, password: string): Promise<string> {
  const response = await fetch(`${process.env.SERVER_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    redirect("/chat");
  }

  return response.text();
}
