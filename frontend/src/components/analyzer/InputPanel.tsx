import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

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
  const charCount = jobDescription.length;
  const minRecommended = 150;
  const isReady = charCount >= minRecommended;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-4"
    >
      {/* TEXTAREA CARD */}
      <div
        className="
          group relative rounded-2xl
          border border-zinc-200/80 dark:border-zinc-800/80
          bg-white dark:bg-zinc-900
          shadow-sm
          transition-all duration-300
          focus-within:border-violet-400 dark:focus-within:border-violet-500/60
          focus-within:shadow-lg focus-within:shadow-violet-500/5
          overflow-hidden
        "
      >
        {/* Ambient focus glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/0 via-violet-500/0 to-blue-500/0 group-focus-within:from-violet-500/[0.03] group-focus-within:to-blue-500/[0.03] transition-colors duration-500" />

        <div className="relative p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <label
              htmlFor="job-description"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
            >
              Job Description
            </label>

            {/* Live character count */}
            <motion.span
              key={isReady ? "ready" : "short"}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[11px] font-medium tabular-nums ${
                charCount === 0
                  ? "text-zinc-400 dark:text-zinc-600"
                  : isReady
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
              }`}
            >
              {charCount === 0
                ? "Paste the full job posting for best results"
                : isReady
                  ? `${charCount} chars · looking good`
                  : `${charCount} chars · add a bit more detail`}
            </motion.span>
          </div>

          <Textarea
            id="job-description"
            placeholder="Paste the job description here — responsibilities, requirements, tech stack, nice-to-haves. The more context, the sharper the analysis."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[160px] resize-none
            border-0 shadow-none bg-transparent p-0
            text-sm leading-relaxed
            focus-visible:ring-0 focus-visible:ring-offset-0
            placeholder:text-zinc-400 dark:placeholder:text-zinc-600

            scrollbar-minimal"
          />
        </div>

        {/* Subtle progress strip at bottom when typing */}
        <div className="h-0.5 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{
              width: `${Math.min((charCount / minRecommended) * 100, 100)}%`,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* ANALYZE BUTTON */}
      <motion.div
        whileTap={{ scale: isLoading || !jobDescription ? 1 : 0.98 }}
        className="flex justify-end"
      >
        <Button
          size="lg"
          onClick={onAnalyze}
          disabled={!jobDescription || isLoading}
          className="
            group h-12 px-8 text-base font-semibold
            bg-gradient-to-r from-blue-600 to-violet-600
            hover:from-blue-500 hover:to-violet-500
            border-0 text-white
            shadow-lg shadow-blue-500/25 dark:shadow-blue-500/20
            transition-all duration-300
            hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-500/30
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Analyzing…
            </>
          ) : (
            <>
              Analyze Resume
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
