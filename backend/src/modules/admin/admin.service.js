import bcrypt from "bcrypt";
import { sendAdminCredentialsEmail } from "../../config/mail.js";

import {
  findUserByEmail,
  findUserByPhone,
  findAdminRole,
  createAdmin,
  getAllAdmins,
  getAdminById,
  deleteAdmin,
} from "./admin.repository.js";

// CREATE ADMIN
export const createAdminService = async ({
  name,
  email,
  phone,
  password,
  type,
}) => {
  // Check email
  const existingEmail = await findUserByEmail(email);

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check phone
  const existingPhone = await findUserByPhone(phone);

  if (existingPhone) {
    throw new Error("Phone number already exists");
  }

  // Find ADMIN role
  const adminRole = await findAdminRole();

  if (!adminRole) {
    throw new Error(
      "ADMIN role not found. Please create ADMIN role first."
    );
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Generate dynamic ID
  const allAdmins = await getAllAdmins();
  const generatedId = `ADM-${String(allAdmins.length + 1001)}`;

  // Create admin
  const admin = await createAdmin({
    fullName: name,
    email,
    phone,
    employeeId: generatedId,
    passwordHash,
    plainPassword: password,

    // Fixed role
    role: "ADMIN",

    // Role table relation
    roleId: adminRole.id,

    // Business type
    type,

    isVerified: true,
    firstLogin: true,
  });

  // Send credentials email to the new admin
  sendAdminCredentialsEmail(email, generatedId, name, password, type).catch(
    (err) => console.error("Admin Email Error:", err.message)
  );

  // Remove sensitive fields
  const {
    passwordHash: removedPassword,
    plainPassword: removedPlain,
    verificationToken,
    verificationExpires,
    ...safeAdmin
  } = admin;

  return safeAdmin;
};


// GET ALL ADMINS
export const getAllAdminsService = async () => {
  const admins = await getAllAdmins();

  return admins.map((admin) => {
    const {
      passwordHash,
      plainPassword,
      verificationToken,
      verificationExpires,
      ...safeAdmin
    } = admin;

    return safeAdmin;
  });
};


// GET ADMIN BY ID
export const getAdminByIdService = async (id) => {
  const admin = await getAdminById(id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  const {
    passwordHash,
    plainPassword,
    verificationToken,
    verificationExpires,
    ...safeAdmin
  } = admin;

  return safeAdmin;
};


// DELETE ADMIN
export const deleteAdminService = async (id) => {
  const admin = await getAdminById(id);

  if (!admin) {
    throw new Error("Admin not found");
  }

  await deleteAdmin(id);

  return {
    message: "Admin deleted successfully",
  };
};