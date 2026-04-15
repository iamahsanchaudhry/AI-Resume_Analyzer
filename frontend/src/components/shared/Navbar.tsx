import { ModeToggle } from "../mode-toggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Logo */}
      <Link to="/">
      <h1 className="text-lg font-semibold tracking-tight text-primary">
        AI Resume
        <span className="text-[#534AB7]">Analyzer</span>
      </h1>
      </Link>
      

      {/* Links */}
      {/* <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <button className="hover:text-foreground transition">
          How it works
        </button>
        <button className="hover:text-foreground transition">
          Pricing
        </button>
      </div> */}

      {/* Auth */}
      <div className="flex items-center gap-3">
        <ModeToggle />
        {/* <Button variant="outline">Sign in</Button> */}
      </div>

    </nav>
  );
}