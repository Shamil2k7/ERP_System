import {
  getAllDesignations,
  getDesignationById,
  getDesignationByName,
  getDesignationByCode,
  createDesignation,
  updateDesignation,
  deleteDesignation,
} from "./designations.repository.js";
import { getDepartmentById, getDepartmentByName } from "../departments/department.repository.js";
import { recordAuditLog } from "../audit/audit.service.js";

/**
 * Get all designations
 */
export const fetchAllDesignations = async () => {
  const designations = await getAllDesignations();
  return {
    success: true,
    data: designations,
  };
};

/**
 * Get designation by ID
 */
export const fetchDesignationById = async (id) => {
  const designation = await getDesignationById(id);
  
  if (!designation) {
    throw new Error("Designation not found");
  }
  
  return {
    success: true,
    data: designation,
  };
};

/**
 * Add a new designation
 */
export const addDesignation = async (designationData, req) => {
  const { name, department, status } = designationData;
  
  if (!name || !department) {
    throw new Error("Designation name and department are required");
  }

  // Find department by name, since the frontend currently passes the department name
  const existingDepartment = await getDepartmentByName(department);
  if (!existingDepartment) {
    throw new Error("Department not found");
  }

  // Check if designation name exists
  const existingName = await getDesignationByName(name);
  if (existingName) {
    throw new Error("Designation name already exists");
  }

  // Generate code e.g., DSG001
  const allDesignations = await getAllDesignations();
  const nextId = allDesignations.length + 1;
  const code = `#DSG${String(nextId).padStart(3, "0")}`;

  const newDesignation = await createDesignation({
    name: name.trim(),
    code,
    departmentId: existingDepartment.id,
    employees: 0,
    status: status || "ACTIVE",
  });

  // Audit Log
  await recordAuditLog(req, {
    action: "CREATE",
    entity: "Designation",
    entityId: newDesignation.id,
    details: { name: newDesignation.name, code: newDesignation.code, department: existingDepartment.name },
  });

  return {
    success: true,
    message: "Designation created successfully",
    data: newDesignation,
  };
};

/**
 * Update designation
 */
export const modifyDesignation = async (id, updateData, req) => {
  const existingDesignation = await getDesignationById(id);
  
  if (!existingDesignation) {
    throw new Error("Designation not found");
  }
  
  const safeData = {};
  
  if (updateData.name && updateData.name !== existingDesignation.name) {
    const existingName = await getDesignationByName(updateData.name);
    if (existingName) {
      throw new Error("Designation name already exists");
    }
    safeData.name = updateData.name.trim();
  }
  
  if (updateData.department) {
    const existingDepartment = await getDepartmentByName(updateData.department);
    if (!existingDepartment) {
      throw new Error("Department not found");
    }
    safeData.departmentId = existingDepartment.id;
  }
  
  if (updateData.status) {
    safeData.status = updateData.status;
  }
  
  if (Object.keys(safeData).length === 0) {
    throw new Error("No valid fields provided for update");
  }
  
  const updatedDesignation = await updateDesignation(id, safeData);
  
  // Audit Log
  await recordAuditLog(req, {
    action: "UPDATE",
    entity: "Designation",
    entityId: id,
    details: { updatedFields: Object.keys(safeData) },
  });
  
  return {
    success: true,
    message: "Designation updated successfully",
    data: updatedDesignation,
  };
};

/**
 * Delete designation
 */
export const removeDesignation = async (id, req) => {
  const existingDesignation = await getDesignationById(id);
  
  if (!existingDesignation) {
    throw new Error("Designation not found");
  }
  
  if (existingDesignation.employees > 0) {
    throw new Error("Cannot delete designation with assigned employees");
  }
  
  await deleteDesignation(id);
  
  // Audit Log
  await recordAuditLog(req, {
    action: "DELETE",
    entity: "Designation",
    entityId: id,
    details: { name: existingDesignation.name },
  });
  
  return {
    success: true,
    message: "Designation deleted successfully",
  };
};
