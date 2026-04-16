import InputPanel from "@/components/analyzer/InputPanel";
import ResultsView from "@/components/analyzer/ResultsView";
import UploadZone from "@/components/analyzer/UploadZone";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import useResumeAnalyzer from "@/hooks/useResumeAnalyzer";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ResumeAnalyzerPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const {
    file,
    setFile,
    jobDescription,
    setJobDescription,
    analyzeResume,
    result,
    loading,
    error,
  } = useResumeAnalyzer();


  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* subtle animated background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Card className="relative w-full max-w-6xl border bg-background/60 backdrop-blur-md shadow-xl overflow-hidden">
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl opacity-60" />

            <CardContent className="relative text-center space-y-3 py-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Analyze Your{" "}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  Resume
                </span>{" "}
                In Seconds
              </h1>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                AI-powered analysis that improves your ATS score and helps you
                land more interviews.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* INPUT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-8"
        >
          <UploadZone file={file} onFileSelect={setFile} />

          <InputPanel
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            onAnalyze={analyzeResume}
            isLoading={loading}
          />

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* LOADING STATE */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-sm text-muted-foreground"
            >
              <div className="flex flex-col items-center">
                <LoadingSpinner />
                Analyzing your resume...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS */}
        
          <AnimatePresence mode="wait">
            {result && !loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ResultsView
                  score={result.score}
                  skills={result.skills}
                  feedback={result.feedback}
                />
              </motion.div>
            )}
          </AnimatePresence>

        {/* EMPTY STATE */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground"
          >
            Upload a resume and paste a job description to get started.
          </motion.div>
        )}
      </div>
    </div>
  );
}
