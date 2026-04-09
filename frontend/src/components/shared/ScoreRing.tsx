import { Progress } from "@/components/ui/progress";

interface Props {
  score: number;
}

export default function ScoreRing({ score }: Props) {
  return (
    <div className="space-y-2">
      <div className="text-3xl font-bold text-primary">
        {score}
        <span className="text-sm text-muted-foreground">/100</span>
      </div>
      <Progress value={score} />
    </div>
  );
}