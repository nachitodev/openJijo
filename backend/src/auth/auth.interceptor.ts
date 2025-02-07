import { verifyJWT, renewJWT } from '@/utils/jwt';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Temporal } from 'temporal-polyfill';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const token = req.signedCookies['token'];

    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const accesstoken = await verifyJWT(token);
      const currentTime = Temporal.Now.instant().epochSeconds;
      const renewalThreshold = 84 * 60 * 60;

      if (accesstoken.exp - currentTime < renewalThreshold) {
        const newAccessToken = await renewJWT(token);
        res.cookie('token', newAccessToken, {
          signed: true,
          httpOnly: true,
          expires: new Date((currentTime + 168 * 60 * 60) * 1000),
        });
      }
    } catch (err) {
      console.warn(err);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return next.handle();
  }
}
