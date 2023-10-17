"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleLogin(
  login: string,
  password: string,
): Promise<string> {
  const response = await fetch(`${process.env.SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
  });

  if (response.ok) {
    const cookieHeader = response.headers.getSetCookie()[0];
    const cleanHeader = cookieHeader.replace("session=", "");
    const semicolonIndex = cleanHeader.indexOf(";");
    const sessionToken = cleanHeader.substring(0, semicolonIndex);

    cookies().set("session", sessionToken, {
      path: "/",
      httpOnly: true,
      maxAge: 86400 * 30,
    });

    redirect("/chat");
  }

  return response.text();
}
