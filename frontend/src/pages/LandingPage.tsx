import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Hero from "@/components/shared/HeroSection";
import { useNavigate } from "react-router-dom";

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
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white mt-20">
            {/* HERO */}
            <section className=" max-w-6xl mx-auto">
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
                            AI-powered resume analysis to make you 
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
            </section>

            {/* FEATURES */}
            <section className="px-6 py-24 max-w-6xl mx-auto">
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
                                    <CardDescription className="mt-2">
                                        {f.desc}
                                    </CardDescription>
                                </CardHeader>

                            </Card>

                        </motion.div>
                    ))}
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="px-6 py-5 max-w-5xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-16">
                    How it works
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        "Upload Resume",
                        "Paste Job Description",
                        "Get Insights",
                    ].map((step, i) => (
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
                    ))}
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

            {/* FOOTER */}
            <footer className="text-center text-sm text-muted-foreground py-6">
                © 2026 ATS Resume Analyzer
            </footer>
        </div>
    );
}
