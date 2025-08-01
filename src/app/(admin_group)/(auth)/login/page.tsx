"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/admin", // to go to after login
    });
  };

  return (
    <div className="p-8 mx-auto h-screen w-screen flex flex-col justify-center items-center">
      <div className="border-b border-r border-slate-400 min-w-sm max-w-[50%] px-6 py-10 rounded-lg bg-slate-100 flex flex-col gap-2">
        <h1 className="text-2xl mb-4 text-center font-semibold">Admin Login</h1>
        <input
          className="border rounded-lg p-2 w-full mb-2"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border rounded-lg p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 w-full"
        >
          Sign In
        </button>
      </div>
      
    </div>
  );
}