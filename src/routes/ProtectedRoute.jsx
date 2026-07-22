import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();

  if (isLoading) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
