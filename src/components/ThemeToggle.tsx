"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// `inline` renders it in-flow (the admin nav places it there); otherwise it floats top-right on every page but /admin.
export default function ThemeToggle({ inline = false }: { inline?: boolean }){
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const initial = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    // keep same-origin iframes (the admin preview) in sync
    document.querySelectorAll("iframe").forEach((f) => f.contentDocument?.documentElement.setAttribute("data-theme", next));
  };

  if (!inline && pathname.startsWith("/admin")) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`${inline ? "" : "fixed top-4 right-4 z-50"} text-fortext border border-primary rounded-full p-2 hover:bg-primary hover:text-backgroundcolor transition-colors`}
    >
      {theme === "dark" ? (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
        </svg>
      ) : (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>
        </svg>
      )}
    </button>
  );
}
