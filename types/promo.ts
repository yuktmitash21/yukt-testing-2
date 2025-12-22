export interface Coupon {
  code: string;
  description: string;
  discountRate: number;
  minimumSubtotal: number;
}

export interface CouponActionResult {
  success: boolean;
  message: string;
}