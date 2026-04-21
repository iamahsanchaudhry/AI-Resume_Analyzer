import { useState, useRef } from "react";
import resumeService from "../services/resumeService";
import { useAuth } from "@/context/AuthContext";
import Toaster from "@/components/shared/Toaster";

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

  const { user } = useAuth();

  const [showGuestPopup, setShowGuestPopup] = useState(false);

  //  fix stale request bug
  const requestRef = useRef(0);

  //  guest ID
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

      // 1. Upload resume
      const uploadRes = await resumeService.uploadResume(file);
      const resumeId = uploadRes?.resumeId;
      const resumeSkills = uploadRes?.skills || [];

      if (!resumeId && user) {
        throw new Error("Failed to upload resume");
      }

      // 2. Analyze
      const response = await resumeService.analyzeResume(
        resumeId,
        jobDescription,
        resumeSkills,
        getGuestId(),
      );

      //  ignore stale responses
      if (currentRequest !== requestRef.current) return;

      // 3. format result
      const formatted: AnalysisResult = {
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

      Toaster(
        "success",
        "Analysis Complete",
        "Your resume analysis is complete. Check the results below!",
      );

      if (!user) {
        setTimeout(() => {
          setShowGuestPopup(true);
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");

      Toaster(
        "error",
        "Something went wrong",
        err.response?.data?.message ||
          "Unable to analyze resume. Please try again.",
      );

      // optional: show popup if blocked by backend
      if (err.response?.data?.blocked) {
        setShowGuestPopup(true);
      }
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
    setError,
    analyzeResume,
    showGuestPopup,
    setShowGuestPopup,
  };
}
