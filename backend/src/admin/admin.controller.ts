import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  Res,
  Req,
} from '@nestjs/common';

import { AdminService } from './admin.service';
import { AuthInterceptor } from '@/auth/auth.interceptor';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseInterceptors(AuthInterceptor)
  @Post('ban')
  async BanUser(@Body() body: JSON, @Res() res: Response, @Req() req: Request) {
    return this.adminService.BanUser(body, res, req);
  }
}
