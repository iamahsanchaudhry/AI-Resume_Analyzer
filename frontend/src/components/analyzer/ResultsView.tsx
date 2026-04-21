import FeedbackPanel from "./FeedBackPanel";
import ScoreCard from "./ScoreCard";
import SkillsPanel from "./SkillsPanel";
import { motion, type Variants } from "framer-motion";

/* ─── Animation System (matched to landing) ─────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Types ─────────────────────────────────── */
interface Skill {
  name: string;
  status: "matched" | "missing" | "partial";
}

interface Feedback {
  type: "success" | "warning" | "danger";
  title: string;
  description: string;
}

interface Props {
  score: number;
  skills: Skill[];
  feedback: Feedback[];
}

/* ─── Component ─────────────────────────────── */
export default function ResultsView({ score, skills, feedback }: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* ═════════ TOP GRID ═════════
          Score gets a bit more room than Skills — it's the headline number.
      */}
      <motion.div variants={stagger} className="grid gap-6 md:grid-cols-5">
        {/* SCORE (2/5 width — compact, high-impact) */}
        <motion.div variants={scaleIn} className="md:col-span-2">
          <ScoreCard score={score} />
        </motion.div>

        {/* SKILLS (3/5 width — needs space for chips/list) */}
        <motion.div variants={fadeUp} className="md:col-span-3">
          <SkillsPanel skills={skills} />
        </motion.div>
      </motion.div>

      {/* ═════════ FEEDBACK ═════════ */}
      <motion.div variants={fadeUp}>
        <FeedbackPanel feedback={feedback} />
      </motion.div>
    </motion.div>
  );
}
