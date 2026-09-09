import { useEffect, useState } from "react";

export default function Splash({ onFinish }: { onFinish: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 1800);
    const finishTimer = setTimeout(onFinish, 2400);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-950 via-indigo-950 to-teal-950 transition-opacity duration-700 ease-in-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400/40 animate-pulse-ring" />
        <span className="absolute inline-flex h-full w-full rounded-full bg-indigo-400/30 animate-pulse-ring [animation-delay:0.4s]" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-600 text-4xl shadow-xl shadow-indigo-900/50 animate-scale-in">
          🩺
        </div>
      </div>
      <div className="animate-fade-in text-center [animation-delay:0.2s]">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome to MedStudentHub
        </h1>
        <p className="mt-2 text-sm text-teal-200/80 sm:text-base">
          Preparing your FMGE · NEET-PG · INI-CET practice arena…
        </p>
      </div>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full origin-left animate-[scale-in_1.8s_ease-out_forwards] bg-gradient-to-r from-teal-400 to-indigo-400" />
      </div>
    </div>
  );
}
