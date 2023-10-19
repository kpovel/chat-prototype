import Link from "next/link";
import { LoginForm } from "./loginForm";
import { promises as fs } from "fs";
import { cookies } from "next/headers";

async function pageContent(lang: string) {
  const fileContent = await fs.readFile(
    `${process.cwd()}/src/app/[lang]/login/${lang}.json`,
    "utf8",
  );
  return JSON.parse(fileContent);
}

export default async function Login() {
  const lang = cookies().get("lang")!.value;
  const content = await pageContent(lang);

  return (
    <main>
      <h2>{content.pageHeader}</h2>
      <LoginForm />
      <div>
        {content.dontHaveAccount}{" "}
        <Link href={`/${lang}/signup`} className="text-purple-500">
          {content.instead}
        </Link>
      </div>
    </main>
  );
}
