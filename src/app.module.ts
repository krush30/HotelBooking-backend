import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ListingsController } from './listings/listing.controller';
import { UsersController } from './users/users.controller';
import { ListingsModule } from './listings/listing.module';
import { UsersModule } from './users/users.module';
import { UnitsModule } from './units/units.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsController } from './bookings/bookings.controller';
// import { ListingsService } from './listings/listing.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    ListingsModule,
    UsersModule,
    UnitsModule,
    BookingsModule,
    ReviewsModule,
    UploadModule,
  ],
  controllers: [ListingsController, UsersController, BookingsController],
})
export class AppModule {}
