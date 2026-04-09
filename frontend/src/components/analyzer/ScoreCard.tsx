import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
      score:    "text-emerald-600 dark:text-emerald-400",
      badge:    "bg-emerald-50 text-emerald-700 rounded-full p-3 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      progress: "[&>div]:bg-emerald-500",
      label:    "Excellent match",
    };
  }
  if (score >= 60) {
    return {
      score:    "text-amber-600 dark:text-amber-400",
      badge:    "bg-amber-50 text-amber-700 rounded-full p-3 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
      progress: "[&>div]:bg-amber-400",
      label:    "Good match",
    };
  }
  return {
    score:    "text-red-500 dark:text-red-400",
    badge:    "bg-red-50 text-red-600 rounded-full p-3 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800",
    progress: "[&>div]:bg-red-400",
    label:    "Needs improvement",
  };
}

export default function ScoreCard({ score }: Props) {
  const s = getScoreStyle(score);

  return (
    <Card className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-semibold text-stone-400 uppercase tracking-wide">
          ATS Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score number */}
        <div className="flex items-end gap-1.5">
          <h2 className={`text-5xl font-bold leading-none ${s.score}`}>
            {score}
          </h2>
          <span className="text-stone-400 dark:text-stone-500 mb-1 text-sm">/100</span>
        </div>

        {/* Progress bar */}
        <Progress
          value={score}
          className={`h-2 bg-stone-100 dark:bg-stone-800 rounded-full ${s.progress}`}
        />

        <Badge variant="outline" className={s.badge}>
          {s.label}
        </Badge>

        <p className="text-xs text-stone-400 dark:text-stone-500 leading-relaxed">
          Based on keyword match, skills, and job alignment
        </p>
      </CardContent>
    </Card>
  );
}