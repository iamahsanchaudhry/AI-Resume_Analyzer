import InputPanel from "@/components/analyzer/InputPanel";
import ResultsView from "@/components/analyzer/ResultsView";
import UploadZone from "@/components/analyzer/UploadZone";
import { Card, CardContent } from "@/components/ui/card";
import useResumeAnalyzer from "@/hooks/useResumeAnalyzer";

export default function ResumeAnalyzerPage() {
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
            <div className="mx-auto max-w-6xl px-6 py-12 space-y-10">

                <div className="flex justify-center">
                    <Card className="relative w-full max-w-6xl border bg-background/60 backdrop-blur-md shadow-xl">

                        {/* Glow effect */}
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-2xl opacity-60" />

                        <CardContent className="relative text-center space-y-3 py-10">
                            <h1 className="text-4xl font-bold tracking-tight">
                                Analyze Your{" "}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    Resume
                                </span>{" "}
                                 In Seconds
                            </h1>

                            <p className="text-muted-foreground text-lg">
                                AI-powered analysis that improves your ATS score and helps you land more interviews.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                {/* INPUT SECTION */}
                <div className="space-y-8">
                    <UploadZone file={file} onFileSelect={setFile} />

                    <InputPanel
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        onAnalyze={analyzeResume}
                        isLoading={loading}
                    />

                    {error && (
                        <p className="text-sm text-red-500">
                            {error}
                        </p>
                    )}
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="text-center text-sm text-muted-foreground">
                        Analyzing your resume...
                    </div>
                )}

                {/* RESULTS */}
                {result && !loading && (
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <ResultsView
                            score={result.score}
                            skills={result.skills}
                            feedback={result.feedback}
                        />
                    </div>
                )}

                {/* EMPTY STATE */}
                {!result && !loading && (
                    <div className="text-center text-sm text-muted-foreground">
                        Upload a resume and paste a job description to get started.
                    </div>
                )}

            </div>
        </div>
    );
}