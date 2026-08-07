import e from "express";
import * as warehouseRepository from "./warehouse.repository.js";


export const createWarehouse = async (data) => {
  const existingWarehouse = await warehouseRepository.getWarehouseByCode(
    data.code
  );

  if (existingWarehouse) {
    throw new Error("Warehouse code already exists.");
  }

  return await warehouseRepository.createWarehouse(data);
};

export const getAllWarehouses = async () => {
  return await warehouseRepository.getAllWarehouses();
};

export const getWarehouseById = async (id) => {
  const warehouse = await warehouseRepository.getWarehouseById(id);

  if (!warehouse) {
    throw new Error("Warehouse not found.");
  }

  return warehouse;
};

export const searchWarehouses = async (search) => {
  return await warehouseRepository.searchWarehouses(search);
};

export const updateWarehouse = async (id, data) => {
  const warehouse = await warehouseRepository.getWarehouseById(id);

  if (!warehouse) {
    throw new Error("Warehouse not found.");
  }

  if (data.code && data.code !== warehouse.code) {
    const existingWarehouse = await warehouseRepository.getWarehouseByCode(
      data.code
    );

    if (existingWarehouse) {
      throw new Error("Warehouse code already exists.");
    }
  }

  return await warehouseRepository.updateWarehouse(id, data);
};

export const deleteWarehouse = async (id) => {
  const warehouse = await warehouseRepository.getWarehouseById(id);

  if (!warehouse) {
    throw new Error("Warehouse not found.");
  }

  return await warehouseRepository.deleteWarehouse(id);
};
