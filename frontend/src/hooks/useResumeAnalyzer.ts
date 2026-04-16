import { useState } from "react";
import resumeService from "../services/resumeService";
import { toast } from "sonner";

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

  const [requestId, setRequestId] = useState(0);

  const analyzeResume = async () => {
    const currentRequest = requestId + 1;
    setRequestId(currentRequest);

    if (!file || !jobDescription.trim()) {
      setError("Please upload resume and enter job description");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const uploadRes = await resumeService.uploadResume(file);
      const resumeId = uploadRes?.resumeId;

      if (!resumeId) throw new Error("Failed to upload resume");

      const response = await resumeService.analyzeResume(
        resumeId,
        jobDescription,
      );

      // ❗ Ignore stale responses
      if (currentRequest !== requestId + 1) return;

      const formatted = {
        score: response?.matchScore ?? 0,
        skills: [
          ...(response?.matchedSkills ?? []).map((s: string) => ({
            name: s,
            status: "matched",
          })),
          ...(response?.missingSkills ?? []).map((s: string) => ({
            name: s,
            status: "missing",
          })),
          ...(response?.weakMatches ?? []).map((s: string) => ({
            name: s,
            status: "partial",
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

      toast.success("Analysis Complete", {
        description:
          "Your resume analysis is complete. Check the results below!",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");

      toast.error("Something went wrong", {
        description:
          err.message || "Unable to analyze resume. Please try again.",
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
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
