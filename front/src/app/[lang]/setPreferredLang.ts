"use server";
import { cookies } from "next/headers";

export async function setPreffredLang(lang: string) {
  cookies().set("lang", lang);
}
