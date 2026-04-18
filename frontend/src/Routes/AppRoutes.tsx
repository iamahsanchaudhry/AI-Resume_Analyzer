import { Footer } from "@/components/shared/Footer";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { Navbar } from "@/components/shared/Navbar";
import { useAuth } from "@/context/AuthContext";
import LandingPage from "@/pages/LandingPage";
import ResumeAnalyzerPage from "@/pages/ResumeAnalyzerPage";
import LoginPage from "@/pages/UserPages/LoginPage";
import SignupPage from "@/pages/UserPages/SignupPage";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-pulse text-sm">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<ResumeAnalyzerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <Footer />
    </>
  );
}
