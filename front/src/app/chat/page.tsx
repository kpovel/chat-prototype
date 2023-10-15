"use server";
import { validateSession } from "./actions";

export default async function Chat() {
  await validateSession();

  return (
    <main>
      <h2>Chat page</h2>
      <div>Your session is verified</div>
    </main>
  );
}
