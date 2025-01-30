import { sign, verify, Algorithm } from '@node-rs/jsonwebtoken';
import getConfig from '@/config';

export const signJWT = async (payload: any) => {
  return await sign(payload, getConfig().privateKey, {
    algorithm: Algorithm.RS256,
  });
};

export const verifyJWT = async (token: string) => {
  return await verify(token, getConfig().publicKey, {
    algorithms: [Algorithm.RS256],
  });
};
