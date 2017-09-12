
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/User.service';
import { ActivatedRoute, Params } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { User } from '../../../shared/utils/models/User';
import { CouponService } from '../../../shared/services/coupon.service';
import { Location } from '@angular/common';
import { PayService } from '../../../shared/services/pay.service';
import { Order } from '../../../shared/utils/models/Order';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  public compare: any;
  public originalPrice: number = 0;
  public actualPrice: number = 0;
  public seleGood: any;
  public productId: any;
  public promotionList: any;
  public OrderProduct: any;
  public orderNumber: any;
  public all: boolean = true;
  public currentUser: User;
  public Order: Order;
  public area;
  private alifrom: any;
  constructor(
    private payservice: PayService,
    private userservice: UserService,
    private CouponService: CouponService,
    private route: ActivatedRoute,
    private orderservice: OrderService,
    private location: Location
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.orderNumber = params['orderNumber'];
    });
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
        this.getOrder(this.orderNumber);
      }
    });
  }
  /**
   * 根据订单orderNumber获取订单信息
   * @method getOrder
   * @param {string} id 订单ID
   */
  getOrder(id) {
    this.orderservice.getOrder(id)
      .then((res) => {
          if (res.status.error === 0) {
            return this.Order = res.result;
          }
        })
      .then((res) => {
        this.getOrderProduct(res);
        });
  }
  /**
   * 根据订单ID获取订单产品
   * @method getOrder
   * @param {object} res 订单
   */
  getOrderProduct(res) {
    this.orderservice.getOrderProduct(res.id).then((res) => {
      if (res.status.error === 0) {
        this.OrderProduct = res.result[0];
        this.area = this.Order.balences / (+this.OrderProduct.label_price);
      }
    });
  }
  back() {
    this.location.back();
  }
  payBalance(myOrder, title, code) {
    if (this.Order.couponCode.coupon.discount) {
      this.payservice.SubAli(myOrder, title, this.originalPrice, 'PAID_DEPOSIT', code, this.Order.balences * 0.9 * this.Order.couponCode.coupon.discount, this.seleGood.code)
        .then((res) => {
          return this.alifrom = res._body;
        });
    }else {
      this.payservice.SubAli(myOrder, title, this.originalPrice, 'PAID_DEPOSIT', code, this.Order.balences * 0.9, this.seleGood.code)
        .then((res) => {
          return this.alifrom = res._body;
        });
    }
  }
}
