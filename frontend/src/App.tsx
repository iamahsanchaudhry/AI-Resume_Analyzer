import Navbar from "@/components/shared/Navbar";
import UploadZone from "@/components/analyzer/UploadZone";
import InputPanel from "@/components/analyzer/InputPanel";
import ResultsView from "@/components/analyzer/ResultsView";

import useResumeAnalyzer from "@/hooks/useResumeAnalyzer";
import Hero from "./components/shared/HeroSection";

export default function App() {
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
    <div className="min-h-screen bg-background text-foreground">
  
  <Navbar />

  <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">

    {/* HERO */}
    <Hero />

    {/* INPUT SECTION */}
    <div className="space-y-6">
      <UploadZone file={file} onFileSelect={setFile} />

      <InputPanel
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
        onAnalyze={analyzeResume}
        isLoading={loading}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>

    {/* RESULTS */}
    {result && (
      <ResultsView
        score={result.score}
        skills={result.skills}
        feedback={result.feedback}
      />
    )}

  </div>
</div>
  );
}