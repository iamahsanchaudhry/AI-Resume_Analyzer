import { useState } from "react";
import resumeService from "../services/resumeService";

interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
}

interface Feedback {
  type: "success" | "warning" | "danger";
  title: string;
  description: string;
}

interface AnalysisResult {
  score: number;
  skills: Skill[];
  feedback: Feedback[];
}

export default function useResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = async () => {
    console.log("Starting analysis with:", { file, jobDescription });
    if (!file || !jobDescription.trim()) {
      setError("Please upload resume and enter job description");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // 1️⃣ Upload resume
      const uploadRes = await resumeService.uploadResume(file);
      const resumeId = uploadRes?.resumeId;

      if (!resumeId) {
        throw new Error("Failed to upload resume");
      }

      // 2️⃣ Analyze resume
      const response = await resumeService.analyzeResume(
        resumeId,
        jobDescription
      );

      // 🧠 NORMALIZE NEW BACKEND RESPONSE
      const formatted: AnalysisResult = {
        score: response?.matchScore ?? 0,

        skills: [
          ...(response?.matchedSkills ?? []).map((s: string) => ({
            name: s,
            status: "matched" as const,
          })),

          ...(response?.missingSkills ?? []).map((s: string) => ({
            name: s,
            status: "missing" as const,
          })),

          ...(response?.weakMatches ?? []).map((s: string) => ({
            name: s,
            status: "partial" as const,
          })),
        ],

        feedback: Array.isArray(response?.feedback)
          ? response.feedback.map((text: string) => ({
              type: text.toLowerCase().includes("low")
                ? "danger"
                : text.toLowerCase().includes("missing")
                ? "warning"
                : "success",
              title: "AI Feedback",
              description: text,
            }))
          : [],
      };

      setResult(formatted);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    setFile,
    jobDescription,
    setJobDescription,

    result,
    loading,
    error,

    analyzeResume,
  };
}