"use client";

import { useEffect, useState } from "react";
import {
  getWarehouses,
  getWarehouseStock,
  getTransfers,
} from "@/services/warehouseService";

export default function useWarehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [stock, setStock] = useState([]);
  const [transfers, setTransfers] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const [warehouseData, stockData, transferData] =
        await Promise.all([
          getWarehouses(),
          getWarehouseStock(),
          getTransfers(),
        ]);

      setWarehouses(warehouseData.data || warehouseData);

      setStock(stockData.data || stockData);

      setTransfers(transferData.data || transferData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    warehouses,
    stock,
    transfers,
    loading,
    refresh: loadData,
  };
}