import "server-only";
import { scryptSync, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const TOKEN_TTL = "7d";

export interface Session {
  email: string;
}

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

function scryptHash(value: string): Buffer {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return scryptSync(value, secret, 64);
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyCredentials(email: string, password: string): boolean {
  if (email !== process.env.ADMIN_EMAIL) return false;

  const expected = process.env.ADMIN_PASSWORD ?? "";

  return safeEqual(scryptHash(password), scryptHash(expected));
}

async function signSession(): Promise<string> {
  const email = process.env.ADMIN_EMAIL ?? "";

  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(secretKey());
}

async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());

    if (typeof payload.email !== "string") return null;
    if (payload.email !== process.env.ADMIN_EMAIL) return null;

    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifySession(token) : null;
}

export async function requireAdmin(): Promise<Session | null> {
  return getSession();
}

export async function createSession(): Promise<void> {
  const token = await signSession();

  const store = await cookies();

  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  store.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}
