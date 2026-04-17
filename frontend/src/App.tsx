import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import { Footer } from "./components/shared/Footer";
import { Navbar } from "./components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/UserPages/LoginPage";
import SignupPage from "./pages/UserPages/SignupPage";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyze" element={<ResumeAnalyzerPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
