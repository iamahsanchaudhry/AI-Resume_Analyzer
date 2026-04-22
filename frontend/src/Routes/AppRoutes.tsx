import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import LandingPage from "@/pages/LandingPage";
import ResumeAnalyzerPage from "@/pages/ResumeAnalyzerPage";
import LoginPage from "@/pages/UserPages/LoginPage";
import SignupPage from "@/pages/UserPages/SignupPage";
import { Routes, Route } from "react-router-dom";

export default function AppRoutes() {
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
