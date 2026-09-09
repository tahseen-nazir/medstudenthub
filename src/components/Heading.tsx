interface HeadingProps {
  n: number;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function Heading({ n, title, subtitle, align = "center" }: HeadingProps) {
  return (
    <div className={`mb-8 flex flex-col gap-3 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 text-sm font-bold text-white shadow-md shadow-teal-500/30 dark:shadow-teal-500/10">
          {n}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className={`max-w-2xl text-sm text-slate-500 sm:text-base dark:text-slate-400 ${align === "center" ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
