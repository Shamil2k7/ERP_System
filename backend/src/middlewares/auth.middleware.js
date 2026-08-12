import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

/**
 * Middleware that extracts JWT token from Authorization header or cookies,
 * looks up the user in the DB, and attaches user info to `req.user`.
 * Non-blocking: if token is absent or invalid, proceeds without setting req.user.
 */
export const attachUserIfAuthenticated = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      const secret = process.env.JWT_SECRET || "supersecretkey";
      const decoded = jwt.verify(token, secret);

      if (decoded && decoded.id) {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id },
          include: { role: true },
        });

        if (user) {
          req.user = {
            id: user.id,
            fullName: user.fullName || user.email,
            email: user.email,
            employeeId: user.employeeId,
            role: user.role?.name || "User",
          };
        }
      }
    }
  } catch (err) {
    // Non-blocking catch to ensure requests aren't broken if token is expired or malformed
  }

  next();
};
