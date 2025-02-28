import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteListing(@Param('id') id: number) {
    return this.listingsService.deleteListing(Number(id));
  }
}
