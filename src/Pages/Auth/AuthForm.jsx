import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Icons for password visibility toggle
import styles from "./Auth.module.css";
import { auth } from "../../components/Context/Firebase"; // Firebase Auth

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign-Up and Sign-In
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [loading, setLoading] = useState(false); // Show loading spinner during submission
  const navigate = useNavigate();
  const location = useLocation(); // Get location state (for redirect after login)

  // Extract the "from" URL (where the user was trying to go) and the custom message
  const from = location.state?.from?.pathname || "/";
  const message = location.state?.message;

  useEffect(() => {
    // Display the message passed from ProtectedRoute (if any)
    if (message) {
      toast.info(message);
    }
  }, [message]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Create new account
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      } else {
        // Sign in with existing account
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!");
      }

      // Redirect to the page the user was trying to access, or home if none
      navigate(from);
    } catch (error) {
      if (isSignUp && error.code === "auth/email-already-in-use") {
        toast.error("Email already exists.");
      } else if (!isSignUp && error.code === "auth/wrong-password") {
        toast.error("Invalid email or password.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("No account found with this email.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <ToastContainer />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        alt="Amazon Logo"
        className={styles.amazonLogo}
      />

      <form onSubmit={handleFormSubmit} className={styles.authForm}>
        <h1>{isSignUp ? "Create Account" : "Sign-In"}</h1>

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />

        <label>Password</label>
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.inputField}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <button type="submit" className={styles.authButton} disabled={loading}>
          {loading ? (
            <ClipLoader size={20} color="#fff" />
          ) : isSignUp ? (
            "Create Account"
          ) : (
            "Sign-In"
          )}
        </button>

        {/* Forgot Password for Sign-In */}
        {!isSignUp && (
          <p className={styles.forgotPassword} onClick={sendPasswordResetEmail}>
            Forgot password?
          </p>
        )}

        <div className={styles.authSwitch}>
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsSignUp(false)}>Sign-In</span>
            </p>
          ) : (
            <p>
              New to Amazon?{" "}
              <span onClick={() => setIsSignUp(true)}>Create an account</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default AuthForm;
