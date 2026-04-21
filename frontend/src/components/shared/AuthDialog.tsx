import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Sparkles, Save, TrendingUp } from "lucide-react";

type AuthDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
};

const perks = [
  { icon: Save, text: "Save every analysis" },
  { icon: TrendingUp, text: "Track score progress" },
  { icon: Sparkles, text: "Unlock deeper feedback" },
];

const AuthDialog = ({ isOpen, onClose, onLogin }: AuthDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="fixed inset-0 bg-black/60 backdrop-blur-md" />

      <DialogContent
        className="sm:max-w-md p-0 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* ═════════ DECORATIVE HEADER ═════════ */}
        <div className="relative h-28 bg-gradient-to-br from-blue-500/15 via-violet-500/15 to-purple-500/15 dark:from-blue-500/20 dark:via-violet-500/20 dark:to-purple-500/20 border-b border-zinc-200/60 dark:border-zinc-800/60 overflow-hidden">
          {/* Ambient animated blobs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 left-[20%] w-36 h-36 rounded-full bg-blue-500/50 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-10 right-[20%] w-36 h-36 rounded-full bg-violet-500/50 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-purple-500/40 blur-3xl"
          />
        </div>

        {/* ═════════ BODY ═════════ */}
        <div className="relative px-6 pb-6 text-center">
          {/* Floating lock badge — bridges the header and body */}
          <motion.div
            initial={{ scale: 0, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
              delay: 0.1,
            }}
            className="absolute md:left-[43%] left-[40%] -top-10 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 p-[2px] shadow-xl shadow-violet-500/30"
          >
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-zinc-950 flex items-center justify-center">
              <Lock
                className="w-6 h-6 text-violet-600 dark:text-violet-400"
                strokeWidth={2.5}
              />
            </div>
          </motion.div>

          {/* Space for the floating badge */}
          <div className="h-10" />

          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Continue with an account
            </DialogTitle>

            <DialogDescription className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Save your analysis, track improvements, and unlock the full
              feedback experience.
            </DialogDescription>
          </DialogHeader>

          {/* Perks */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08, delayChildren: 0.25 },
              },
            }}
            className="mt-5 space-y-2.5"
          >
            {perks.map((perk) => {
              const PerkIcon = perk.icon;
              return (
                <motion.div
                  key={perk.text}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-violet-500/10 dark:from-blue-500/15 dark:to-violet-500/15 border border-violet-200/40 dark:border-violet-500/20 flex items-center justify-center">
                    <PerkIcon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-left font-medium">{perk.text}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Actions */}
          <div className="flex flex-col gap-2 mt-6">
            <Button
              onClick={onLogin}
              className="group w-full h-11 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Login / Sign Up
              <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="ghost"
              onClick={onClose}
              className="w-full h-10 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Continue as guest
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
