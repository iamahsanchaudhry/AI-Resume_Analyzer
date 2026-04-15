import axios from "axios";

const API = "http://localhost:5000/api";

const resumeService = {
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    
    const { data } = await axios.post(
      `${API}/resumes/upload`,
      formData
    );

    return {
      resumeId: data?.resume?._id,
    };
  },

  analyzeResume: async (resumeId: string, jobDescription: string) => {
    const { data } = await axios.post(`${API}/match-resume`, {
      resumeId,
      jobDescription,
    });

    return data;
  },
};

export default resumeService;