import axios from "axios";
import API_URL from "@/config/api";

const branchAPI = axios.create({
  baseURL: `${API_URL}/branches`,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET /api/branches
export const getBranches = async () => {
  const response = await branchAPI.get("/");
  return response.data;
};

// GET /api/branches/:id
export const getBranchById = async (id) => {
  const response = await branchAPI.get(`/${id}`);
  return response.data;
};

// POST /api/branches
export const createBranch = async (data) => {
  const response = await branchAPI.post("/", data);
  return response.data;
};

// PUT /api/branches/:id
export const updateBranch = async (id, data) => {
  const response = await branchAPI.put(`/${id}`, data);
  return response.data;
};

// DELETE /api/branches/:id
export const deleteBranch = async (id) => {
  const response = await branchAPI.delete(`/${id}`);
  return response.data;
};
