export type Exam = "FMGE" | "NEET-PG" | "INI-CET" | "AIIMS";

export interface MCQ {
  id: number;
  subject: string;
  exam: Exam;
  year: number;
  question: string;
  options: [string, string, string, string];
  answer: number; // index 0-3
  explanation: string;
}

export interface ResourceLink {
  title: string;
  description: string;
  url: string;
  category: string;
  icon: string;
}
