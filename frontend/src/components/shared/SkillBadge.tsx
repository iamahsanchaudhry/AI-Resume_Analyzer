interface Props {
  label: string;
  type?: "default" | "secondary" | "destructive" | "success" | "warning";
  background?: string;
}

const styles: Record<
  "default" | "secondary" | "destructive" | "success" | "warning",
  string
> = {
  default:
    "bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20",
  secondary:
    "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-700/60",
  destructive:
    "bg-red-500/10 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200/60 dark:border-red-500/20",
  success:
    "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
  warning:
    "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20",
};

export default function SkillBadge({
  label,
  type = "secondary",
  background,
}: Props) {
  return (
    <span
      className={`
        inline-flex items-center
        text-[10px] font-semibold uppercase tracking-wider
        px-2 py-0.5 rounded-full border
        ${background || styles[type]}
      `}
    >
      {label}
    </span>
  );
}
