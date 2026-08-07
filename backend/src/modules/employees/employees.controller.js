import {
  addEmployeeService,
  verifyEmailService,
} from "./employee.service.js";

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

// Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    const result = await verifyEmailService(token);

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
  verifyEmail,
};