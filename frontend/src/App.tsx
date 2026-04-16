import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import { Footer } from "./components/shared/Footer";
import { Navbar } from "./components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner"
function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<ResumeAnalyzerPage />}></Route>
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;