// bookings.service.ts
import { Injectable } from '@nestjs/common';
import { db } from '../database/index';
import { bookings, listings, users } from '../database/schema';
import { eq, and, inArray } from 'drizzle-orm';
import { CreateBookingDto, UpdateBookingDto } from './bookings.dto';

@Injectable()
export class BookingsService {
  async getBooking(id: number) {
    return db.query.bookings.findFirst({ where: eq(bookings.id, id) });
  }

  async getBookingForVendor(vendorId: number) {
    return await db
      .select({
        vendorId: listings.vendorId,
        bookingId: bookings.id,
        customerId: bookings.customerId,
        customerName: users.name, // Fetch customer name
        listingId: bookings.listingId,
        listingName: listings.name, // Fetch listing name
        unitId: bookings.unitId,
        bookingDates: bookings.bookingDates,
        status: bookings.status,
        paymentDetails: bookings.paymentDetails,
        createdAt: bookings.createdAt,
      })
      .from(bookings)
      .innerJoin(listings, eq(bookings.listingId, listings.id))
      .innerJoin(users, eq(bookings.customerId, users.id)) // Join with customers
      .where(eq(listings.vendorId, vendorId));
  }

  async getBookingsForCustomer(customerId: number) {
    return await db
      .select({
        id: bookings.id,
        customerId: bookings.customerId,
        status: bookings.status,
        bookingDates: bookings.bookingDates,
        createdAt: bookings.createdAt,
        paymentDetails: bookings.paymentDetails,
        listingId: bookings.listingId,
        listingName: listings.name,
        listingAddress: listings.address,
      })
      .from(bookings)
      .innerJoin(listings, eq(bookings.listingId, listings.id)) // Joining listings table
      .where(
        and(
          eq(bookings.customerId, customerId),
          inArray(bookings.status, ['approved', 'rejected']),
        ),
      );
  }

  async createBooking(data: CreateBookingDto) {
    return db.insert(bookings).values(data).returning();
  }

  async updateBooking(id: number, data: UpdateBookingDto) {
    return db.update(bookings).set(data).where(eq(bookings.id, id)).returning();
  }
}
