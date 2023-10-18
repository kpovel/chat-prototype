"use server";
import { promises as fs } from "fs";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "uk" }];
}

async function pageContent(lang: string) {
  const fileContent = await fs.readFile(
    `${process.cwd()}/src/app/[lang]/${lang}.json`,
    "utf8",
  );
  return JSON.parse(fileContent);
}

export default async function Home({ params }: { params: { lang: string } }) {
  const content = await pageContent(params.lang);

  return (
    <main>
      <h2>{content.pageHeader}</h2>
      <div className="flex gap-4">
        <Link
          href={`/${params.lang}/login`}
          className="p-1 px-3 border rounded-xl bg-gray-400"
        >
          {content.login}
        </Link>
        <Link
          href={`/${params.lang}/signup`}
          className="p-1 px-3 border rounded-xl bg-gray-400"
        >
          {content.signup}
        </Link>
      </div>
    </main>
  );
}
