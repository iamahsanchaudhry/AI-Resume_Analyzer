import InputPanel from "@/components/analyzer/InputPanel";
import ResultsView from "@/components/analyzer/ResultsView";
import UploadZone from "@/components/analyzer/UploadZone";
import AuthDialog from "@/components/shared/AuthDialog";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import useResumeAnalyzer from "@/hooks/useResumeAnalyzer";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  AlertTriangle,
  X,
  Sparkles,
  FileText,
  Target,
  BarChart3,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ─── Animation Variants (matched to landing) ─────────────── */
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

/* ─── Scroll-triggered section wrapper ───────────────────── */
function AnimatedSection({
  children,
  className = "",
  variants = stagger,
}: {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Numbered section header ────────────────────────────── */
function SectionHeader({
  num,
  icon: Icon,
  title,
  subtitle,
  accent,
}: {
  num: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  accent: "blue" | "violet" | "emerald";
}) {
  const accentMap = {
    blue: "text-blue-500 dark:text-blue-400",
    violet: "text-violet-500 dark:text-violet-400",
    emerald: "text-emerald-500 dark:text-emerald-400",
  };
  const bgMap = {
    blue: "bg-blue-500/10 dark:bg-blue-500/15",
    violet: "bg-violet-500/10 dark:bg-violet-500/15",
    emerald: "bg-emerald-500/10 dark:bg-emerald-500/15",
  };

  return (
    <motion.div variants={fadeUp} className="flex items-center gap-4 mb-5">
      <div
        className={`flex-shrink-0 w-11 h-11 rounded-xl ${bgMap[accent]} flex items-center justify-center`}
      >
        <Icon className={`w-5 h-5 ${accentMap[accent]}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${accentMap[accent]}`}
          >
            Step {num}
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResumeAnalyzerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const {
    file,
    setFile,
    jobDescription,
    setJobDescription,
    analyzeResume,
    result,
    loading,
    error,
    setError,
    showGuestPopup,
    setShowGuestPopup,
  } = useResumeAnalyzer();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-x-hidden">
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[78vh] flex items-center justify-center overflow-hidden pt-5 pb-5"
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 h-[560px] w-[560px] rounded-full bg-blue-500 blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-500 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.14, 0.07] }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
            className="absolute bottom-10 left-0 h-[320px] w-[320px] rounded-full bg-emerald-500 blur-[110px]"
          />
          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #6366f1 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>

        {/* Hero content with parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-7"
          >
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <Badge
                variant="secondary"
                className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm"
              >
                <Sparkles className="inline w-3 h-3 mr-1.5 text-violet-500" />
                Resume Analyzer
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold leading-[1.06] tracking-tight"
            >
              Analyze your resume,{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  instantly
                </span>
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.55, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
                />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              Upload your resume and paste the job description. Get your ATS
              score, skill gaps, and smart feedback in under 10 seconds.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════
          WORKSPACE
      ══════════════════════════════════════════════ */}
      <div className="relative max-w-4xl mx-auto px-6 pb-24 -mt-8 space-y-14">
        {/* ─── STEP 1: UPLOAD ─── */}
        <AnimatedSection>
          <SectionHeader
            num="01"
            icon={FileText}
            title="Upload your resume"
            subtitle="PDF or DOCX — processed securely, never stored."
            accent="blue"
          />
          <motion.div variants={fadeUp}>
            <UploadZone file={file} onFileSelect={setFile} />
          </motion.div>
        </AnimatedSection>

        {/* ─── STEP 2: JOB DESCRIPTION ─── */}
        <AnimatedSection>
          <SectionHeader
            num="02"
            icon={Target}
            title="Paste the job description"
            subtitle="The more detail you give, the sharper the analysis."
            accent="violet"
          />
          <motion.div variants={fadeUp}>
            <InputPanel
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onAnalyze={analyzeResume}
              isLoading={loading}
            />
          </motion.div>
        </AnimatedSection>

        {/* ─── ERROR ─── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400"
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-[2px] h-4 w-4 flex-shrink-0 text-red-500" />
                <p className="leading-relaxed">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="flex-shrink-0 rounded-md p-1 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                aria-label="Dismiss error"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── LOADING ─── */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-center py-8"
            >
              <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm px-8 py-6 shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-purple-500/5" />
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative flex flex-col items-center gap-3"
                >
                  <LoadingSpinner />
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                    Analyzing your resume…
                  </span>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    This usually takes under 10 seconds
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── STEP 3: RESULTS ─── */}
        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SectionHeader
                num="03"
                icon={BarChart3}
                title="Your analysis"
                subtitle="ATS score, matched skills, and targeted feedback."
                accent="emerald"
              />
              <ResultsView
                score={result.score}
                skills={result.skills}
                feedback={result.feedback}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── EMPTY STATE ─── */}
        {!result && !loading && (
          <AnimatedSection className="flex justify-center pt-4">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500"
            >
              <Sparkles className="w-3.5 h-3.5 text-violet-500" />
              Upload a resume and paste a job description to begin.
            </motion.div>
          </AnimatedSection>
        )}
      </div>

      {/* ═════════ AUTH ═════════ */}
      <AuthDialog
        isOpen={showGuestPopup}
        onClose={() => setShowGuestPopup(false)}
        onLogin={() => navigate("/login")}
      />
    </div>
  );
}
