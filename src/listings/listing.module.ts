import { Module } from '@nestjs/common';
import { ListingsService } from './listing.service';
import { ListingsController } from './listing.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ListingsService, JwtService],
  controllers: [ListingsController],
  exports: [ListingsService],
})
export class ListingsModule {}
