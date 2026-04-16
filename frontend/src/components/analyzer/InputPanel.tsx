import { Textarea } from "@/components/ui/textarea"
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
  <div className="grid md:grid-cols-4 gap-5 items-stretch">
    
    {/* Job Description */}
    <div className="md:col-span-3">
      <div className="h-full rounded-xl border backdrop-blur-md shadow-lg p-3">
        
        <h5 className="ml-2 mb-1 font font-semibold">
          Job Description
        </h5>

        <Textarea
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="
            min-h-[120px]
            resize-none
            focus-visible:ring-0
            focus-visible:outline-none
            pr-2
            custom-scrollbar
          "
        />
      </div>
    </div>

    {/* Analyze Button Panel */}
    <div className="h-10 md:h-full">
      <Button
        className="
          h-full w-full
          rounded-full md:rounded-xl
          bg-gradient-to-br from-indigo-500 to-purple-600
          hover:from-indigo-400 hover:to-purple-500
          text-white font-lgt-semibold
          shadow-lg shadow-indigo-500/20
          transition-all
          active:scale-[0.98]
        "
        onClick={onAnalyze}
        disabled={!jobDescription || isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze →"}
      </Button>
    </div>
  </div>
);
}
