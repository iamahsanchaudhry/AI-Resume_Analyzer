import SkillBadge from "../shared/SkillBadge";


interface Props {
  name: string;
  status: "matched" | "missing" | "partial";
}

export default function SkillRow({ name, status }: Props) {
  const config = {
    matched: {
      label: "Matched",
      type: "default" as const,
      dot: "bg-green-500",
    },
    partial: {
      label: "Partial",
      type: "secondary" as const,
      dot: "bg-yellow-500",
    },
    missing: {
      label: "Missing",
      type: "destructive" as const,
      dot: "bg-red-500",
    },
  };

  const current = config[status];

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${current.dot}`} />
        <span className="text-sm">{name}</span>
      </div>

      {/* reused component */}
      <SkillBadge label={current.label} type={current.type} />
    </div>
  );
}