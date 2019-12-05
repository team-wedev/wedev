import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserService } from 'user/user.service';
import { UserController } from 'user/user.controller';

import { UserSerializerModule } from 'serializer/user-serializer.module';

import { User } from '../../../typeorm/src/entity/user.entity';
import { Video } from '../../../typeorm/src/entity/video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video]), UserSerializerModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
