"use client";

import { useEffect, useState } from "react";
import { getSalesOrders } from "@/services/salesService";

export default function useSales() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSales = async () => {
    try {
      setLoading(true);

      const response = await getSalesOrders();

      setSales(response.data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  return {
    sales,
    loading,
    error,
    refresh: loadSales,
  };
}