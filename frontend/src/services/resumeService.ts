import axios from "axios";

const API = "http://localhost:5000/api";

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
  ) => {
    const { data } = await axios.post(
      `${API}/match-resume`,
      { resumeId, jobDescription, resumeSkills },
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
