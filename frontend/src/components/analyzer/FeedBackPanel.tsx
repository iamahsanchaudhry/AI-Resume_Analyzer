import FeedbackCard from "../shared/FeedbackCard";
import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

interface Feedback {
  type: "success" | "warning" | "danger";
  title: string;
  description: string;
}

interface Props {
  feedback: Feedback[];
}

export default function FeedbackPanel({ feedback }: Props) {
  const safeFeedback = Array.isArray(feedback) ? feedback : [];

  if (safeFeedback.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-10 text-center"
      >
        <Sparkles className="w-5 h-5 text-zinc-300 dark:text-zinc-600 mx-auto mb-2" />
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          No feedback available yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Section label — mirrors landing's small eyebrow style */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 dark:text-emerald-400">
          Smart Feedback
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-5"
      >
        {safeFeedback.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{
              y: -5,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <FeedbackCard
              title={item.title}
              description={item.description}
              variant={item.type}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
