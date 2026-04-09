interface Props {
  label: string;
  type?: "default" | "secondary" | "destructive";
}

export default function SkillBadge({
  label,
  type = "secondary",
}: Props) {
  const styles = {
    default:
      "bg-primary/10 text-primary",
    secondary:
      "bg-muted text-muted-foreground",
    destructive:
      "bg-red-500/10 text-red-500",
  };

  return (
    <span
      className={`
        text-xs px-2 py-1 rounded-full font-medium
        ${styles[type]}
      `}
    >
      {label}
    </span>
  );
}