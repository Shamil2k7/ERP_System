import {
  addEmployeeService,
  fetchAllEmployees,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee,
} from "./employees.service.js";

// Add Employee
const addEmployee = async (req, res) => {
  try {
    const result = await addEmployeeService(req.body);

    return res.status(201).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const result = await fetchAllEmployees();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Employee
const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await fetchEmployeeById(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await modifyEmployee(id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await removeEmployee(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};