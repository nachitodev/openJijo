import { randomBytes } from 'crypto';

export function generateUUID() {
  const bytes = randomBytes(6);
  const hex = bytes.toString('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}`;
}
