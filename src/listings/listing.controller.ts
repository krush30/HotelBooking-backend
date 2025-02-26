import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ListingsService } from './listing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllListings() {
    return this.listingsService.getAllListings();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getListingById(@Param('id') id: number) {
    return this.listingsService.getListingById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createListing(@Body() body) {
    return this.listingsService.createListing(body);
  }
}
