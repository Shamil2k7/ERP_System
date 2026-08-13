import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const API_URL = `${API_BASE}/api/suppliers`;

export const getSuppliers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getSupplierById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const searchSuppliers = async (query) => {
  const response = await axios.get(`${API_URL}/search?search=${encodeURIComponent(query)}`);
  return response.data;
};

export const createSupplier = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateSupplier = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteSupplier = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
