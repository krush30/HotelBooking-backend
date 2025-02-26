/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { db } from '../database';
import { listings } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ListingsService {
  getAllListings() {
    return db.select().from(listings);
  }

  getListingById(id: number) {
    return db.query?.listings.findFirst({ where: eq(listings.id, id) });
  }

  createListing(data: any) {
    return db.insert(listings).values(data).returning();
  }
}
