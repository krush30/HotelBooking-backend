import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto, UpdateUnitDto } from './units.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUnit(@Param('id') id: number) {
    return this.unitsService.getUnit(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUnit(@Body() createUnitDto: CreateUnitDto) {
    return this.unitsService.createUnit(createUnitDto);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUnit(
    @Param('id') id: number,
    @Body() updateUnitDto: UpdateUnitDto,
  ) {
    return this.unitsService.updateUnit(id, updateUnitDto);
  }
}
