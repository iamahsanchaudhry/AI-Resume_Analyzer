import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const resumeService = {
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    const { data } = await API.post("/resumes/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      resumeId: data?.resumeId,
      skills: data?.skills || [],
    };
  },

  analyzeResume: async (
    resumeId: string,
    jobDescription: string,
    resumeSkills: string[],
    guestId: string,
  ) => {
    const { data } = await API.post("/match-resume", {
      resumeId,
      jobDescription,
      resumeSkills,
      guestId,
    });

    return data;
  },
};

export default resumeService;
