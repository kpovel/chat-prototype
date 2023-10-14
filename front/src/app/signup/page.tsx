import Link from "next/link";

export default function Signup() {
  return (
    <main>
      <h2>Signup page</h2>
      {/* SignupForm */}
      <div>
        Already have an accound?{" "}
        <Link href="/login" className="text-purple-500">
          Login instead
        </Link>
      </div>
    </main>
  );
}
