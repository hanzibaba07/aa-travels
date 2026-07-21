import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminTokenPayload) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
  const options: jwt.SignOptions = { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not set");
    return jwt.verify(token, JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

// Simple role-based access check, used inside API routes / server actions.
export function requireRole(payload: AdminTokenPayload | null, allowed: string[]) {
  if (!payload) return false;
  return allowed.includes(payload.role);
}
