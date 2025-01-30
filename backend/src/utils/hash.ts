import { hash, verify } from '@node-rs/argon2';

export async function hashPassword(password: string) {
  return await hash(password);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await verify(hashedPassword, password);
}
