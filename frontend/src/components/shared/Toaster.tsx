import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

interface ToasterOptions {
  type: ToastType;
  message: string;
  description?: string;
  duration?: number;
}

/**
 * Fires a toast notification. Wraps Sonner with project defaults
 * (dismissible, sensible duration, consistent close action).
 *
 * Two call styles are supported:
 *
 * 1) Options object (preferred):
 *    Toaster({ type: "success", message: "Resume uploaded" });
 *    Toaster({ type: "error", message: "Upload failed", description: "File too large" });
 *
 * 2) Positional (legacy):
 *    Toaster("success", "Welcome Back!", `Logged in as ${name}`);
 *    Toaster("error", "Something broke");
 */

// Overloads — the signatures TypeScript matches against at call sites.
export default function Toaster(
  options: ToasterOptions,
): ReturnType<typeof toast.success>;
export default function Toaster(
  type: ToastType,
  message: string,
  description?: string,
  duration?: number,
): ReturnType<typeof toast.success>;

// Implementation — handles both shapes.
export default function Toaster(
  typeOrOptions: ToastType | ToasterOptions,
  message?: string,
  description?: string,
  duration?: number,
) {
  // Normalise to a single internal shape.
  const opts: ToasterOptions =
    typeof typeOrOptions === "string"
      ? {
          type: typeOrOptions,
          message: message ?? "",
          description,
          duration,
        }
      : typeOrOptions;

  return toast[opts.type](opts.message, {
    description: opts.description,
    duration: opts.duration ?? 5000,
    action: {
      label: "Close",
      onClick: () => toast.dismiss(),
    },
  });
}
