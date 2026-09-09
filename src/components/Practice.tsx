import { useMemo, useState } from "react";
import Heading from "./Heading";
import { mcqBank, subjects } from "../data/mcqs";
import { shuffleArray } from "../utils/shuffle";
import type { MCQ } from "../data/types";

type Stage = "setup" | "active" | "result";

const COUNT_OPTIONS = [5, 10, 15, 20];

export default function Practice() {
  const [stage, setStage] = useState<Stage>("setup");
  const [subject, setSubject] = useState<string>("All Subjects");
  const [count, setCount] = useState<number>(10);

  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ q: MCQ; picked: number | null }[]>([]);

  const pool = useMemo(() => {
    if (subject === "All Subjects") return mcqBank;
    return mcqBank.filter((q) => q.subject === subject);
  }, [subject]);

  function startPractice() {
    const chosen = shuffleArray(pool).slice(0, Math.min(count, pool.length));
    setQuestions(chosen);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setStage("active");
  }

  function pickOption(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const q = questions[current];
    if (idx === q.answer) setScore((s) => s + 1);
    setAnswers((prev) => [...prev, { q, picked: idx }]);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setStage("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function reset() {
    setStage("setup");
  }

  if (stage === "setup") {
    return (
      <div className="mx-auto max-w-2xl">
        <Heading n={6} title="Build Your Quiz" subtitle="Pick a subject and question count — questions are shuffled every time, with instant scoring and explanations after each answer." />
        <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Subject
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                <option>All Subjects</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Number of Questions
              <select
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {COUNT_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c} Questions
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            {pool.length} question{pool.length !== 1 ? "s" : ""} available in this subject pool.
          </p>

          <button
            onClick={startPractice}
            disabled={pool.length === 0}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ▶ Start Practice
          </button>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="mx-auto max-w-2xl animate-fade-in">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-3xl font-extrabold text-white shadow-lg">
            {pct}%
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Quiz Complete!</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={startPractice}
              className="rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105"
            >
              🔁 Retake Quiz
            </button>
            <button
              onClick={reset}
              className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:scale-105 dark:border-slate-700 dark:text-slate-200"
            >
              ⚙ New Setup
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {answers.map((a, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {i + 1}. {a.q.question}
              </p>
              <p className={`mt-1 ${a.picked === a.q.answer ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                Your answer: {a.picked !== null ? a.q.options[a.picked] : "—"} {a.picked === a.q.answer ? "✓" : "✗"}
              </p>
              {a.picked !== a.q.answer && (
                <p className="text-emerald-600 dark:text-emerald-400">Correct answer: {a.q.options[a.q.answer]}</p>
              )}
              <p className="mt-1 text-slate-500 dark:text-slate-400">{a.q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl animate-fade-in">
      <div className="mb-4 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
        <span>
          Question {current + 1} / {questions.length}
        </span>
        <span>
          Score: {score} | {q.subject}
        </span>
      </div>
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
        <span className="mb-3 inline-block rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
          {q.exam} · {q.year}
        </span>
        <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">{q.question}</h3>

        <div className="mt-5 space-y-2.5">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.answer;
            const isPicked = idx === selected;
            let cls =
              "border-slate-200 bg-slate-50 hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800/60";
            if (selected !== null) {
              if (isCorrect) cls = "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10";
              else if (isPicked) cls = "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10";
              else cls = "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-700 dark:bg-slate-800/40";
            }
            return (
              <button
                key={idx}
                onClick={() => pickOption(idx)}
                disabled={selected !== null}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors dark:text-slate-200 ${cls}`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
                {selected !== null && isCorrect && <span className="ml-auto">✅</span>}
                {selected !== null && isPicked && !isCorrect && <span className="ml-auto">❌</span>}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-4 rounded-xl bg-indigo-50 p-3.5 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
            💡 <strong>Explanation:</strong> {q.explanation}
          </div>
        )}

        <button
          onClick={next}
          disabled={selected === null}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {current + 1 >= questions.length ? "Finish Quiz 🏁" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
