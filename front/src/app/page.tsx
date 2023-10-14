import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h2>Chat prototype</h2>
      <div className="flex gap-4">
        <Link href="/login" className="p-1 px-3 border rounded-xl bg-gray-400">
          Login
        </Link>
        <Link href="/signup" className="p-1 px-3 border rounded-xl bg-gray-400">
          Signup
        </Link>
      </div>
    </main>
  );
}
