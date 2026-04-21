import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, type Variants } from "framer-motion";
import { Target } from "lucide-react";
import SkillRow from "./SkillRow";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
}

interface Props {
  skills: Skill[];
}

export default function SkillsPanel({ skills }: Props) {
  const safeSkills = Array.isArray(skills) ? skills : [];

  const counts = {
    matched: safeSkills.filter((s) => s.status === "matched").length,
    partial: safeSkills.filter((s) => s.status === "partial").length,
    missing: safeSkills.filter((s) => s.status === "missing").length,
  };

  return (
    <Card className="group relative h-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40 transition-all duration-300 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-16 -left-16 w-48 h-48 rounded-full bg-violet-500/10 dark:bg-violet-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Skill Match
          </CardTitle>
          <div className="w-8 h-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/15 flex items-center justify-center">
            <Target className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          </div>
        </div>

        {/* Summary counts */}
        {safeSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-baseline gap-1.5 pt-1"
          >
            <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
              {counts.matched}
            </span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500">
              of {safeSkills.length} skills matched
            </span>
          </motion.div>
        )}
      </CardHeader>

      <CardContent className="relative flex flex-col flex-1">
        {safeSkills.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-zinc-400 dark:text-zinc-500 text-center py-6"
          >
            No skills matched after AI analysis.
          </motion.p>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-2.5 max-h-80 overflow-y-auto pr-1 -mr-1 scrollbar-minimal"
          >
            {safeSkills.map((skill) => (
              <motion.div key={skill.name} variants={fadeUp}>
                <SkillRow name={skill.name} status={skill.status} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* LEGEND */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-4 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="tabular-nums font-medium">{counts.matched}</span>
            Matched
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="tabular-nums font-medium">{counts.partial}</span>
            Partial
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="tabular-nums font-medium">{counts.missing}</span>
            Missing
          </span>
        </motion.div>
      </CardContent>
    </Card>
  );
}
