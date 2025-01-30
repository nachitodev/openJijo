import { db } from '@/utils/database';
import { hashPassword, verifyPassword } from '@/utils/hash';
import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';
import { signJWT } from '@/utils/jwt';
import { generateUUID } from '@/utils/uuid';

@Injectable()
export class UserService {
  async Login(user, res: Response, req: Request) {
    if (req.signedCookies['token']) {
      return res.status(400).send({ data: 'You are already logged in.' });
    }

    const { token, password } = user;

    if (!token || !password) {
      return res.status(400).send({ data: 'No credentials received.' });
    }

    const selectedUser = await db.user.findMany({
      where: {
        token,
      },
    });
    try {
      const userLogged = await verifyPassword(
        password,
        selectedUser[0].password,
      );
      const currentTime = Date.now() / 1000;

      if (selectedUser[0].role === 'BANNED') {
        return res.status(401).send({
          data: `You are banned, reason: ${selectedUser[0].banned['reason']}`,
        });
      }

      if (!userLogged) {
        return res.status(401).send({ data: 'Error in credentials.' });
      } else {
        const newAccessToken = await signJWT({
          exp: currentTime + 168 * 60 * 60,
          token: selectedUser[0].token,
          iat: currentTime,
        });
        res.cookie('token', newAccessToken, {
          signed: true,
          httpOnly: true,
          expires: new Date((currentTime + 168 * 60 * 60) * 1000),
        });

        if (!selectedUser[0].ips.includes(req.ip)) {
          await db.user.update({
            where: { token: token },
            data: {
              ips: {
                push: req.ip,
              },
            },
          });
        }

        return res.status(200).send({ data: 'Logged in.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(401).send({ data: 'Error in credentials.' });
    }
  }

  async Logout(res: Response) {
    res.clearCookie('token');
    return res.status(200).send({ data: 'Logged out.' });
  }

  async Register(res: Response, req: Request) {
    if (req.signedCookies['token']) {
      return res.status(400).send({ data: 'You are already logged in.' });
    }

    const token = generateUUID();
    const alreadyExists = await db.user.findMany({
      where: {
        token,
      },
    });

    if (alreadyExists.length > 0) {
      return res
        .status(409)
        .send({ data: 'Error while creating a new user, try again.' });
    }

    const unhashed_password = generateUUID();
    const password = await hashPassword(unhashed_password);
    const ips = [req.ip];

    await db.user.create({
      data: {
        token,
        password,
        ips,
        role: 'USER',
      },
    });

    const currentTime = Date.now() / 1000;

    const newAccessToken = await signJWT({
      exp: currentTime + 168 * 60 * 60,
      token: token,
      iat: currentTime,
    });
    res.cookie('token', newAccessToken, {
      signed: true,
      httpOnly: true,
      expires: new Date((currentTime + 168 * 60 * 60) * 1000),
    });

    return res.status(200).send({
      data: 'User created.',
      token: token,
      password: unhashed_password,
    });
  }
}
