import bcrypt from "bcrypt";
import { recordAuditLog } from "../audit/audit.service.js";
import { sendManagerCredentialsEmail } from "../../config/mail.js";
import {
  getAllManagers,
  getManagerById,
  findManagerByEmail,
  findManagerByPhone,
  findManagerByEmployeeId,
  findOrCreateRole,
  createManager,
  deleteManager,
} from "./managers.repository.js";

// Remove sensitive fields
const removeSensitiveFields = (user) => {
  if (!user) return user;
  const { passwordHash, plainPassword, verificationToken, verificationExpires, ...safe } = user;
  return safe;
};

// ─── Get all managers ────────────────────────────────────────────────────────

const fetchAllManagers = async () => {
  const managers = await getAllManagers();
  return {
    success: true,
    data: managers.map(removeSensitiveFields),
  };
};

// ─── Get manager by ID ───────────────────────────────────────────────────────

const fetchManagerById = async (id) => {
  const manager = await getManagerById(id);
  if (!manager) throw new Error("Manager not found");
  return { success: true, data: removeSensitiveFields(manager) };
};

// ─── Create a manager ────────────────────────────────────────────────────────

const addManager = async (
  { fullName, email, phone, branchId, password, employeeId, role: inputRole },
  req
) => {
  if (!fullName || !email || !phone || !branchId || !password) {
    throw new Error("All manager fields are required");
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim();
  const cleanName = fullName.trim();

  // Auto-generate employeeId if not provided
  const managerId = employeeId?.trim() || `MGR-${Math.floor(1000 + Math.random() * 9000)}`;

  // Check duplicates
  if (await findManagerByEmail(cleanEmail)) throw new Error("Email already exists");
  if (await findManagerByPhone(cleanPhone)) throw new Error("Phone number already exists");
  if (employeeId?.trim() && await findManagerByEmployeeId(managerId)) {
    throw new Error("Employee ID already exists");
  }

  // Resolve or create the "Manager" role
  const roleName = inputRole?.trim() || "Manager";
  const role = await findOrCreateRole(roleName);

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create manager in Manager table
  const manager = await createManager({
    fullName: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    employeeId: managerId,
    passwordHash,
    plainPassword: password,
    role: role.name,
    roleId: role.id,
    branchId,
  });

  // Send welcome credentials email
  try {
    await sendManagerCredentialsEmail(
      cleanEmail,
      managerId,
      cleanName,
      password,
      manager.branch?.name || null,
      role.name
    );
  } catch (emailError) {
    console.error("Failed to send manager credentials email:", emailError.message);
  }

  // Audit log
  await recordAuditLog(req, {
    action: "CREATE",
    entity: "Manager",
    entityId: manager.id,
    details: {
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      role: role.name,
      branch: manager.branch?.name || null,
    },
  });

  return {
    success: true,
    message: "Manager created successfully",
    data: removeSensitiveFields(manager),
  };
};

// ─── Delete a manager ────────────────────────────────────────────────────────

const removeManager = async (id, req) => {
  const manager = await getManagerById(id);
  if (!manager) throw new Error("Manager not found");

  await deleteManager(id);

  await recordAuditLog(req, {
    action: "DELETE",
    entity: "Manager",
    entityId: id,
    details: {
      fullName: manager.fullName,
      email: manager.email,
    },
  });

  return { success: true, message: "Manager deleted successfully" };
};

export { fetchAllManagers, fetchManagerById, addManager, removeManager };
