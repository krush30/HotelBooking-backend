import { IsInt, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateUnitDto {
  @IsInt()
  listingId: number;

  @IsString()
  type: string;

  @IsInt()
  capacity: number;

  @IsInt()
  price: number;

  @IsOptional()
  @IsObject()
  availability?: Record<string, unknown>; // Use 'unknown' instead of 'any'
}

export class UpdateUnitDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  capacity?: number;

  @IsOptional()
  @IsInt()
  price?: number;

  @IsOptional()
  @IsObject()
  availability?: Record<string, unknown>;
}
