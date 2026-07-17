import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET belum diset di environment variable');
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface SesiAdmin {
  adminId: string;
  email: string;
}

export async function buatTokenSesi(payload: SesiAdmin): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifikasiTokenSesi(token: string): Promise<SesiAdmin | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SesiAdmin;
  } catch {
    return null;
  }
}