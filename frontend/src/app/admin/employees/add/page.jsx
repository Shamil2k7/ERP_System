"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, User, Loader2 } from 'lucide-react';
import styles from './addEmployee.module.css';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '@/components/adminPanel/Sidebar/Sidebar';
import Header from '@/components/adminPanel/Header/Header';

export default function AddEmployeePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    role: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    router.push('/admin/employees');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees",
        formData
      );

      toast.success(res.data?.message || "Employee added successfully! Waiting for confirmation.");

      router.push("/admin/employees");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Operation failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const initials = formData.fullName.trim()
    ? formData.fullName.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('')
    : '';

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} />

      {sidebarOpen && (
        <div className={styles.backdrop} onClick={toggleSidebar} />
      )}

      <div className={styles.container}>
        <Header toggleSidebar={toggleSidebar} />

        <div className={styles.content}>
          <Toaster position="top-right" />

          <form onSubmit={handleSubmit}>
            <div className={styles.topBar}>
              <div>
                <div className={styles.breadcrumb}>
                  <span className={styles.breadcrumbLink} onClick={handleCancel}>Employees</span>
                  <ChevronRight size={14} />
                  <span>Add New</span>
                </div>
                <h1 className={styles.title}>Add Employee</h1>
              </div>
              <div className={styles.topActions}>
                <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitButton} disabled={submitting}>
                  {submitting && <Loader2 className={styles.spinnerIcon} size={16} />}
                  {submitting ? 'Saving...' : 'Save Employee'}
                </button>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.mainColumn}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Employee Information</h2>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name <span className={styles.required}>*</span></label>
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
                      <label className={styles.label}>Employee ID <span className={styles.required}>*</span></label>
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

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Email <span className={styles.required}>*</span></label>
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
                      <label className={styles.label}>Phone Number <span className={styles.required}>*</span></label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Role <span className={styles.required}>*</span></label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="Admin"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Password <span className={styles.required}>*</span></label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                        placeholder="Enter password"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.sideColumn}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Preview</h2>
                  <div className={styles.previewBody}>
                    <div className={styles.avatar}>
                      {initials ? initials : <User size={28} />}
                    </div>
                    <div className={styles.previewName}>
                      {formData.fullName || 'New Employee'}
                    </div>
                    <div className={styles.previewRole}>
                      {formData.role || 'Role not set'}
                    </div>
                    {formData.employeeId && (
                      <span className={styles.previewIdBadge}>{formData.employeeId}</span>
                    )}
                  </div>
                  <p className={styles.previewHint}>
                    This is how the employee will appear in your team list once saved.
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