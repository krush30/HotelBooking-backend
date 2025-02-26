import { IsInt, IsString, IsObject, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  customerId: number;

  @IsInt()
  listingId: number;

  @IsInt()
  unitId: number;

  @IsObject()
  bookingDates: Record<string, unknown>; // Store date range

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  paymentDetails?: Record<string, unknown>;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsObject()
  bookingDates?: Record<string, unknown>;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsObject()
  paymentDetails?: Record<string, unknown>;
}
