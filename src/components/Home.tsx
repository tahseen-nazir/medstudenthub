import Heading from "./Heading";
import type { Tab } from "./Header";
import { subjects, totalMcqCount } from "../data/mcqs";

const STATS = [
  { label: "MCQs in Question Bank", value: "5000+", icon: "📝" },
  { label: "PYQ / CBT Questions", value: "5000+", icon: "🖥" },
  { label: "Subjects Covered", value: `${subjects.length}+`, icon: "🧬" },
  { label: "Exams Supported", value: "4", icon: "🎯" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Quick Practice Quizzes",
    desc: "Build custom quizzes by subject, shuffled every time with instant scoring & explanations.",
  },
  {
    icon: "🖥",
    title: "Real CBT Exam Simulation",
    desc: "Timer, question palette and mark-for-review — practice exactly like the real FMGE/NEET-PG CBT.",
  },
  {
    icon: "📚",
    title: "Curated Resources",
    desc: "Hand-picked links to official bodies, references and high-yield study material.",
  },
  {
    icon: "💬",
    title: "Community Discussions",
    desc: "Debate answers, share mnemonics, and grow together with fellow aspirants.",
  },
];

export default function Home({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.15),_transparent_60%)]" />
        <div className="mx-auto max-w-3xl animate-fade-in text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-300">
            🩺 Built for future doctors
          </span>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-sm font-bold text-white shadow-md">
              2
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Your Path to <span className="bg-gradient-to-r from-teal-500 to-indigo-600 bg-clip-text text-transparent">Medical Exam Success</span>
            </h1>
          </div>
          <p className="mt-5 text-base text-slate-500 sm:text-lg dark:text-slate-400">
            Practice with a growing bank of <strong className="text-slate-700 dark:text-slate-200">5000+ MCQs</strong> and{" "}
            <strong className="text-slate-700 dark:text-slate-200">5000+ PYQ / CBT questions</strong> across FMGE, NEET-PG,
            INI-CET and AIIMS — with real exam-style simulation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate("practice")}
              className="rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-105"
            >
              ⚡ Start Practicing
            </button>
            <button
              onClick={() => onNavigate("cbt")}
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-transform hover:scale-105 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              🖥 Try CBT Exam Mode
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="animate-scale-in rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="text-2xl">{s.icon}</div>
              <div className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">{s.value}</div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
          Currently {totalMcqCount}+ hand-curated questions live in this build, growing weekly toward 5000+.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-1">
        <Heading n={4} title="Why MedStudentHub?" subtitle="Everything you need in one focused, distraction-free practice hub." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500/10 to-indigo-600/10 text-2xl">
                {f.icon}
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Telegram CTA banner */}
      <section className="mx-auto max-w-6xl px-1">
        <div className="flex flex-col items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 p-8 text-center shadow-xl sm:flex-row sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">📢 Join our Telegram community</h3>
            <p className="mt-1 text-sm text-slate-300">
              Daily MCQs, PYQ discussions & exam updates at <span className="font-semibold text-teal-300">t.me/intellectnest</span>
            </p>
          </div>
          <a
            href="https://t.me/intellectnest"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg transition-transform hover:scale-105"
          >
            Join @intellectnest →
          </a>
        </div>
      </section>
    </div>
  );
}
