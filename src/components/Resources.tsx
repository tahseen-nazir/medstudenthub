import { useState } from "react";
import Heading from "./Heading";
import { resourceLinks, resourceCategories } from "../data/resources";

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const categories = ["All", ...resourceCategories];

  const filtered =
    activeCategory === "All" ? resourceLinks : resourceLinks.filter((r) => r.category === activeCategory);

  return (
    <div className="mx-auto max-w-5xl">
      <Heading n={10} title="Curated Resources" subtitle="Hand-picked links to official exam bodies, references and high-yield study material." />

      {/* Telegram feature card */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 justify-center">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-xs font-bold text-white shadow-md">
            12
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Join Our Telegram Community</h3>
        </div>
        <a
          href="https://t.me/intellectnest"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center gap-4 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-indigo-50 p-7 text-center shadow-sm transition-transform hover:scale-[1.01] sm:flex-row sm:text-left dark:border-teal-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"
        >
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 text-3xl text-white shadow-lg">
            ✈️
          </span>
          <div className="flex-1">
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">IntellectNest — t.me/intellectnest</h4>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Get daily MCQs, PYQ discussions, exam alerts, and free high-yield notes directly on Telegram. Join thousands of
              fellow medical aspirants preparing for FMGE, NEET-PG & INI-CET.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform group-hover:scale-105">
            Join Channel →
          </span>
        </a>
      </div>

      {/* Category filter */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              activeCategory === c
                ? "bg-gradient-to-r from-teal-500 to-indigo-600 text-white shadow-md"
                : "border border-slate-300 text-slate-600 hover:border-teal-400 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((r) => (
          <a
            key={r.title}
            href={r.url}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/10 to-indigo-600/10 text-2xl">
              {r.icon}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="truncate text-sm font-bold text-slate-900 dark:text-white">{r.title}</h4>
                <span className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-teal-500">→</span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{r.description}</p>
              <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {r.category}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
