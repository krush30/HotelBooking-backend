/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { db } from '../database';
import { reviews } from '../database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ReviewsService {
  getAllReviews() {
    return db.select().from(reviews);
  }

  async getReviewById(id: number) {
    return db.query?.reviews.findFirst({ where: eq(reviews.id, id) });
  }

  createReview(data: any) {
    return db.insert(reviews).values(data).returning();
  }

  updateReview(id: number, data: any) {
    return db.update(reviews).set(data).where(eq(reviews.id, id)).returning();
  }
}
