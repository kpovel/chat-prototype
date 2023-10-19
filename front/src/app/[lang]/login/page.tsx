import Link from "next/link";
import { LoginForm } from "./loginForm";
import { cookies } from "next/headers";
import { getDictionary } from "../dictionaries";

export default async function Login() {
  const lang = cookies().get("lang")!.value;
  const content = await getDictionary(`/login/${lang}`);

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
