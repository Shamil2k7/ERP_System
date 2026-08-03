"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiPhone,
  FiBriefcase,
} from "react-icons/fi";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(formData);

    // TODO:
    // Call your register API here
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>Create Employee Account</h1>

          <p>
            Fill in the employee details below to create a new Retail ERP
            account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.formGroup}>
            <label className={styles.label}>Employee Full Name</label>

            <div className={styles.inputGroup}>
              <FiUser />

              <input
                type="text"
                name="fullName"
                placeholder="Enter employee full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Employee ID</label>

            <div className={styles.inputGroup}>
              <FiBriefcase />

              <input
                type="text"
                name="employeeId"
                placeholder="EMP001"
                value={formData.employeeId}
                onChange={handleChange}
                required
              />
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Work Email</label>

            <div className={styles.inputGroup}>
              <FiMail />

              <input
                type="email"
                name="email"
                placeholder="employee@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Mobile Number</label>

            <div className={styles.inputGroup}>
              <FiPhone />

              <input
                type="tel"
                name="phone"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>User Role</label>

            <div className={styles.inputGroup}>
              <FiBriefcase />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Select User Role</option>
                <option value="Admin">Administrator</option>
                <option value="Manager">Store Manager</option>
                <option value="Cashier">Cashier</option>
                <option value="Accountant">Accountant</option>
                <option value="Warehouse">Warehouse Staff</option>
              </select>
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Create Password</label>

            <div className={styles.inputGroup}>
              <FiLock />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>

            <div className={styles.inputGroup}>
              <FiLock />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className={styles.eye}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>


          <button className={styles.registerBtn} type="submit">
            Register Employee
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an ERP account?{" "}
            <Link href="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}