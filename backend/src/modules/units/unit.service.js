import * as unitRepository from "./unit.repository.js";

export const createUnit = async (data) => {
  const existingUnit = await unitRepository.getUnitByCode(
    data.code
  );

  if (existingUnit) {
    throw new Error("Unit code already exists.");
  }

  return await unitRepository.createUnit(data);
};

export const getAllUnits = async () => {
  return await unitRepository.getAllUnits();
};

export const getUnitById = async (id) => {
  const unit = await unitRepository.getUnitById(id);

  if (!unit) {
    throw new Error("Unit not found.");
  }

  return unit;
};

export const updateUnit = async (id, data) => {
  const unit = await unitRepository.getUnitById(id);

  if (!unit) {
    throw new Error("Unit not found.");
  }

  if (data.code && data.code !== unit.code) {
    const existingUnit = await unitRepository.getUnitByCode(
      data.code
    );

    if (existingUnit) {
      throw new Error("Unit code already exists.");
    }
  }

  return await unitRepository.updateUnit(id, data);
};

export const deleteUnit = async (id) => {
  const unit = await unitRepository.getUnitById(id);

  if (!unit) {
    throw new Error("Unit not found.");
  }

  return await unitRepository.deleteUnit(id);
};