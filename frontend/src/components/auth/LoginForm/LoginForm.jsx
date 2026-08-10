"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiEye, FiEyeOff, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    remember: false,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("verified") === "true") {
        setSuccessMessage("Your email account has been verified successfully! You can now log in.");
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);

      alert("Login Successful!");

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Welcome Back</h1>

          <p>Sign in to your Retail ERP account.</p>
        </div>

        {successMessage && (
          <div style={{
            padding: "12px 16px",
            backgroundColor: "#dcfce7",
            color: "#15803d",
            border: "1px solid #bbf7d0",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FiCheckCircle style={{ flexShrink: 0, fontSize: "18px" }} />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Employee ID / Email
            </label>

            <div className={styles.inputGroup}>
              {formData.login.includes("@") ? (
                <FiMail />
              ) : (
                <FiBriefcase />
              )}

              <input
                type="text"
                name="login"
                placeholder="EMP001 or employee@company.com"
                value={formData.login}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Password
            </label>

            <div className={styles.inputGroup}>
              <FiLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eye}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>
            </div>
          </div>

          <div className={styles.options}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>

            <Link href="/auth/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className={styles.loginBtn}
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <Link href="/auth/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}