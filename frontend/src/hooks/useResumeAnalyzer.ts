import { useState, useRef } from "react";
import resumeService from "../services/resumeService";
import { useAuth } from "@/context/AuthContext";
import Toaster from "@/components/shared/Toaster";

interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
  reasoning?: string;
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
  matchMethod?: "ai" | "deterministic";
}

export default function useResumeAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const [showGuestPopup, setShowGuestPopup] = useState(false);

  const requestRef = useRef(0);

  const getGuestId = () => {
    let id = localStorage.getItem("guestId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("guestId", id);
    }
    return id;
  };

  const analyzeResume = async () => {
    const currentRequest = ++requestRef.current;

    if (!file || !jobDescription.trim()) {
      setError("Please upload resume and enter job description");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setError(null);
      setResult(null);

      // STEP 1 — read resume
      setLoadingStep("Reading your resume...");
      const uploadRes = await resumeService.uploadResume(file);
      const resumeId = uploadRes?.resumeId;
      const resumeSkills = uploadRes?.skills || [];

      if (!resumeId && user) {
        throw new Error("Failed to upload resume");
      }

      if (currentRequest !== requestRef.current) return;

      // STEP 2 — analyze job description
      setLoadingStep("Analyzing job description...");
      const response = await resumeService.analyzeResume(
        resumeId,
        jobDescription,
        resumeSkills,
        getGuestId(),
      );

      if (currentRequest !== requestRef.current) return;

      // STEP 3 — scoring (brief final step before results)
      setLoadingStep("Scoring your match...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      const reasoning: Record<string, string> = response?.reasoning ?? {};

      const formatted: AnalysisResult = {
        score: response?.matchScore ?? 0,
        skills: [
          ...(response?.matchedSkills ?? []).map((s: string) => ({
            name: s,
            status: "matched" as const,
            reasoning: reasoning[s],
          })),
          ...(response?.weakMatches ?? []).map((s: string) => ({
            name: s,
            status: "partial" as const,
            reasoning: reasoning[s],
          })),
          ...(response?.missingSkills ?? []).map((s: string) => ({
            name: s,
            status: "missing" as const,
            reasoning: reasoning[s],
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
        matchMethod: response?.matchMethod,
      };

      setResult(formatted);

      Toaster({
        type: "success",
        message: "Analysis Complete",
        description:
          "Your resume analysis is complete. Check the results below!",
      });

      if (!user) {
        setTimeout(() => {
          setShowGuestPopup(true);
        }, 1500);
      }
    } catch (err: any) {
      console.error("Analyze error:", err);
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      setError(errorMessage);

      Toaster({
        type: "error",
        message: "Analysis failed",
        description: errorMessage,
      });

      if (err.response?.data?.blocked) {
        setShowGuestPopup(true);
      }
    } finally {
      setLoading(false);
      setLoadingStep("");
    }
  };

  return {
    file,
    setFile,
    jobDescription,
    setJobDescription,
    result,
    loading,
    loadingStep,
    error,
    setError,
    analyzeResume,
    showGuestPopup,
    setShowGuestPopup,
  };
}
