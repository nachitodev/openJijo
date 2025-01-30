import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Throttle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async Login(@Body() user, @Res() res, @Req() req) {
    return this.userService.Login(user, res, req);
  }

  @Throttle({ default: { limit: 2, ttl: 60000 } })
  @Get('register')
  async Register(@Res() res, @Req() req) {
    return this.userService.Register(res, req);
  }

  @Get('logout')
  async Logout(@Res() res) {
    return this.userService.Logout(res);
  }
}
