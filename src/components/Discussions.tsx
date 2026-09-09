import { useState } from "react";
import Heading from "./Heading";

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
}

const SEED_POSTS: Post[] = [
  {
    id: 1,
    author: "Dr. Ayesha K.",
    avatar: "🧕",
    time: "2h ago",
    text: "Mnemonic for cranial nerves function (Sensory/Motor/Both): 'Some Say Marry Money But My Brother Says Big Boobs Matter More' — helped me ace the neuro section!",
    likes: 34,
  },
  {
    id: 2,
    author: "Rahul V.",
    avatar: "🧑‍⚕️",
    time: "5h ago",
    text: "Can someone explain why Reynolds pentad includes altered mental status + hypotension over Charcot's triad? Got confused in today's CBT mock.",
    likes: 12,
  },
  {
    id: 3,
    author: "Fatima S.",
    avatar: "👩‍⚕️",
    time: "1d ago",
    text: "Joined the Telegram channel (t.me/intellectnest) yesterday — the daily MCQ streaks are actually keeping me consistent. Highly recommend!",
    likes: 51,
  },
  {
    id: 4,
    author: "Karan M.",
    avatar: "🧑‍🎓",
    time: "2d ago",
    text: "PYQ tip: In FMGE, questions from Community Medicine and Pharmacology repeat the most across years. Focus there if short on time.",
    likes: 28,
  },
];

export default function Discussions() {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);
  const [draft, setDraft] = useState("");

  function addPost() {
    if (!draft.trim()) return;
    setPosts((prev) => [
      {
        id: Date.now(),
        author: "You",
        avatar: "🙂",
        time: "just now",
        text: draft.trim(),
        likes: 0,
      },
      ...prev,
    ]);
    setDraft("");
  }

  function like(id: number) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)));
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Heading n={14} title="Discussions" subtitle="Debate answers, share mnemonics and help each other out." />

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share a mnemonic, ask a doubt, or start a discussion…"
          rows={3}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none focus:border-teal-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">Posts are stored locally in your browser for this demo.</p>
          <button
            onClick={addPost}
            className="rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-md transition-transform hover:scale-105"
          >
            Post →
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/10 to-indigo-600/10 text-lg">
                {p.avatar}
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{p.author}</p>
                <p className="text-[11px] text-slate-400">{p.time}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{p.text}</p>
            <button
              onClick={() => like(p.id)}
              className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-rose-500 dark:text-slate-400"
            >
              ❤️ {p.likes}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
