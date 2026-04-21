import { motion } from "framer-motion";

interface Props {
  size?: "sm" | "md" | "lg";
  inline?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export default function LoadingSpinner({ size = "md", inline = false }: Props) {
  const dimension = sizeMap[size];

  const spinner = (
    <div className={`relative ${dimension}`}>
      {/* Outer gradient ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-0 rounded-full`}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #3b82f6 90deg, #8b5cf6 180deg, #a855f7 270deg, transparent 360deg)",
          WebkitMask:
            "radial-gradient(circle, transparent 55%, black 57%, black 100%)",
          mask: "radial-gradient(circle, transparent 55%, black 57%, black 100%)",
        }}
      />
      {/* Subtle inner pulse */}
      <motion.div
        animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[30%] rounded-full bg-gradient-to-br from-blue-500 to-violet-500 blur-sm"
      />
    </div>
  );

  if (inline) return spinner;

  return <div className="flex items-center justify-center py-6">{spinner}</div>;
}
