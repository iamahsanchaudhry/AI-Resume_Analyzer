import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  score: number;
}

interface ScoreStyle {
  score: string;
  badge: string;
  progress: string;
  label: string;
}

function getScoreStyle(score: number): ScoreStyle {
  if (score >= 80) {
    return {
      score: "text-emerald-600 dark:text-emerald-400",
      badge:
        "bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      progress: "bg-emerald-600 dark:bg-emerald-400",
      label: "Excellent match",
    };
  }

  if (score >= 60) {
    return {
      score: "text-amber-600 dark:text-amber-400",
      badge:
        "bg-amber-50 text-amber-700 rounded-full px-3 py-1 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
      progress: "bg-amber-600 dark:bg-amber-400",
      label: "Good match",
    };
  }

  return {
    score: "text-red-500 dark:text-red-400",
    badge:
      "bg-red-50 text-red-600 rounded-full px-3 py-1 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
    progress: "bg-red-500 dark:bg-red-400",
    label: "Needs improvement",
  };
}

export default function ScoreCard({ score }: Props) {
  const s = getScoreStyle(score);

  // animated score state
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // animate number (0 → score)
    const controls = animate(0, score, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(value) {
        setDisplayScore(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [score]);

  return (
    <Card className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
          ATS Score
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* SCORE (animated number) */}
        <div className="flex items-end gap-1.5">
          <motion.h2
            className={`text-5xl font-bold leading-none ${s.score}`}
            key={displayScore}
          >
            {displayScore}
          </motion.h2>

          <span className="text-stone-400 dark:text-stone-500 mb-1 text-sm">
            /100
          </span>
        </div>

        {/* ANIMATED PROGRESS BAR */}
        <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${s.progress}`}
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>

        {/* BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Badge variant="outline" className={s.badge}>
            {s.label}
          </Badge>
        </motion.div>

        {/* DESCRIPTION */}
        <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
          Based on keyword match, skills, and job alignment
        </p>
      </CardContent>
    </Card>
  );
}
