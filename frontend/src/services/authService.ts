import axios from "axios";

export const login = async (email: string, password: string) => {
  const response = await axios("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ email, password }),
  });

  if (!response) {
    throw new Error("Login failed");
  }

  return response.data.json();
};

export const signup = async (email: string, password: string) => {
  const response = await axios("http://localhost:5000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ email, password }),
  });

  if (!response) {
    throw new Error("Signup failed");
  }

  return response.data.json();
};
