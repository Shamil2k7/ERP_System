"use client";

import { useEffect, useState } from "react";
import { getSuppliers } from "@/services/supplierService";

export default function SupplierSelect({ value, onChange }) {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSuppliers() {
      try {
        setLoading(true);
        const res = await getSuppliers();
        if (res?.data) {
          setSuppliers(res.data);
        } else if (Array.isArray(res)) {
          setSuppliers(res);
        }
      } catch (err) {
        console.error("Failed to fetch suppliers in SupplierSelect:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSuppliers();
  }, []);

  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-3"
      disabled={loading}
    >
      <option value="">
        {loading ? "Loading suppliers..." : "Select Supplier"}
      </option>

      {suppliers.map((supplier) => {
        const name = supplier.companyName || supplier.name;
        return (
          <option key={supplier.id} value={name}>
            {name}
          </option>
        );
      })}
    </select>
  );
}