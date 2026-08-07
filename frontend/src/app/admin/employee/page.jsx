"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2, X, Users, Loader2, Plus } from 'lucide-react';
import styles from './employee.module.css';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import Sidebar from '@/components/adminPanel/Sidebar/Sidebar';
import Header from '@/components/adminPanel/Header/Header';

export default function EmployeePage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    employeeId: '',
    role: '',
    password: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch employees');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClick = () => {
    router.push('/admin/employee/add');
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setFormData({
      fullName: employee.fullName || '',
      email: employee.email || '',
      phone: employee.phone || '',
      employeeId: employee.employeeId || '',
      role: employee.role?.name || 'Admin',
      password: '' // Don't populate password for edit
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      toast.success('Employee deleted successfully');
      fetchEmployees();
    } catch (error) {
      toast.error('Failed to delete employee');
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password;
      await axios.put(`http://localhost:5000/api/employees/${currentEmployee.id}`, updateData);
      toast.success('Employee updated successfully');
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

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

        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Employees</h1>
            <p className={styles.subtitle}>Manage your team members and their access.</p>
          </div>
          <button className={styles.addButton} onClick={handleAddClick}>
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        <div className={styles.tableContainer}>
          {loading ? (
            <div className={styles.emptyState}>
              <Loader2 className={styles.spinner} size={40} />
              <p>Loading employees...</p>
            </div>
          ) : employees.length === 0 ? (
            <div className={styles.emptyState}>
              <Users className={styles.emptyIcon} />
              <h3>No employees found</h3>
              <p>Get started by adding a new employee.</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Employee ID</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Contact</th>
                  <th className={styles.th}>Status</th>
                  <th className={`${styles.th} ${styles.thRight}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(employee => (
                  <tr key={employee.id} className={styles.tr}>
                    <td className={styles.td}>
                      <span className={styles.employeeIdBadge}>{employee.employeeId || 'N/A'}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.employeeName}>{employee.fullName || 'Unknown'}</div>
                      <div className={styles.employeeRole}>{employee.role?.name || 'Role Not Assigned'}</div>
                    </td>
                    <td className={styles.td}>
                      <div>{employee.email}</div>
                      <div className={styles.phone}>{employee.phone}</div>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${employee.isVerified ? styles.badgeActive : styles.badgeInactive}`}>
                        {employee.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <div className={`${styles.actions} ${styles.actionsRight}`}>
                        <button className={`${styles.iconButton} ${styles.edit}`} onClick={() => handleEditClick(employee)} title="Edit Employee">
                          <Edit2 size={18} />
                        </button>
                        <button className={`${styles.iconButton} ${styles.delete}`} onClick={() => handleDelete(employee.id)} title="Delete Employee">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Edit Employee</h2>
                <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
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
                  <label className={styles.label}>Employee ID</label>
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

                <div className={styles.formGroup}>
                  <label className={styles.label}>Role (e.g., Admin, User)</label>
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
                  <label className={styles.label}>Email</label>
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
                  <label className={styles.label}>Phone Number</label>
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

                <div className={styles.formGroup}>
                  <label className={styles.label}>New Password (leave blank to keep current)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter new password"
                  />
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton} disabled={submitting}>
                    {submitting ? 'Saving...' : 'Save Employee'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}