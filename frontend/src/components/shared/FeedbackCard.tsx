import { Card, CardContent } from "@/components/ui/card";

interface Props {
  title: string;
  description: string;
  variant?: "success" | "warning" | "danger";
}

const styles: Record<NonNullable<Props["variant"]>, { card: string; icon: string; iconBg: string; title: string; body: string; symbol: string }> = {
  success: {
    card:   "bg-emerald-100 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800",
    iconBg: "bg-emerald-500",
    icon:   "text-white",
    title:  "text-emerald-800 dark:text-emerald-300",
    body:   "text-emerald-700 dark:text-emerald-400",
    symbol: "✓",
  },
  warning: {
    card:   "bg-amber-100 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800",
    iconBg: "bg-amber-400",
    icon:   "text-white",
    title:  "text-amber-800 dark:text-amber-300",
    body:   "text-amber-700 dark:text-amber-400",
    symbol: "↑",
  },
  danger: {
    card:   "bg-red-100 border-red-200 dark:bg-red-950/30 dark:border-red-800",
    iconBg: "bg-red-400",
    icon:   "text-white",
    title:  "text-red-800 dark:text-red-300",
    body:   "text-red-700 dark:text-red-400",
    symbol: "!",
  },
};

export default function FeedbackCard({ title, description, variant = "success" }: Props) {
  const s = styles[variant];

  return (
      <Card className={`h-full rounded-xl shadow-none transition hover:scale-[1.02] duration-200 ${s.card}`}>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start gap-2.5">
          <span className={`${s.iconBg} ${s.icon} text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
            {s.symbol}
          </span>
          <div className="space-y-1">
            <h3 className={`font-semibold text-sm ${s.title}`}>{title}</h3>
            <p className={`text-xs leading-relaxed ${s.body}`}>{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}