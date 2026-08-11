import * as unitService from "./unit.service.js";

export const createUnit = async (req, res) => {
  try {
    const unit = await unitService.createUnit(req.body);
    return res.status(201).json({
      success: true,
      message: "Unit created successfully",
      data: unit,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUnits = async (req, res) => {
  try {
    const units = await unitService.getAllUnits();
    return res.status(200).json({
      success: true,
      message: "Units fetched successfully",
      count: units.length,
      data: units,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await unitService.getUnitById(id);
    return res.status(200).json({
      success: true,
      message: "Unit fetched successfully",
      data: unit,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await unitService.updateUnit(id, req.body);
    return res.status(200).json({
      success: true,
      message: "Unit updated successfully",
      data: unit,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    await unitService.deleteUnit(id);
    return res.status(200).json({
      success: true,
      message: "Unit deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
