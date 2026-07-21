import { jwtVerify } from "jose";

export interface AdminTokenPayload {
  id: string;
  email: string;
  role: string;
}

const encoder = new TextEncoder();

// Edge-runtime safe verification (middleware.ts cannot use Node-only
// packages like jsonwebtoken/bcryptjs, so this mirrors lib/auth.ts
// using `jose`, which works in both Node and the Edge runtime).
export async function verifyAdminTokenEdge(token: string): Promise<AdminTokenPayload | null> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not set");
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}
