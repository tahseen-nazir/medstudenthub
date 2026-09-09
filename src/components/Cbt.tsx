import { useEffect, useMemo, useRef, useState } from "react";
import Heading from "./Heading";
import { mcqBank, subjects, examTypes } from "../data/mcqs";
import { shuffleArray, formatTime } from "../utils/shuffle";
import type { MCQ } from "../data/types";

type Stage = "setup" | "active" | "result";
type Mode = "Exam" | "Regular";

const COUNT_OPTIONS = [10, 20, 30, 50];
const TIME_OPTIONS = [
  { label: "45 sec", value: 45 },
  { label: "60 sec", value: 60 },
  { label: "90 sec", value: 90 },
  { label: "120 sec", value: 120 },
];

export default function Cbt() {
  const [stage, setStage] = useState<Stage>("setup");
  const [mode, setMode] = useState<Mode>("Exam");
  const [exam, setExam] = useState<string>("All Exams");
  const [subject, setSubject] = useState<string>("All Subjects");
  const [year, setYear] = useState<string>("All Years");
  const [count, setCount] = useState<number>(10);
  const [timePerQ, setTimePerQ] = useState<number>(60);

  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [current, setCurrent] = useState(0);
  const [answersMap, setAnswersMap] = useState<Record<number, number | null>>({});
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [marked, setMarked] = useState<Set<number>>(new Set());
  const [remaining, setRemaining] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  const years = useMemo(() => Array.from(new Set(mcqBank.map((q) => q.year))).sort(), []);

  const pool = useMemo(() => {
    return mcqBank.filter(
      (q) =>
        (exam === "All Exams" || q.exam === exam) &&
        (subject === "All Subjects" || q.subject === subject) &&
        (year === "All Years" || q.year === Number(year))
    );
  }, [exam, subject, year]);

  function startExam() {
    const chosen = shuffleArray(pool).slice(0, Math.min(count, pool.length));
    setQuestions(chosen);
    setCurrent(0);
    setAnswersMap({});
    setVisited(new Set([0]));
    setMarked(new Set());
    const total = chosen.length * timePerQ;
    setRemaining(total);
    setStartTime(total);
    setStage("active");
  }

  useEffect(() => {
    if (stage !== "active") return;
    timerRef.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(timerRef.current!);
          setStage("result");
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [stage]);

  function selectOption(idx: number) {
    setAnswersMap((prev) => ({ ...prev, [current]: idx }));
  }

  function goTo(idx: number) {
    setCurrent(idx);
    setVisited((prev) => new Set(prev).add(idx));
  }

  function saveAndNext() {
    if (current + 1 < questions.length) goTo(current + 1);
    else setStage("result");
  }

  function toggleMark() {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(current)) next.delete(current);
      else next.add(current);
      return next;
    });
    saveAndNext();
  }

  function clearResponse() {
    setAnswersMap((prev) => {
      const next = { ...prev };
      delete next[current];
      return next;
    });
  }

  function submitTest() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setStage("result");
  }

  function paletteStatus(idx: number): string {
    const answered = answersMap[idx] !== undefined && answersMap[idx] !== null;
    const isMarked = marked.has(idx);
    const isVisited = visited.has(idx);
    if (isMarked && answered) return "marked-answered";
    if (isMarked) return "marked";
    if (answered) return "answered";
    if (isVisited) return "visited";
    return "not-visited";
  }

  const paletteClasses: Record<string, string> = {
    "not-visited": "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
    visited: "bg-rose-400 text-white",
    answered: "bg-emerald-500 text-white",
    marked: "bg-purple-500 text-white",
    "marked-answered": "bg-purple-500 text-white ring-2 ring-emerald-400",
  };

  if (stage === "setup") {
    return (
      <div className="mx-auto max-w-2xl">
        <Heading
          n={8}
          title="CBT Exam Mode"
          subtitle="Practice like the real FMGE / NEET-PG computer-based test — question palette, countdown timer, and mark-for-review, drawn from our growing bank of 5000+ PYQ / CBT questions."
        />
        <div className="animate-fade-in rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {(["Exam", "Regular"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                  mode === m
                    ? "bg-white text-teal-700 shadow-sm dark:bg-slate-900 dark:text-teal-300"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {m === "Exam" ? "🖥 Exam Mode" : "📖 Regular Mode"}
              </button>
            ))}
          </div>
          <p className="mb-5 text-xs text-slate-400 dark:text-slate-500">
            {mode === "Exam"
              ? "Answers stay hidden until you submit — just like the real CBT."
              : "Correct answer & explanation appear immediately after you click."}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Exam
              <select value={exam} onChange={(e) => setExam(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <option>All Exams</option>
                {examTypes.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Subject
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <option>All Subjects</option>
                {subjects.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Year
              <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                <option>All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
              Questions
              <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {COUNT_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c} Questions
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200 sm:col-span-2">
              Time per Question
              <select value={timePerQ} onChange={(e) => setTimePerQ(Number(e.target.value))} className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {TIME_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">
            {pool.length} question{pool.length !== 1 ? "s" : ""} match your filters. Total time:{" "}
            {formatTime(Math.min(count, pool.length) * timePerQ)}
          </p>

          <button
            onClick={startExam}
            disabled={pool.length === 0}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-500 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          >
            🖥 Start CBT Exam
          </button>
        </div>
      </div>
    );
  }

  if (stage === "result") {
    let score = 0;
    let attempted = 0;
    questions.forEach((q, i) => {
      if (answersMap[i] !== undefined && answersMap[i] !== null) {
        attempted++;
        if (answersMap[i] === q.answer) score++;
      }
    });
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    const timeTaken = startTime - remaining;

    return (
      <div className="mx-auto max-w-3xl animate-fade-in">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-3xl font-extrabold text-white shadow-lg">
            {pct}%
          </div>
          <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">CBT Exam Submitted!</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
            <Stat label="Score" value={`${score}/${questions.length}`} />
            <Stat label="Attempted" value={`${attempted}/${questions.length}`} />
            <Stat label="Time Taken" value={formatTime(timeTaken)} />
            <Stat label="Accuracy" value={`${pct}%`} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button onClick={startExam} className="rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105">
              🔁 Retake Exam
            </button>
            <button onClick={() => setStage("setup")} className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-transform hover:scale-105 dark:border-slate-700 dark:text-slate-200">
              ⚙ New Setup
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {questions.map((q, i) => {
            const picked = answersMap[i];
            const isCorrect = picked === q.answer;
            return (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  {i + 1}. {q.question}
                </p>
                <p className={picked === undefined || picked === null ? "mt-1 text-slate-400" : `mt-1 ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                  Your answer: {picked !== undefined && picked !== null ? q.options[picked] : "Not attempted"} {picked !== undefined && picked !== null ? (isCorrect ? "✓" : "✗") : ""}
                </p>
                {!isCorrect && <p className="text-emerald-600 dark:text-emerald-400">Correct answer: {q.options[q.answer]}</p>}
                <p className="mt-1 text-slate-500 dark:text-slate-400">{q.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const q = questions[current];
  const picked = answersMap[current];

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {mode === "Exam" ? "🖥 Exam Mode" : "📖 Regular Mode"} · {q.subject}
        </span>
        <span className={`rounded-full px-3 py-1 text-sm font-extrabold ${remaining < 30 ? "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400" : "bg-teal-100 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300"}`}>
          ⏱ {formatTime(remaining)}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-teal-50 px-3 py-1 text-[11px] font-bold text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
              Q{current + 1} · {q.exam} {q.year}
            </span>
          </div>
          <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg dark:text-white">{q.question}</h3>

          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, idx) => {
              const revealed = mode === "Regular" && picked !== undefined && picked !== null;
              const isCorrect = idx === q.answer;
              const isPicked = idx === picked;
              let cls = "border-slate-200 bg-slate-50 hover:border-teal-400 dark:border-slate-700 dark:bg-slate-800/60";
              if (!revealed && isPicked) cls = "border-indigo-400 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-500/10";
              if (revealed) {
                if (isCorrect) cls = "border-emerald-400 bg-emerald-50 dark:border-emerald-500 dark:bg-emerald-500/10";
                else if (isPicked) cls = "border-rose-400 bg-rose-50 dark:border-rose-500 dark:bg-rose-500/10";
                else cls = "border-slate-200 bg-slate-50 opacity-60 dark:border-slate-700 dark:bg-slate-800/40";
              }
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors dark:text-slate-200 ${cls}`}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                  {revealed && isCorrect && <span className="ml-auto">✅</span>}
                  {revealed && isPicked && !isCorrect && <span className="ml-auto">❌</span>}
                </button>
              );
            })}
          </div>

          {mode === "Regular" && picked !== undefined && picked !== null && (
            <div className="mt-4 rounded-xl bg-indigo-50 p-3.5 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-200">
              💡 <strong>Explanation:</strong> {q.explanation}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button onClick={clearResponse} className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 dark:border-slate-700 dark:text-slate-300">
              Clear Response
            </button>
            <button onClick={toggleMark} className="rounded-lg bg-purple-100 px-4 py-2 text-xs font-bold text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">
              🚩 Mark for Review & Next
            </button>
            <button
              onClick={() => current > 0 && goTo(current - 1)}
              disabled={current === 0}
              className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 disabled:opacity-40 dark:border-slate-700 dark:text-slate-300"
            >
              ← Previous
            </button>
            <button onClick={saveAndNext} className="ml-auto rounded-lg bg-gradient-to-r from-teal-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md">
              Save & Next →
            </button>
            <button onClick={submitTest} className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-900">
              Submit Test
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Question Palette</p>
          <div className="grid grid-cols-5 gap-2 lg:grid-cols-4">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold transition-transform hover:scale-110 ${paletteClasses[paletteStatus(idx)]} ${
                  idx === current ? "ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-slate-900" : ""
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <Legend color="bg-emerald-500" label="Answered" />
            <Legend color="bg-rose-400" label="Not Answered" />
            <Legend color="bg-purple-500" label="Marked for Review" />
            <Legend color="bg-slate-200 dark:bg-slate-700" label="Not Visited" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
      <div className="text-base font-extrabold text-slate-900 dark:text-white">{value}</div>
      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${color}`} />
      {label}
    </div>
  );
}
