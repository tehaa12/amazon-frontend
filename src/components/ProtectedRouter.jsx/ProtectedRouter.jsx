import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const location = useLocation(); // Get current location

  if (!user) {
    // If the user is not logged in, redirect to the /auth page and pass the requested URL
    return (
      <Navigate
        to="/auth"
        state={{
          from: location, // Pass the current page URL so we can redirect back after login
          message: "You must log in to access this page.", // Pass a custom message
        }}
        replace
      />
    );
  }

  // If the user is logged in, render the child components (protected page)
  return children;
};

export default ProtectedRoute;
