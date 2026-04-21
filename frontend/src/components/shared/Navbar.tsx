import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, Sparkles, Home, FileText } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const { user, isLoggedIn, loading, logout } = useAuth();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  /* ─── Logo ─────────────────────────────────────── */
  const Logo = () => (
    <Link to="/" className="group flex items-center gap-2 shrink-0">
      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
        <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
      </div>
      <span className="text-base font-bold tracking-tight whitespace-nowrap">
        <span className="text-zinc-900 dark:text-zinc-50">AI Resume </span>
        <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
          Analyzer
        </span>
      </span>
    </Link>
  );

  /* ─── Mobile auth block ────────────────────────── */
  const MobileAuthBlock = () => {
    if (!isLoggedIn || loading) {
      return (
        <div className="flex flex-col gap-2 px-4 pt-4 pb-2 border-t border-zinc-100 dark:border-zinc-800">
          <Link to="/login" className="w-full">
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full h-10 font-medium border-zinc-200 dark:border-zinc-700"
              >
                Login
              </Button>
            </SheetClose>
          </Link>
          <Link to="/signup" className="w-full">
            <SheetClose asChild>
              <Button className="w-full h-10 font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 text-white shadow-md shadow-blue-500/20">
                Sign Up
              </Button>
            </SheetClose>
          </Link>
        </div>
      );
    }

    return (
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 px-4 space-y-3">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-3">
          <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-zinc-900 shadow-sm">
            <AvatarImage
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                user?.name ?? user?.email ?? "User",
              )}&backgroundColor=6366f1,8b5cf6,a855f7&backgroundType=gradientLinear`}
              alt={user?.name ?? "User"}
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {user?.name ?? "User"}
            </p>
            {user?.email && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <SheetClose asChild>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full h-10 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-700 dark:hover:text-red-300"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </SheetClose>
      </div>
    );
  };

  const mobileLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/analyze", label: "Analyze Resume", icon: FileText },
  ];

  return (
    <motion.nav
      animate={{
        backgroundColor: scrolled
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.6)",
      }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 dark:!bg-zinc-950/70 ${
        scrolled
          ? "border-b border-zinc-200/80 dark:border-zinc-800/80 shadow-sm shadow-black/[0.02] dark:shadow-black/20"
          : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3">
        <Logo />

        <div className="flex items-center gap-2">
          {/* ─── Desktop Auth ─── */}
          <div className="hidden md:flex items-center gap-2">
            {!isLoggedIn || loading ? (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="h-9 px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="h-9 px-4 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 border-0 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-[1.03]">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950 transition-transform hover:scale-105">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                    <Avatar className="relative h-9 w-9 ring-2 ring-white dark:ring-zinc-900">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                          user?.name ?? user?.email ?? "User",
                        )}&backgroundColor=6366f1,8b5cf6,a855f7&backgroundType=gradientLinear`}
                        alt={user?.name ?? "User"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  className="w-60 p-0 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-black/5 dark:shadow-black/40 overflow-hidden"
                >
                  {/* User card header */}
                  <div className="flex items-center gap-3 p-3 border-b border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-blue-500/[0.04] via-violet-500/[0.04] to-transparent">
                    <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-zinc-900 shadow-sm">
                      <AvatarImage
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                          user?.name ?? user?.email ?? "User",
                        )}&backgroundColor=6366f1,8b5cf6,a855f7&backgroundType=gradientLinear`}
                        alt={user?.name ?? "User"}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {user?.name ?? "User"}
                      </p>
                      {user?.email && (
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={logout}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-700 dark:focus:text-red-300 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <ModeToggle />

          {/* ─── Mobile Trigger ─── */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden h-9 w-9 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[280px] p-0 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800"
              showCloseButton={false}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 via-violet-500 to-purple-500 flex items-center justify-center shadow-sm">
                    <Sparkles
                      className="w-3.5 h-3.5 text-white"
                      strokeWidth={2.5}
                    />
                  </div>
                  <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-50">
                    Menu
                  </span>
                </div>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>

              {/* Links */}
              <div className="flex flex-col py-3 px-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 px-3 py-2">
                  Navigation
                </p>
                {mobileLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to;
                  return (
                    <SheetClose asChild key={link.to}>
                      <Link
                        to={link.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-violet-700 dark:text-violet-300"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>

              {/* Auth block pinned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 pb-5">
                <MobileAuthBlock />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
