import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  description: string;
  variant: "success" | "warning" | "danger";
}

const styles: Record<
  "success" | "warning" | "danger",
  {
    card: string;
    iconBg: string;
    iconColor: string;
    title: string;
    body: string;
    accent: string;
    Icon: React.ComponentType<{ className?: string }>;
    label: string;
    labelColor: string;
  }
> = {
  success: {
    card: "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/80 hover:border-emerald-300 dark:hover:border-emerald-500/40",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    title: "text-zinc-900 dark:text-zinc-50",
    body: "text-zinc-500 dark:text-zinc-400",
    accent: "from-emerald-500/10 via-emerald-400/5 to-transparent",
    Icon: CheckCircle2,
    label: "Strength",
    labelColor: "text-emerald-600 dark:text-emerald-400",
  },
  warning: {
    card: "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/80 hover:border-amber-300 dark:hover:border-amber-500/40",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
    iconColor: "text-amber-600 dark:text-amber-400",
    title: "text-zinc-900 dark:text-zinc-50",
    body: "text-zinc-500 dark:text-zinc-400",
    accent: "from-amber-500/10 via-amber-400/5 to-transparent",
    Icon: TrendingUp,
    label: "Improve",
    labelColor: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    card: "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800/80 hover:border-red-300 dark:hover:border-red-500/40",
    iconBg: "bg-red-500/10 dark:bg-red-500/15",
    iconColor: "text-red-600 dark:text-red-400",
    title: "text-zinc-900 dark:text-zinc-50",
    body: "text-zinc-500 dark:text-zinc-400",
    accent: "from-red-500/10 via-red-400/5 to-transparent",
    Icon: AlertTriangle,
    label: "Fix",
    labelColor: "text-red-600 dark:text-red-400",
  },
};

export default function FeedbackCard({
  title,
  description,
  variant = "success",
}: Props) {
  const s = styles[variant ?? "success"];
  const Icon = s.Icon;

  return (
    <Card
      className={`group relative h-full rounded-2xl border ${s.card} shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40 transition-all duration-300 overflow-hidden`}
    >
      {/* Gradient wash on hover — mirrors landing feature cards */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <CardContent className="relative p-5 space-y-4">
        {/* ICON */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 320,
            damping: 18,
          }}
          className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${s.iconColor}`} />
        </motion.div>

        <div className="space-y-2">
          {/* Tiny uppercase label, like landing eyebrows */}
          <p
            className={`text-[10px] font-bold uppercase tracking-widest ${s.labelColor}`}
          >
            {s.label}
          </p>
          <h3 className={`font-semibold text-base leading-snug ${s.title}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${s.body}`}>{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
