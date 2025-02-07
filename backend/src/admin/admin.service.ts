import { verifyJWT } from '@/utils/jwt';
import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { db } from '@/utils/database';
import { Temporal } from 'temporal-polyfill';

@Injectable()
export class AdminService {
  async BanUser(body, res: Response, req: Request) {
    const { token, reason } = body;
    try {
      const user = await verifyJWT(req.signedCookies['token']);

      if (user.role !== 'ADMIN') {
        return res.status(401).send({ data: 'You are not an admin.' });
      }

      if (!token || !reason) {
        return res.status(400).send({ data: 'No data received.' });
      }

      const banned = {
        reason: reason,
        by: user.modName,
        date: Temporal.Now.instant().epochMilliseconds,
      };

      await db.user.update({
        where: { token: token },
        data: {
          role: 'BANNED',
          banned: banned,
        },
      });
      return res.status(200).send({ data: `User: ${token} banned`, ...banned });
    } catch (err) {
      console.warn(err);
      return res.status(401).send({ data: 'Unauthorized' });
    }
  }
}
