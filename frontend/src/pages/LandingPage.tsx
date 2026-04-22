import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  Zap,
  Target,
  Sparkles,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

/* ─── Animation Variants ──────────────────────────────────── */
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

/* ─── Data ────────────────────────────────────────────────── */
const features = [
  {
    icon: BarChart3,
    title: "ATS Score",
    desc: "Instantly see how your resume ranks against ATS algorithms — with a clear score you can act on.",
    gradient: "from-blue-500/10 via-blue-400/5 to-transparent",
    border: "hover:border-blue-400/50 dark:hover:border-blue-500/50",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
    iconColor: "text-blue-600 dark:text-blue-400",
    num: "01",
  },
  {
    icon: Target,
    title: "Skill Matching",
    desc: "Pinpoint exactly which skills the job needs that you're missing — and which ones you already nail.",
    gradient: "from-violet-500/10 via-violet-400/5 to-transparent",
    border: "hover:border-violet-400/50 dark:hover:border-violet-500/50",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
    iconColor: "text-violet-600 dark:text-violet-400",
    num: "02",
  },
  {
    icon: Sparkles,
    title: "Smart Feedback",
    desc: "Get precise, actionable suggestions to rewrite and restructure your resume for maximum impact.",
    gradient: "from-emerald-500/10 via-emerald-400/5 to-transparent",
    border: "hover:border-emerald-400/50 dark:hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    num: "03",
  },
];

