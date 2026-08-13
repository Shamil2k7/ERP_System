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

      const [salesRes, customersRes] = await Promise.all([
        getSalesOrders(),
        fetch("http://localhost:5000/api/customers").then((res) => res.json()).catch(() => ({ data: [] }))
      ]);

      const rawSales = salesRes.data || [];
      const customers = customersRes.data || [];

      const customerMap = {};
      customers.forEach((c) => {
        customerMap[c.id] = c.name;
      });

      const mapped = rawSales.map((sale) => ({
        id: sale.id,
        invoiceNo: sale.orderNumber,
        customer: customerMap[sale.customerId] || "Walk-in Customer",
        cashier: sale.cashier || "Admin",
        date: sale.orderDate ? new Date(sale.orderDate).toISOString().split("T")[0] : "",
        paymentMethod: sale.paymentMethod || "Cash",
        paymentStatus: sale.status === "CONFIRMED" || sale.status === "COMPLETED" ? "Paid" : "Pending",
        total: Number(sale.netAmount) || 0
      }));

      setSales(mapped);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      await Promise.resolve();
      if (mounted) {
        loadSales();
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    sales,
    loading,
    error,
    refresh: loadSales,
  };
}