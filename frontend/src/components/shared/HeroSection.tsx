import { motion, type Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 shadow-xl">
      {/* Glow background effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative text-center px-6 py-16 md:py-24 space-y-8"
      >

        <motion.div variants={item}>
          <Badge>AI-Powered ATS Resume Analyzer</Badge>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-6xl font-bold"
        >
          Get your resume{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ATS-ready
          </span>{" "}
          in seconds
        </motion.h1>

        <motion.p
          variants={item}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Upload your resume and job description for instant ATS scoring.
        </motion.p>

        <motion.div variants={item}>
          <Button>Analyze Resume</Button>
        </motion.div>

      </motion.div>
    </div>
  );
}