const steps = [
  {
    icon: FileText,
    label: "Upload Resume",
    desc: "Drop your PDF or DOCX — processed securely in memory.",
    num: "01",
  },
  {
    icon: Target,
    label: "Paste Job Description",
    desc: "Add the role you're targeting for a tailored, precise analysis.",
    num: "02",
  },
  {
    icon: Zap,
    label: "Get Insights",
    desc: "Receive your ATS score, skill gaps, and improvement tips instantly.",
    num: "03",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Privacy-first", sub: "Files never shared" },
  { icon: Zap, label: "Instant results", sub: "Under 10 seconds" },
  { icon: BarChart3, label: "ATS-aligned", sub: "Industry-tested scoring" },
  { icon: CheckCircle2, label: "Free signup", sub: "100% free to use" },
];

const bullets = [
  "Free — no credit card needed",
  "Free AI Analysis",
  "Instant results in seconds",
  "Privacy-first: files never shared",
];

const faqs = [
  {
    value: "how-it-works",
    q: "How does the resume analysis work?",
    a: "We extract text from your resume and run it through an AI model to identify key technical and domain-specific skills. Those are then matched against the job description programmatically to generate an accurate ATS score and targeted feedback.",
  },
  {
    value: "accuracy",
    q: "How accurate is the AI scoring?",
    a: "Skill matching is deterministic — once the AI identifies skills, all matching logic is handled programmatically, ensuring consistent and reproducible scores every single time.",
  },
  {
    value: "supported-files",
    q: "Which file formats are supported?",
    a: "We currently support PDF and DOCX resume files. Files are processed entirely in memory and are never stored permanently on our servers.",
  },
  {
    value: "privacy",
    q: "Is my resume stored or shared?",
    a: "Your resume is only used for the duration of analysis. We do not share your data with third parties, and you can choose a version of the system that avoids all permanent file storage.",
  },
];

/* ─── Main Component ──────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-x-hidden">
      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20"
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
                AI-Powered ATS Resume Analyzer
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-extrabold leading-[1.06] tracking-tight"
            >
              Land more interviews,{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  ATS-ready
                </span>
                <motion.span
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.0, duration: 0.55, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500"
                />
              </span>{" "}
              in seconds
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              Upload your resume and job description for instant ATS scoring,
              skill gap analysis, and actionable AI feedback — no payment
              needed.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
            >
              <Button
                size="lg"
                onClick={() => navigate("/analyze")}
                className="h-12 px-8 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 shadow-lg shadow-blue-500/25 dark:shadow-blue-500/20 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-blue-500/30 group"
              >
                Analyze My Resume
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="h-12 px-8 text-base font-medium border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-all duration-200"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Trust bullets */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1"
            >
              {bullets.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  {b}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════ */}
      <section id="features" className="px-6 py-24 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16 space-y-3">
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400"
          >
            Features
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Everything you need to{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              get hired faster
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto"
          >
            Built to help you beat ATS filters and land more interviews — not
            just look good on paper.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              whileHover={{
                y: -5,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className={`group relative flex flex-col gap-4 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 transition-all duration-300 cursor-default hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/40 ${f.border}`}
            >
              {/* gradient wash */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div
                className={`relative w-11 h-11 rounded-xl ${f.iconBg} flex items-center justify-center`}
              >
                <f.icon className={`w-5 h-5 ${f.iconColor}`} />
              </div>

              <div className="relative space-y-1.5">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                  {f.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>

              {/* watermark number */}
              <span className="absolute top-4 right-5 text-4xl font-black text-zinc-100 dark:text-zinc-800 select-none group-hover:text-zinc-150 dark:group-hover:text-zinc-750 transition-colors duration-300">
                {f.num}
              </span>
            </motion.div>
          ))}
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16 space-y-3">
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-violet-500 dark:text-violet-400"
          >
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Three steps to a{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              stronger resume
            </span>
          </motion.h2>
        </AnimatedSection>

        <AnimatedSection className="relative grid md:grid-cols-3 gap-10">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

          {steps.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center gap-5"
            >
              <motion.div
                whileHover={{ scale: 1.09 }}
                transition={{ type: "spring", stiffness: 380, damping: 18 }}
                className="relative z-10 flex items-center justify-center w-20 h-20 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md dark:shadow-none"
              >
                <s.icon className="w-8 h-8 text-zinc-700 dark:text-zinc-200" />
                <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </span>
              </motion.div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
                  {s.num}
                </p>
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50">
                  {s.label}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-[200px] mx-auto">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST STRIP
      ══════════════════════════════════════════════ */}
      <div className="px-6 max-w-6xl mx-auto my-4">
        <AnimatedSection variants={scaleIn}>
          <motion.div
            variants={scaleIn}
            className="rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
                  <item.icon className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>

      {/* ══════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════ */}
      <section className="px-6 py-24">
        <AnimatedSection className="max-w-3xl mx-auto" variants={scaleIn}>
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-10 md:p-16 text-center shadow-2xl shadow-black/5 dark:shadow-black/30"
          >
            {/* Background glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-500/8 dark:bg-blue-500/12 blur-3xl" />
              <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-violet-500/8 dark:bg-violet-500/12 blur-3xl" />
            </div>

            <div className="relative space-y-6">
              <motion.div variants={fadeUp}>
                <Badge
                  variant="secondary"
                  className="border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm"
                >
                  <Sparkles className="inline w-3 h-3 mr-1.5 text-violet-500" />
                  Ready to get started?
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-bold tracking-tight"
              >
                Your stronger resume is{" "}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  one upload away
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto"
              >
                Analyze your resume for free — instant results, no account
                needed.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-3"
              >
                <Button
                  size="lg"
                  onClick={() => navigate("/analyze")}
                  className="h-12 px-10 text-base font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-blue-500/30 group"
                >
                  Analyze Now — It's Free
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  Free · Instant · Easy signup
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="px-6 pb-28 max-w-2xl mx-auto">
        <AnimatedSection className="text-center mb-10 space-y-2">
          <motion.p
            variants={fadeUp}
            className="text-sm font-semibold uppercase tracking-widest text-emerald-500 dark:text-emerald-400"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-2xl md:text-3xl font-bold tracking-tight"
          >
            Common questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-sm text-zinc-400 dark:text-zinc-500"
          >
            Everything you need to know about how the analyzer works.
          </motion.p>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <Accordion
              type="single"
              collapsible
              defaultValue="how-it-works"
              className="space-y-3"
            >
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.value}
                  value={faq.value}
                  className="not-last:border-b-0 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 bg-white dark:bg-zinc-900 shadow-sm dark:shadow-none overflow-hidden data-[state=open]:border-emerald-500/40 dark:data-[state=open]:border-emerald-400/30 data-[state=open]:shadow-md data-[state=open]:shadow-emerald-500/5 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-sm md:text-base font-medium py-4 hover:no-underline text-zinc-900 dark:text-zinc-100 [&>svg]:text-zinc-400 dark:[&>svg]:text-zinc-500 [&>svg]:transition-colors [&[data-state=open]>svg]:text-emerald-500 dark:[&[data-state=open]>svg]:text-emerald-400">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </AnimatedSection>
      </section>
    </div>
  );
}
