import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render the protected page
  return children;
};

export default ProtectedRoute;
