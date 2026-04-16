import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const features = [
  {
    title: "ATS Score",
    desc: "See how well your resume matches the job description.",
  },
  {
    title: "Skill Matching",
    desc: "Identify matched and missing skills instantly.",
  },
  {
    title: "Smart Feedback",
    desc: "Get actionable suggestions to improve your resume.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white mt-20">
      {/* HERO */}
      <section className=" max-w-6xl mx-auto md:px-6 px-4">
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
              AI-powered resume analysis to make you{" "}
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

            <motion.div
              variants={item}
              className="flex items-center justify-center gap-2"
            >
              <Button onClick={() => navigate("/analyze")}>
                Analyze Resume
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-24 max-w-6xl mx-auto" id="features">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything you need to improve your resume
          </h2>
          <p className="text-muted-foreground mt-3">
            Built to help you pass ATS and land interviews faster
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {features.map((f, i) => (
            <motion.div key={i} variants={item} className="h-full flex">
              <Card className="group relative flex flex-col flex-1 overflow-hidden border hover:shadow-xl transition-all duration-300">
                {/* glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

                {/* content wrapper MUST grow */}
                <CardHeader className="relative flex-1">
                  <CardTitle className="text-lg">{f.title}</CardTitle>
                  <CardDescription className="mt-2">{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-5 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">How it works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {["Upload Resume", "Paste Job Description", "Get Insights"].map(
            (step, i) => (
              <motion.div key={i} variants={item} className="space-y-4">
                {/* Step circle */}
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow-lg">
                  {i + 1}
                </div>

                <h3 className="font-semibold text-lg">{step}</h3>

                <p className="text-sm text-muted-foreground">
                  {i === 0 && "Upload your resume in seconds."}
                  {i === 1 && "Paste the job description you're targeting."}
                  {i === 2 && "Get instant ATS score and feedback."}
                </p>
              </motion.div>
            ),
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center rounded-2xl border bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to improve your resume?
          </h2>

          <p className="text-muted-foreground mb-6">
            Start analyzing your resume for free — no signup required.
          </p>

          <Button
            size="lg"
            className="px-8 py-6 text-base font-semibold shadow-lg"
            onClick={() => navigate("/analyze")}
          >
            Analyze Now
          </Button>

          <p className="text-xs text-muted-foreground mt-4">
            Free • Instant results • No signup
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-3xl mx-auto mt-2">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Everything you need to know about how the AI resume analyzer works
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="how-it-works"
          className="space-y-3"
        >
          <AccordionItem
            value="how-it-works"
            className="border border-border/50 rounded-xl px-4 bg-card/40 backdrop-blur-sm shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-medium py-3 hover:no-underline">
              How does the resume analysis work?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              We extract text from your resume, process it using AI (Groq LLaMA
              model), and identify key technical and domain-specific skills.
              Then we match them against the job description to generate an ATS
              score.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="accuracy"
            className="border border-border/50 rounded-xl px-4 bg-card/40 backdrop-blur-sm shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-medium py-3 hover:no-underline">
              How accurate is the AI scoring?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              The scoring is deterministic after skill extraction. We use AI
              only for understanding skills, and all matching logic is handled
              programmatically to ensure consistent results every time.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="supported-files"
            className="border border-border/50 rounded-xl px-4 bg-card/40 backdrop-blur-sm shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-medium py-3 hover:no-underline">
              Which file formats are supported?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              We currently support PDF and DOCX resumes. Files are processed
              securely in memory and are not permanently stored on the server.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="privacy"
            className="border border-border/50 rounded-xl px-4 bg-card/40 backdrop-blur-sm shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-medium py-3 hover:no-underline">
              Is my resume stored or shared?
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
              Your resume is only used for processing and analysis. We do not
              share your data. You can also choose a version of the system that
              avoids permanent file storage entirely.
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </section>
    </div>
  );
}
