"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, User, Loader2 } from "lucide-react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import styles from "./addEmployees.module.css";
import { getRoles } from "@/services/roleService";

export default function AddEmployeePage() {
  const router = useRouter();

  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    employeeId: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      if (res.success && Array.isArray(res.data)) {
        setRoles(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch roles:", err);
    }
  };


  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    router.push("/admin/employees/view");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(
        "http://localhost:5000/api/employees",
        formData,
        { headers }
      );

      console.log("Employee created:", response.data);

      toast.success("Employee added successfully");

      setTimeout(() => {
        router.push("/admin/employees/view");
      }, 800);
    } catch (error) {
      console.error("Add employee error:", error);

      toast.error(
        error.response?.data?.message || "Failed to add employee"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const initials = formData.fullName.trim()
    ? formData.fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("")
    : "";

  return (
    <div className={styles.layout}>
      <Toaster position="top-right" />

      <div className={styles.container}>
        <div className={styles.content}>

          <form onSubmit={handleSubmit}>

            {/* Top Bar */}
            <div className={styles.topBar}>
              <div>
                <div className={styles.breadcrumb}>

                  <span
                    className={styles.breadcrumbLink}
                    onClick={handleCancel}
                  >
                    Employees
                  </span>

                  <ChevronRight size={14} />

                  <span>Add New</span>

                </div>

                <h1 className={styles.title}>
                  Add Employee
                </h1>
              </div>

              <div className={styles.topActions}>

                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={submitting}
                >

                  {submitting && (
                    <Loader2
                      className={styles.spinnerIcon}
                      size={16}
                    />
                  )}

                  {submitting
                    ? "Saving..."
                    : "Save Employee"}

                </button>

              </div>
            </div>


            {/* Main Grid */}
            <div className={styles.grid}>

              {/* Employee Form */}
              <div className={styles.mainColumn}>

                <div className={styles.card}>

                  <h2 className={styles.cardTitle}>
                    Employee Information
                  </h2>


                  {/* Full Name + Employee ID */}
                  <div className={styles.formRow}>

                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Full Name{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="John Doe"
                      />

                    </div>


                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Employee ID{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="EMP-001"
                      />

                    </div>

                  </div>


                  {/* Email + Phone */}
                  <div className={styles.formRow}>

                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Email{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="john@example.com"
                      />

                    </div>


                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Phone Number{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="9876543210"
                      />

                    </div>

                  </div>


                  {/* Role + Password */}
                  <div className={styles.formRow}>

                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Role{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                      >
                        <option value="">Select Role</option>
                        {roles.length > 0 ? (
                          roles.map((r) => (
                            <option key={r.id} value={r.name}>
                              {r.name}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                            <option value="HR">HR</option>
                          </>
                        )}
                      </select>


                    </div>


                    <div className={styles.formGroup}>

                      <label className={styles.label}>
                        Password{" "}
                        <span className={styles.required}>
                          *
                        </span>
                      </label>

                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="Enter temporary password"
                      />

                    </div>

                  </div>

                </div>

              </div>


              {/* Preview */}
              <div className={styles.sideColumn}>

                <div className={styles.card}>

                  <h2 className={styles.cardTitle}>
                    Preview
                  </h2>

                  <div className={styles.previewBody}>

                    <div className={styles.avatar}>

                      {initials ? (
                        initials
                      ) : (
                        <User size={28} />
                      )}

                    </div>


                    <div className={styles.previewName}>
                      {formData.fullName || "New Employee"}
                    </div>


                    <div className={styles.previewRole}>
                      {formData.role || "Role not set"}
                    </div>


                    {formData.employeeId && (
                      <span
                        className={styles.previewIdBadge}
                      >
                        {formData.employeeId}
                      </span>
                    )}

                  </div>


                  <p className={styles.previewHint}>
                    This is how the employee will appear
                    in your team list once saved.
                  </p>

                </div>

              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}