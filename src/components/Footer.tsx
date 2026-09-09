export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-xs font-bold text-white shadow-md">
            16
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Stay Connected</h3>
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 text-lg">
              🩺
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">MedStudentHub</span>
          </div>
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">
            5000+ MCQs · 5000+ PYQ/CBT Questions · Built for FMGE, NEET-PG, INI-CET & AIIMS aspirants.
          </p>
          <a
            href="https://t.me/intellectnest"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            📢 t.me/intellectnest
          </a>
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} MedStudentHub. Made with 💙 for future doctors. For educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
