import {
  fetchAllDesignations,
  fetchDesignationById,
  addDesignation,
  modifyDesignation,
  removeDesignation,
} from "./designations.service.js";

// Get all designations
const getDesignations = async (req, res, next) => {
  try {
    const result = await fetchAllDesignations();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Get designation by ID
const getDesignation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await fetchDesignationById(id);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Add designation
const createDesignation = async (req, res, next) => {
  try {
    const result = await addDesignation(req.body, req);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Update designation
const updateDesignation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await modifyDesignation(id, req.body, req);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// Delete designation
const deleteDesignation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeDesignation(id, req);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getDesignations,
  getDesignation,
  createDesignation,
  updateDesignation,
  deleteDesignation,
};
