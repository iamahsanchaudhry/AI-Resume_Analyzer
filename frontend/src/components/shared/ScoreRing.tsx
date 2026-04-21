import { motion } from "framer-motion";

interface Props {
  score: number;
}

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      text: "text-emerald-600 dark:text-emerald-400",
      progress: "from-emerald-500 to-emerald-400",
    };
  }
  if (score >= 60) {
    return {
      text: "text-amber-600 dark:text-amber-400",
      progress: "from-amber-500 to-amber-400",
    };
  }
  return {
    text: "text-red-500 dark:text-red-400",
    progress: "from-red-500 to-red-400",
  };
}

export default function ScoreRing({ score }: Props) {
  const s = getScoreStyle(score);

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-1.5">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-extrabold tracking-tight leading-none ${s.text}`}
        >
          {score}
        </motion.span>
        <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500 mb-1">
          /100
        </span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${s.progress}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
