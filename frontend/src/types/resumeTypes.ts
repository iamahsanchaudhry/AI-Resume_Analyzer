export type SkillStatus = "matched" | "partial" | "missing";

export type FeedbackType = "strength" | "improve" | "missing";

export type AppState = "idle" | "analyzing" | "done" | "error";

export interface SkillMatch {
  name: string;
  status: SkillStatus;
}

export interface FeedbackItem {
  type: FeedbackType;
  title: string;
  body: string;
}

export interface AnalysisResult {
  score: number;
  matchedCount: number;
  totalRequired: number;
  skills: SkillMatch[];
  feedback: FeedbackItem[];
  summary: string;
}

export interface AnalyzePayload {
  file: File;
  jobDescription: string;
}