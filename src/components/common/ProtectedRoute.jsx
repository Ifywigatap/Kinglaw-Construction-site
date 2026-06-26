import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // If the auth context is not available, or the user is not authenticated,
  // redirect to the login page. This makes the component more robust.
  if (!auth?.isAuthenticated) {
    // Redirect to the login page, saving the current location they were trying to access.
    // This allows you to redirect them back after a successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;