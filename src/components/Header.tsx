import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export type Tab = "home" | "practice" | "cbt" | "resources" | "discussions";

const NAV_ITEMS: { id: Tab; label: string; icon: string }[] = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "practice", label: "Practice", icon: "⚡" },
  { id: "cbt", label: "CBT / PYQ", icon: "🖥" },
  { id: "resources", label: "Resources", icon: "📚" },
  { id: "discussions", label: "Discussions", icon: "💬" },
];

export default function Header({
  active,
  onNavigate,
}: {
  active: Tab;
  onNavigate: (tab: Tab) => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 text-lg shadow-md shadow-teal-500/30">
            🩺
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
              MedStudentHub
            </span>
            <span className="text-[11px] font-medium text-teal-600 dark:text-teal-400">
              FMGE · NEET-PG · INI-CET
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1 md:flex dark:border-slate-800 dark:bg-slate-900">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                active === item.id
                  ? "bg-white text-teal-700 shadow-sm dark:bg-slate-800 dark:text-teal-300"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-lg transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a
            href="https://t.me/intellectnest"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-md shadow-teal-500/20 transition-transform hover:scale-105 sm:flex"
          >
            📢 Join Telegram
          </a>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-lg md:hidden dark:border-slate-800"
            aria-label="Open menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMenuOpen(false);
                }}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold ${
                  active === item.id
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <a
              href="https://t.me/intellectnest"
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 px-3 py-2 text-sm font-semibold text-white"
            >
              📢 Join our Telegram Channel
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
