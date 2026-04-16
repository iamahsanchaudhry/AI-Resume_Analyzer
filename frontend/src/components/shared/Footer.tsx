import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="bg-background border-t mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-3">
        
        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold tracking-tight">
            ATS Resume Analyzer
          </h2>
          <p className="text-sm text-muted-foreground">
            Improve your resume with AI-powered insights and pass ATS filters easily.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="hover:text-foreground transition">
                Analyze
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-foreground transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-foreground transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Connect</h3>
          <div className="flex gap-3">
            <Button variant="outline" size="icon">
              <FaTwitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaLinkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FaGithub className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="text-center text-xs text-muted-foreground py-4">
        © {new Date().getFullYear()} ATS Resume Analyzer. All rights reserved.
      </div>
    </footer>
  )
}