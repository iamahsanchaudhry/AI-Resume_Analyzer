import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ErrorAlertProps = {
  message?: string | null;
  onClose?: () => void;
};

const ErrorAlert = ({ message, onClose }: ErrorAlertProps) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 shadow-sm dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-[2px] h-4 w-4 text-red-500" />
            <p className="leading-snug">{message}</p>
          </div>

          {onClose && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorAlert;
