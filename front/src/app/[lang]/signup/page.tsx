import Link from "next/link";
import { SignupForm } from "./signupForm";
import { cookies } from "next/headers";
import { getDictionary } from "../dictionaries";

export default async function Signup() {
  const lang = cookies().get("lang")!.value;
  const content = await getDictionary(`/signup/${lang}`);

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
