import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<ResumeAnalyzerPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;