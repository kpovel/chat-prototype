import Link from "next/link";
import { LoginForm } from "./loginForm";

export default function Login() {
  return (
    <main>
      <h2>Login page</h2>
      <LoginForm />
      <div>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-purple-500">
          Signup instead
        </Link>
      </div>
    </main>
  );
}
