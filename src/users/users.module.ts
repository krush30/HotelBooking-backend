import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  exports: [UsersService], // Allows AuthService to access it
})
export class UsersModule {}
