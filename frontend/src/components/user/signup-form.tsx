import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import ErrorAlert from "../shared/ErrorAlert";
import { motion } from "framer-motion";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Circle,
} from "lucide-react";

interface Props extends React.ComponentProps<"div"> {}

export function SignupForm({ className, ...props }: Props) {
  const { signup, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
    navigate("/");
  };

  // Simple password strength signals
  const checks = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Contains a number", valid: /\d/.test(password) },
    {
      label: "Upper & lower case",
      valid: /[a-z]/.test(password) && /[A-Z]/.test(password),
    },
  ];
  const strength = checks.filter((c) => c.valid).length;
  const strengthColor =
    strength === 0
      ? "bg-zinc-200 dark:bg-zinc-800"
      : strength === 1
        ? "bg-red-500"
        : strength === 2
          ? "bg-amber-500"
          : "bg-emerald-500";
  const strengthLabel =
    strength === 0
      ? "Enter a password"
      : strength === 1
        ? "Weak"
        : strength === 2
          ? "Okay"
          : "Strong";

  return (
    <div
      className={
        "relative flex flex-col gap-6 w-full max-w-md mx-auto " +
        (className ?? "")
      }
      {...props}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[360px] h-[360px] rounded-full bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-purple-500/15 blur-3xl opacity-70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-2xl shadow-black/5 dark:shadow-black/40"
      >
        {/* Top gradient accent strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500" />

        <div className="p-7 md:p-8 space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="space-y-3 text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-purple-500/10 border border-violet-200/60 dark:border-violet-500/20">
              <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Create your account
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Save your analyses and track your progress.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FieldGroup className="space-y-5">
              {/* Email */}
              <Field>
                <FieldLabel
                  htmlFor="email"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Email
                </FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-violet-500/30 focus-visible:border-violet-400 dark:focus-visible:border-violet-500/60 transition-colors"
                  />
                </div>
                <FieldDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                  We&apos;ll never share your email.
                </FieldDescription>
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
                >
                  Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 pr-10 bg-zinc-50 dark:bg-zinc-950/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-violet-500/30 focus-visible:border-violet-400 dark:focus-visible:border-violet-500/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Strength meter */}
                <div className="space-y-2 pt-1">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden"
                      >
                        <motion.div
                          animate={{
                            width: i < strength ? "100%" : "0%",
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className={`h-full rounded-full ${strengthColor}`}
                        />
                      </div>
                    ))}
                  </div>

                  <ul className="grid grid-cols-1 gap-1">
                    {checks.map((c) => (
                      <li
                        key={c.label}
                        className={`flex items-center gap-1.5 text-xs transition-colors ${
                          c.valid
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-400 dark:text-zinc-500"
                        }`}
                      >
                        {c.valid ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Circle className="w-3 h-3" />
                        )}
                        {c.label}
                      </li>
                    ))}
                  </ul>

                  {password.length > 0 && (
                    <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                      Strength:{" "}
                      <span
                        className={
                          strength === 3
                            ? "text-emerald-600 dark:text-emerald-400"
                            : strength === 2
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-500 dark:text-red-400"
                        }
                      >
                        {strengthLabel}
                      </span>
                    </p>
                  )}
                </div>
              </Field>

              <ErrorAlert message={error} onClose={() => setError(null)} />

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="group h-11 w-full font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <FieldDescription className="text-center text-sm text-zinc-500 dark:text-zinc-400 pt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-colors"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </motion.form>
        </div>
      </motion.div>

      {/* Footnote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-zinc-400 dark:text-zinc-500"
      >
        By creating an account, you agree to our Terms & Privacy.
      </motion.p>
    </div>
  );
}
