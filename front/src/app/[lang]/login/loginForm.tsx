"use client";
import { FormEvent, useState } from "react";
import { handleLogin } from "./handleLogin";

export function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorMessage = await handleLogin(login, password);
    setErrorMessage(errorMessage);
  }

  return (
    <form className="flex flex-col gap-2 py-3" onSubmit={handleSubmit}>
      <label>
        Login
        <input
          type="text"
          placeholder="Login"
          className="border"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="Password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="max-w-xs border">
        Login
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
}
