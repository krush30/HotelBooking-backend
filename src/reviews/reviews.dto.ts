export class CreateReviewDto {
  bookingId: number;
  customerId: number;
  rating: number;
  comments?: string;
}

export class UpdateReviewDto {
  rating: number;
  comments?: string;
}
