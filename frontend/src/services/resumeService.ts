import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const API = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 15000, // 15s — sane ceiling so hung requests fail instead of spinning forever
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token if available, otherwise skip
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const resumeService = {
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);

    const { data } = await axios.post(`${API}/resumes/upload`, formData, {
      headers: {
        ...authHeaders(),
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
    const { data } = await axios.post(
      `${API}/match-resume`,
      { resumeId, jobDescription, resumeSkills, guestId },
      {
        headers: {
          ...authHeaders(),
        },
      },
    );

    return data;
  },
};

export default resumeService;
