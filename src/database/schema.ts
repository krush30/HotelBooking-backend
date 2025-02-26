import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  json,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: text('password').notNull(),
  role: varchar('role', { length: 50 }).default('customer').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const listings = pgTable('listings', {
  id: serial('id').primaryKey(),
  vendorId: integer('vendor_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'Hotel' or 'Restaurant'
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  description: text('description'),
  facilities: json('facilities'), // Array of facilities
  pricing: json('pricing'), // JSON object for flexible pricing structures
  images: json('images'), // Array of image URLs
  createdAt: timestamp('created_at').defaultNow(),
});

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  listingId: integer('listing_id')
    .notNull()
    .references(() => listings.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 100 }).notNull(), // e.g., 'Deluxe Room', 'VIP Table'
  capacity: integer('capacity').notNull(),
  price: integer('price').notNull(),
  availability: json('availability'), // Store available dates/times as JSON
  createdAt: timestamp('created_at').defaultNow(),
});

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').notNull(),
  listingId: integer('listing_id')
    .notNull()
    .references(() => listings.id, { onDelete: 'cascade' }),
  unitId: integer('unit_id')
    .notNull()
    .references(() => units.id, { onDelete: 'cascade' }),
  bookingDates: json('booking_dates').notNull(), // JSON array to store date range
  status: varchar('status', { length: 50 }).default('pending').notNull(),
  paymentDetails: json('payment_details'), // Store payment info in JSON
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  bookingId: integer('booking_id')
    .notNull()
    .references(() => bookings.id, { onDelete: 'cascade' }),
  customerId: integer('customer_id').notNull(),
  rating: integer('rating').notNull(), // 1 to 5 scale
  comments: text('comments'),
  timestamp: timestamp('timestamp').defaultNow(),
});
