import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import * as authService from "../services/authService";
import Toaster from "@/components/shared/Toaster";

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  profile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 🔁 restore session
  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await authService.profile();
        setUser(res.data.user);

        Toaster(
          "success",
          "Welcome Back!",
          `Logged in as ${res.data?.user?.name || "User"}`,
        );
      } catch (error: any) {
        localStorage.removeItem("token");
        setUser(null);
        setError(error.message || "Session expired");

        Toaster("error", "Session Expired", "Please login again.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await authService.signup(email, password);

      const { token, user } = res.data;

      //Saving Session
      localStorage.setItem("token", token);
      setUser(user);

      Toaster("success", "Account Created", `Welcome!`);
    } catch (error: any) {
      Toaster(
        "error",
        "Signup Failed",
        error.response?.data?.message || error.message || "Signup failed",
      );
      setError(error.message || "Signup failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await authService.login(email, password);

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setUser(user);

      Toaster(
        "success",
        "Login Successful",
        `Welcome, ${user?.name || "User"}!`,
      );
    } catch (error: any) {
      Toaster(
        "error",
        "Login Failed",
        error.response?.data?.message || error.message || "Login failed",
      );
      setError(error.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      localStorage.removeItem("token");
      setUser(null);

      Toaster("success", "Logged Out", "You have been logged out.");
    } catch (error: any) {
      Toaster(
        "error",
        "Logout Failed",
        error.response?.data?.message || error.message || "Logout failed",
      );
      setError(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await authService.profile();
      setUser(res.data.user);
    } catch (error: any) {
      Toaster(
        "error",
        "Profile Fetch Failed",
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch profile",
      );
      setError(error.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      const res = await authService.updateProfile(data);
      setUser(res.data.user);

      Toaster("success", "Profile Updated", "Changes saved.");
    } catch (error: any) {
      Toaster(
        "error",
        "Update Failed",
        error.response?.data?.message || error.message || "Update failed",
      );
      setError(error.message || "Update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    try {
      await authService.updatePassword(currentPassword, newPassword);

      Toaster("success", "Password Updated", "Your password was changed.");
    } catch (error: any) {
      Toaster(
        "error",
        "Update Failed",
        error.response?.data?.message ||
          error.message ||
          "Password update failed",
      );
      setError(error.message || "Password update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        error,
        setLoading,
        login,
        signup,
        logout,
        profile: getProfile,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
