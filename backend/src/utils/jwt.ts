import { sign, verify, Algorithm } from '@node-rs/jsonwebtoken';
import getConfig from '@/config';
import { Temporal } from 'temporal-polyfill';

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

export const renewJWT = async (token: string) => {
  const user = await verifyJWT(token);

  return await signJWT({
    ...user,
    exp: Temporal.Now.instant().add({ hours: 168 }).epochSeconds,
    iat: Temporal.Now.instant().epochSeconds,
  });
};
