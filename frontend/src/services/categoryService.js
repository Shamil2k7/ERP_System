import axios from "axios";
import API_URL from "@/config/api";

const categoryAPI = axios.create({
  baseURL: `${API_URL}/categories`,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET /api/categories
export const getCategories = async () => {
  const response = await categoryAPI.get("/");
  return response.data;
};
