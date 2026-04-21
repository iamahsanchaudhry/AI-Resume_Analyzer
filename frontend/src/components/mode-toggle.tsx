import { Moon, Sun, Monitor, Check } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-9 w-9 rounded-lg border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-amber-500" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-violet-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-40 p-1 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-black/5 dark:shadow-black/40"
      >
        {themes.map((t) => {
          const Icon = t.icon;
          const isActive = theme === t.value;
          return (
            <DropdownMenuItem
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-violet-700 dark:text-violet-300 focus:from-blue-500/15 focus:to-violet-500/15"
                  : "text-zinc-700 dark:text-zinc-300 focus:bg-zinc-100 dark:focus:bg-zinc-800"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              />
              <span className="flex-1 font-medium">{t.label}</span>
              {isActive && (
                <Check className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
