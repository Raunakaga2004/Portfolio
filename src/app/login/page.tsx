"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-backgroundcolor px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", { username, password, callbackUrl: "/admin" });
        }}
        className="w-full max-w-sm bg-secondary rounded-xl shadow-lg p-8 flex flex-col gap-4"
      >
        <h1 className="text-xl font-semibold text-fortext text-center mb-2">
          Sign in
        </h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          autoFocus
          className="rounded-md border border-primary/30 bg-backgroundcolor text-fortext px-4 py-2 outline-none focus:border-primary transition-colors"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-md border border-primary/30 bg-backgroundcolor text-fortext px-4 py-2 outline-none focus:border-primary transition-colors"
        />
        <button
          type="submit"
          className="mt-2 rounded-md bg-primary text-white font-medium px-4 py-2 hover:opacity-90 transition-opacity cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
