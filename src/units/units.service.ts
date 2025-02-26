import { Injectable } from '@nestjs/common';
import { db } from '../database/index';
import { units } from '../database/schema';
import { eq } from 'drizzle-orm';
import { CreateUnitDto, UpdateUnitDto } from './units.dto';

@Injectable()
export class UnitsService {
  async getUnit(id: number) {
    return db.query.units.findFirst({ where: eq(units.id, id) });
  }

  async createUnit(data: CreateUnitDto) {
    return db.insert(units).values(data).returning();
  }

  async updateUnit(id: number, data: UpdateUnitDto) {
    return db.update(units).set(data).where(eq(units.id, id)).returning();
  }
}
