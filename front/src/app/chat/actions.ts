"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function validateSession() {
  const session = cookies().get("session");
  if (!session) {
    redirect("/");
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL}/auth/validate`, {
      cache: "no-store",
      headers: {
        Cookie: `session=${session.value}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      cookies().delete("session");
      redirect("/");
    }

    return response.text();
  } catch (e) {
    console.log("Error deeznuts:", e);
    redirect("/");
  }
}
