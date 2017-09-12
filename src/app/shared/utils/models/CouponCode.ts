import { Product } from './Product';
import { User } from './User';
import { Coupon } from './coupon';
export class CouponCode {
  code: string;
  coupon: Coupon;
  compondesc: string;
  endtime: Date;
  includeproduct: boolean;
  name: string;
  product: Product[];
  userlevel: string;
  users: User;
}
