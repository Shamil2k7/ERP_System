import axios from "axios";
import API_URL from "@/config/api";

const productAPI = axios.create({
  baseURL: `${API_URL}/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET /api/products
export const getProducts = async () => {
  const response = await productAPI.get("/");
  return response.data;
};
