import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";

export function Navbar() {
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

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[260px] p-0 bg-background" showCloseButton={false}>
              {/* Custom header */}
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
