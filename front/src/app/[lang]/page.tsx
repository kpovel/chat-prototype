"use server";
import Link from "next/link";
import { getDictionary } from "./dictionaries";

export default async function Home({ params }: { params: { lang: string } }) {
  const content = await getDictionary(`/${params.lang}`);

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
