import {Product} from './Product';
import {OrderType} from './orderType';
import {CouponCode} from './CouponCode';

export class Order {
  id: number;
  balance: number;
  couponCode: CouponCode;
  deposit: number;
  createTime: string;
  products: Product[];
  orderNumber: string;
  pid: number;
  status: OrderType;
  balences: any;
  Order_related_products: Product[];
  Pids: number;
}
