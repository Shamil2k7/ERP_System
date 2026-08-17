import {
  fetchAllManagers,
  fetchManagerById,
  addManager,
  removeManager,
} from "./managers.service.js";

// GET /api/managers
export const getManagers = async (req, res) => {
  try {
    const result = await fetchAllManagers();
    return res.status(200).json(result);
  } catch (error) {
    console.error("getManagers error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/managers/:id
export const getManager = async (req, res) => {
  try {
    const result = await fetchManagerById(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    console.error("getManager error:", error);
    const status = error.message === "Manager not found" ? 404 : 500;
    return res.status(status).json({ success: false, message: error.message });
  }
};

// POST /api/managers
export const createManager = async (req, res) => {
  try {
    const result = await addManager(req.body, req);
    return res.status(201).json(result);
  } catch (error) {
    console.error("createManager error:", error);
    const status =
      error.message.includes("already exists") || error.message.includes("required")
        ? 400
        : 500;
    return res.status(status).json({ success: false, message: error.message });
  }
};

// DELETE /api/managers/:id
export const deleteManagerById = async (req, res) => {
  try {
    const result = await removeManager(req.params.id, req);
    return res.status(200).json(result);
  } catch (error) {
    console.error("deleteManagerById error:", error);
    const status = error.message === "Manager not found" ? 404 : 500;
    return res.status(status).json({ success: false, message: error.message });
  }
};
