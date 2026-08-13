"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SalesCard from "../components/SalesCard";
import { getSalesOrderById } from "@/services/salesService";

export default function SaleDetailsPage() {
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSale() {
      try {
        setLoading(true);
        const res = await getSalesOrderById(id);
        const data = res.data || res;

        // Resolve customer name
        let customerName = "Walk-in Customer";
        if (data.customerId) {
          try {
            const custRes = await fetch(`http://localhost:5000/api/customers/${data.customerId}`).then((r) => r.json());
            if (custRes?.data?.name) {
              customerName = custRes.data.name;
            }
          } catch (e) {
            console.error("Failed to fetch customer", e);
          }
        }

        setSale({
          id: data.id,
          invoiceNo: data.orderNumber,
          customer: customerName,
          cashier: data.cashier || "Admin",
          date: data.orderDate ? new Date(data.orderDate).toISOString().split("T")[0] : "",
          paymentMethod: data.paymentMethod || "Cash",
          paymentStatus: data.status === "CONFIRMED" || data.status === "COMPLETED" ? "Paid" : "Pending",
          subTotal: Number(data.totalAmount) || 0,
          discount: Number(data.discountAmount) || 0,
          tax: Number(data.taxAmount) || 0,
          total: Number(data.netAmount) || 0,
          items: data.items || []
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadSale();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">Loading Sale Details...</h2>
      </div>
    );
  }

  if (error || !sale) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold text-red-600">Error loading sale: {error}</h2>
        <a href="/sales" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Back to Sales</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Sale Details</h1>
      <SalesCard sale={sale} />
    </div>
  );
}