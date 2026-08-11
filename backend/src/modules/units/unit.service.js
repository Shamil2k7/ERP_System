import * as unitRepository from "./unit.repository.js";

export const createUnit = async (data) => {
  const existingName = await unitRepository.getUnitByName(data.name);
  if (existingName) {
    throw new Error("Unit name already exists");
  }

  const existingShortName = await unitRepository.getUnitByShortName(data.shortName);
  if (existingShortName) {
    throw new Error("Unit short name already exists");
  }

  return await unitRepository.createUnit(data);
};

export const getAllUnits = async () => {
  return await unitRepository.getAllUnits();
};

export const getUnitById = async (id) => {
  const unit = await unitRepository.getUnitById(id);
  if (!unit) {
    throw new Error("Unit not found");
  }
  return unit;
};

export const updateUnit = async (id, data) => {
  const existingUnit = await unitRepository.getUnitById(id);
  if (!existingUnit) {
    throw new Error("Unit not found");
  }

  if (data.name && data.name !== existingUnit.name) {
    const existingName = await unitRepository.getUnitByName(data.name);
    if (existingName) {
      throw new Error("Unit name already exists");
    }
  }

  if (data.shortName && data.shortName !== existingUnit.shortName) {
    const existingShortName = await unitRepository.getUnitByShortName(data.shortName);
    if (existingShortName) {
      throw new Error("Unit short name already exists");
    }
  }

  return await unitRepository.updateUnit(id, data);
};

export const deleteUnit = async (id) => {
  const existingUnit = await unitRepository.getUnitById(id);
  if (!existingUnit) {
    throw new Error("Unit not found");
  }

  return await unitRepository.deleteUnit(id);
};
