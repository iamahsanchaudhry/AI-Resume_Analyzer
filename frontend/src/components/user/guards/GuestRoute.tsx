import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export default function GuestRoute({ children }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    // Already logged in — bounce back to where they came from, or home
    const from = (location.state as { from?: Location })?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
