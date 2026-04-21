import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

interface Props {
  name: string;
  status: "matched" | "missing" | "partial";
}

const config = {
  matched: {
    label: "Matched",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-500/20",
    icon: Check,
    hoverBg: "hover:bg-emerald-500/[0.03] dark:hover:bg-emerald-500/[0.05]",
  },
  partial: {
    label: "Partial",
    dot: "bg-amber-500",
    pill: "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20",
    icon: Minus,
    hoverBg: "hover:bg-amber-500/[0.03] dark:hover:bg-amber-500/[0.05]",
  },
  missing: {
    label: "Missing",
    dot: "bg-red-500",
    pill: "bg-red-500/10 dark:bg-red-500/15 text-red-700 dark:text-red-400 border-red-200/60 dark:border-red-500/20",
    icon: X,
    hoverBg: "hover:bg-red-500/[0.03] dark:hover:bg-red-500/[0.05]",
  },
};

export default function SkillRow({ name, status }: Props) {
  const current = config[status];
  const Icon = current.icon;

  return (
    <motion.div
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg border border-transparent ${current.hoverBg} hover:border-zinc-100 dark:hover:border-zinc-800 transition-colors duration-200`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`flex-shrink-0 w-2 h-2 rounded-full ${current.dot} shadow-sm`}
        />
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 truncate">
          {name}
        </span>
      </div>

      <span
        className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${current.pill}`}
      >
        <Icon className="w-2.5 h-2.5" strokeWidth={3} />
        {current.label}
      </span>
    </motion.div>
  );
}
