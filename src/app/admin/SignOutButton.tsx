"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className={`px-4 py-2 rounded-md border border-primary/30 text-left hover:bg-primary hover:text-white hover:border-primary transition-colors ${className}`}
    >
      Sign out
    </button>
  );
}
