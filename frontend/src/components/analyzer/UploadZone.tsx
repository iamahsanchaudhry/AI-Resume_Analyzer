import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, X } from "lucide-react";

interface Props {
  onFileSelect: (file: File) => void;
  file?: File | null;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function UploadZone({ onFileSelect, file }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const selectedFile = files[0];

    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.endsWith(".docx")
    ) {
      setError("Only PDF or DOCX files are allowed.");
      return;
    }

    setError(null);
    onFileSelect(selectedFile);
  };

  // const clearFile = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   if (inputRef.current) inputRef.current.value = "";
  //   // Passing null-ish file back by re-triggering parent prop is up to parent;
  //   // since the prop contract is `File`, we just reset the input and rely on
  //   // the parent to handle re-selection. If your hook supports clearing, wire
  //   // a `onFileClear` prop and call it here.
  // };

  return (
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files);
          }}
          className={`
            group relative overflow-hidden cursor-pointer
            rounded-2xl border-2 border-dashed
            bg-white dark:bg-zinc-900
            transition-all duration-300
            ${
              isDragging
                ? "border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 scale-[1.01]"
                : file
                  ? "border-emerald-400 dark:border-emerald-500/60"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500/60"
            }
          `}
        >
          {/* Ambient hover glow */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-transparent transition-opacity duration-500 ${
              isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          />

          <AnimatePresence mode="wait">
            {!file ? (
              /* ─── EMPTY STATE ─── */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative flex flex-col items-center justify-center py-14 px-6 text-center space-y-4"
              >
                {/* Icon with animated ring */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: isDragging ? [1, 1.15, 1] : [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isDragging ? 1 : 2.5,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 blur-xl"
                  />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                      ease: "easeInOut",
                    }}
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 dark:from-blue-500/15 dark:to-violet-500/15 border border-blue-200/50 dark:border-blue-500/20 flex items-center justify-center"
                  >
                    <UploadCloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {isDragging ? "Release to upload" : "Drop your resume here"}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    or click to browse —{" "}
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      PDF or DOCX
                    </span>
                  </p>
                </div>

                <Button
                  variant="outline"
                  type="button"
                  className="mt-1 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-medium shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Choose File
                </Button>
              </motion.div>
            ) : (
              /* ─── FILE SELECTED STATE ─── */
              <motion.div
                key="selected"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-center gap-4 py-6 px-6"
              >
                {/* File icon */}
                <div className="flex-shrink-0 relative">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-200/60 dark:border-emerald-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {formatBytes(file.size)}
                    </p>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      Ready to analyze
                    </p>
                  </div>
                </div>

                {/* Change file CTA */}
                <div className="flex-shrink-0 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Change
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
          />
        </div>
      </motion.div>

      {/* Inline error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-3 flex items-start justify-between gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-400"
          >
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="flex-shrink-0 rounded p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
