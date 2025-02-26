// bookings.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingDto } from './bookings.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getBooking(@Param('id') id: number) {
    return this.bookingsService.getBooking(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('vendor/:vendorId')
  async getBookingForVendor(@Param('vendorId') vendorId: number) {
    return this.bookingsService.getBookingForVendor(vendorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBooking(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.createBooking(createBookingDto);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateBooking(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingsService.updateBooking(id, updateBookingDto);
  }
}
