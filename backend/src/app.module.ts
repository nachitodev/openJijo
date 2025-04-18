import { Module } from '@nestjs/common';
import { PostsModule } from '@/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { UserModule } from '@/user/user.module';
import { AdminModule } from './admin/admin.module';
import getConfig from '@/config';
@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      load: [getConfig],
    }),
    UserModule,
    AdminModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
