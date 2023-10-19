import Link from "next/link";
import { SignupForm } from "./signupForm";
import { cookies } from "next/headers";
import {promises as fs} from "fs";

async function pageContent(lang: string) {
  const fileContent = await fs.readFile(
    `${process.cwd()}/src/app/[lang]/signup/${lang}.json`,
    "utf8",
  );
  return JSON.parse(fileContent);
}

export default async function Signup() {
  const lang = cookies().get("lang")!.value;
  const content = await pageContent(lang);

  return (
    <main>
      <h2>{content.pageHeader}</h2>
      <SignupForm />
      <div>
        {content.haveAccount}{" "}
        <Link href={`/${lang}/login`} className="text-purple-500">
          {content.instead}
        </Link>
      </div>
    </main>
  );
}
