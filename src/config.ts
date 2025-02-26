export default {
  PORT: process.env.PORT || 4000,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgresql://postgres:123123@localhost:5432/hotel_booking',
  JWT_SECRET: process.env.JWT_SECRET || 'my_secret_key',
};
