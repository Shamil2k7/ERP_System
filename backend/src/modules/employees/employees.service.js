import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} from "./employees.repository.js";

const fetchAllEmployees = async () => {
  const employees = await getAllEmployees();
  return {
    success: true,
    data: employees
  };
};

const fetchEmployeeById = async (id) => {
  const employee = await getEmployeeById(id);
  if (!employee) {
    throw new Error("Employee not found");
  }
  return {
    success: true,
    data: employee
  };
};

const modifyEmployee = async (id, updateData) => {
  const existingEmployee = await getEmployeeById(id);
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  
  const updatedEmployee = await updateEmployee(id, updateData);
  return {
    success: true,
    message: "Employee updated successfully",
    data: updatedEmployee
  };
};

const removeEmployee = async (id) => {
  const existingEmployee = await getEmployeeById(id);
  if (!existingEmployee) {
    throw new Error("Employee not found");
  }
  
  await deleteEmployee(id);
  return {
    success: true,
    message: "Employee deleted successfully"
  };
};

export {
  fetchAllEmployees,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee
};
