import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SkillRow from "./SkillRow";

interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
}

interface Props {
  skills?: Skill[] | null;
}

export default function SkillsPanel({ skills }: Props) {
  const safeSkills: Skill[] = Array.isArray(skills) ? skills : [];

  return (
    <Card className="bg-card/60 border border-border/50 rounded-xl shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Skill Match
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {safeSkills.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No skills matched after AI Analysis.
          </p>
        ) : (
          <div className="space-y-3">
            {safeSkills.map((skill) => (
              <SkillRow
                key={skill.name}
                name={skill.name}
                status={skill.status}
              />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-auto flex gap-4 pb-1 pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" /> Matched
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500" /> Partial
          </span>

          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" /> Missing
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
