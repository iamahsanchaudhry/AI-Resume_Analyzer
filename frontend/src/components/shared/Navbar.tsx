import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, Settings, User, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  const AuthBlock = ({ mobile = false }: { mobile?: boolean }) => {
    if (!isLoggedIn) {
      return (
        <div
          className={
            mobile ? "flex flex-col gap-2 mt-4" : "flex items-center gap-2"
          }
        >
          <Link to="/login" className={mobile ? "w-full" : ""}>
            <Button variant="outline" className={mobile ? "w-full" : ""}>
              Login
            </Button>
          </Link>

          <Link to="/signup" className={mobile ? "w-full" : ""}>
            <Button className={mobile ? "w-full" : ""}>Sign Up</Button>
          </Link>
        </div>
      );
    }
    return (
      <div
        className={
          mobile
            ? "mt-4 flex flex-col gap-3 border-t pt-4"
            : "flex items-center gap-3"
        }
      >
        {/* User Card */}
        <div
          className={
            mobile ? "flex items-center gap-3 px-2" : "flex items-center gap-2"
          }
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="leading-tight">
            <p className="text-sm font-medium">{user?.name ?? "User"}</p>

            {!mobile && (
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className={
            mobile ? "flex flex-col gap-2 w-full" : "flex items-center gap-2"
          }
        >
          <Link to="/profile" className={mobile ? "w-full" : ""}>
            <Button
              variant="outline"
              className={mobile ? "w-full justify-start" : ""}
            >
              Profile
            </Button>
          </Link>

          <Link to="/settings" className={mobile ? "w-full" : ""}>
            <Button
              variant="outline"
              className={mobile ? "w-full justify-start" : ""}
            >
              Settings
            </Button>
          </Link>

          <Button
            onClick={logout}
            variant="destructive"
            className={mobile ? "w-full" : ""}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/60 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <span className="text-base font-semibold whitespace-nowrap">
            AI Resume
          </span>
          <span className="text-base font-semibold whitespace-nowrap text-[#534AB7]">
            Analyzer
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-start gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-muted-foreground transition">
            Home
          </Link>
          <Link
            to="/analyze"
            className="hover:text-muted-foreground transition"
          >
            Analyze Resume
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>

                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="focus:outline-none">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52 bg-background">
                  {/* User Info */}
                  <DropdownMenuItem className="font-medium">
                    {user?.name ?? "User"}
                  </DropdownMenuItem>

                  <div className="my-1 h-px bg-border" />

                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>

                  <div className="my-1 h-px bg-border" />

                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-500 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Theme toggle always visible */}
          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[260px] p-0 bg-background"
              showCloseButton={false}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <span className="font-semibold">Menu</span>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg hover:bg-muted border border-border"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>

              <div className="flex flex-col p-4 gap-2">
                <SheetClose asChild>
                  <Link className="px-3 py-2 rounded-md hover:bg-muted" to="/">
                    Home
                  </Link>
                </SheetClose>

                <Separator className="my-1 h-px w-full bg-border" />

                <SheetClose asChild>
                  <Link
                    className="px-3 py-2 rounded-md hover:bg-muted"
                    to="/analyze"
                  >
                    Analyze Resume
                  </Link>
                </SheetClose>

                {/* Mobile Auth */}
                <div className="mt-4 border-t pt-4">
                  <AuthBlock mobile />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
