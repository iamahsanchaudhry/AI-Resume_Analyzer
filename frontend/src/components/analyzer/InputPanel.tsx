import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  onAnalyze: () => void;
  isLoading?: boolean;
}

export default function InputPanel({
  jobDescription,
  setJobDescription,
  onAnalyze,
  isLoading = false,
}: Props) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {/* Textarea */}
      <div className="md:col-span-3">
        <div className="rounded-lg border-neutral-700/50 border p-1 h-full">
          <h5 className="ml-2 mb-1">Job Description</h5>
          <Textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[140px]"
          />
        </div>
      </div>

      {/* Button */}
      <Button
        className="h-full w-full"
        onClick={onAnalyze}
        disabled={!jobDescription || isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze →"}
      </Button>
    </div>
  );
}
