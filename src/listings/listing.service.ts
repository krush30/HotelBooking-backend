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

  async deleteListing(id: number) {
    const deleted = await db
      .delete(listings)
      .where(eq(listings.id, id))
      .returning();

    if (deleted.length === 0) {
      throw new Error(`Listing with ID ${id} not found`);
    }

    return { message: 'Listing deleted successfully', deleted };
  }
}
