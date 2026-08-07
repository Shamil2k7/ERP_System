import {
  fetchAllEmployees,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee
} from "./employees.service.js";

const getEmployees = async (req, res) => {
  try {
    const result = await fetchAllEmployees();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchEmployeeById(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ success: false, message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await modifyEmployee(id, req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeEmployee(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export {
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee
};
