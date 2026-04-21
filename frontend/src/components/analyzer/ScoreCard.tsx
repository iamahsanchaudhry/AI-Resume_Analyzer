import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { animate, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

/* ─── Animation (matched to landing) ─────────────────── */
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Props {
  score: number;
}

function getScoreStyle(score: number) {
  if (score >= 80) {
    return {
      score: "text-emerald-600 dark:text-emerald-400",
      badge:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60",
      progress: "from-emerald-500 to-emerald-400",
      glow: "bg-emerald-500/10 dark:bg-emerald-500/15",
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      label: "Excellent match",
    };
  }
  if (score >= 60) {
    return {
      score: "text-amber-600 dark:text-amber-400",
      badge:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60",
      progress: "from-amber-500 to-amber-400",
      glow: "bg-amber-500/10 dark:bg-amber-500/15",
      iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
      iconColor: "text-amber-600 dark:text-amber-400",
      label: "Good match",
    };
  }
  return {
    score: "text-red-500 dark:text-red-400",
    badge:
      "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60",
    progress: "from-red-500 to-red-400",
    glow: "bg-red-500/10 dark:bg-red-500/15",
    iconBg: "bg-red-500/10 dark:bg-red-500/15",
    iconColor: "text-red-600 dark:text-red-400",
    label: "Needs improvement",
  };
}

export default function ScoreCard({ score }: Props) {
  const s = getScoreStyle(score);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, score, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayScore(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [score]);

  return (
    <motion.div variants={scaleIn} className="h-full">
      <Card className="group relative h-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40 transition-all duration-300 overflow-hidden">
        {/* Ambient glow */}
        <div
          className={`pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full ${s.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />

        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              ATS Score
            </CardTitle>
            <div
              className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center`}
            >
              <TrendingUp className={`w-4 h-4 ${s.iconColor}`} />
            </div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-5">
          {/* SCORE */}
          <div className="flex items-end gap-1.5">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-6xl font-extrabold tracking-tight leading-none ${s.score}`}
            >
              {displayScore}
            </motion.h2>
            <span className="text-zinc-400 dark:text-zinc-500 mb-2 text-sm font-medium">
              /100
            </span>
          </div>

          {/* PROGRESS */}
          <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${s.progress}`}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Badge
              variant="outline"
              className={`rounded-full px-3 py-1 text-xs font-semibold border ${s.badge}`}
            >
              {s.label}
            </Badge>
          </motion.div>

          <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
            Based on keyword match, skills, and job alignment.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
