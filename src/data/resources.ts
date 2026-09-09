import type { ResourceLink } from "./types";

export const telegramChannel = {
  name: "IntellectNest",
  url: "https://t.me/intellectnest",
  handle: "t.me/intellectnest",
};

export const resourceLinks: ResourceLink[] = [
  {
    title: "IntellectNest — Telegram Channel",
    description: "Join our official Telegram channel for daily MCQs, PYQ discussions, exam updates, and free study material.",
    url: "https://t.me/intellectnest",
    category: "Community",
    icon: "📢",
  },
  {
    title: "NMC — National Medical Commission",
    description: "Official regulatory body for medical education and FMGE guidelines in India.",
    url: "https://www.nmc.org.in/",
    category: "Official Bodies",
    icon: "🏛️",
  },
  {
    title: "NBE — National Board of Examinations",
    description: "Conducting body for NEET-PG, FMGE and other national medical exams.",
    url: "https://natboard.edu.in/",
    category: "Official Bodies",
    icon: "🏥",
  },
  {
    title: "AIIMS INI-CET Portal",
    description: "Official notifications, syllabus and exam pattern for the INI-CET examination.",
    url: "https://aiimsexams.ac.in/",
    category: "Official Bodies",
    icon: "🎓",
  },
  {
    title: "NCBI PubMed",
    description: "Free search engine for biomedical and life science literature — great for quick fact-checking.",
    url: "https://pubmed.ncbi.nlm.nih.gov/",
    category: "Reference",
    icon: "🔬",
  },
  {
    title: "Radiopaedia",
    description: "Peer-reviewed, collaborative radiology reference with thousands of annotated cases.",
    url: "https://radiopaedia.org/",
    category: "Reference",
    icon: "🩻",
  },
  {
    title: "Osmosis by Elsevier",
    description: "High-yield videos and notes covering pre-clinical and clinical medical topics.",
    url: "https://www.osmosis.org/",
    category: "Study Material",
    icon: "📖",
  },
  {
    title: "Marrow / PrepLadder Blogs",
    description: "High-yield revision notes, mnemonics and one-liners for NEET-PG & FMGE aspirants.",
    url: "https://www.marrow.com/",
    category: "Study Material",
    icon: "📝",
  },
  {
    title: "WHO Fact Sheets",
    description: "Authoritative, up-to-date fact sheets on diseases, public health and epidemiology.",
    url: "https://www.who.int/news-room/fact-sheets",
    category: "Reference",
    icon: "🌍",
  },
  {
    title: "Medscape",
    description: "Clinical reference, drug database and the latest medical news for practitioners and students.",
    url: "https://www.medscape.com/",
    category: "Reference",
    icon: "💊",
  },
];

export const resourceCategories: string[] = Array.from(
  new Set(resourceLinks.map((r) => r.category))
);
