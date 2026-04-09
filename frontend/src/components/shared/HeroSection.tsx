import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <div className="text-center py-12 md:py-9 space-y-6">
      
      {/* Badge */}
      <div>
        <Badge variant="secondary" className="text-xs">
          AI-Powered ATS Analyzer
        </Badge>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
        Know exactly how your resume stacks up
      </h1>

      {/* Subtext */}
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
        Upload your resume and paste a job description — get a real ATS score,
        matched skills, missing keywords, and actionable feedback in seconds.
      </p>
    </div>
  );
}