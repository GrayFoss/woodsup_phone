
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../../shared/services/User.service';
import { User } from '../../../shared/utils/models/User';
import { OrderService } from '../../../shared/services/order.service';
import { ProductService } from '../../../shared/services/products/product.service';
import { CouponService } from '../../../shared/services/coupon.service';
import { PayService } from '../../../shared/services/pay.service';
import { CouponCode } from '../../../shared/utils/models/CouponCode';
import { Location } from '@angular/common';

@Component({
  selector: 'order-three',
  templateUrl: './order-three.component.html',
  styleUrls: ['./order-three.component.scss']
})

export class OrderThreeComponent implements OnInit {
  public OrderProduct: any;
  public alifrom;
  public orderNumber: string;
  public product: any;
  public Promotion;
  public productId: number;
  public quantity: number;
  public currentUser: User = new User();
  public fullPayment = true;
  public Order;
  public promotionList;
  public promotionListLength = 0;
  public seleGood: CouponCode = new CouponCode();
  public actualPrice;
  public originalPrice;
  public allPrice: string;
  public compare = (obj1, obj2) => {
    const val1 = obj1.coupon.discount;
    const val2 = obj2.coupon.discount;
    if (val1 < val2) {
      return 1;
    } else if (val1 > val2) {
      return -1;
    } else {
      return 0;
    }
  }
  constructor(
    private payservice: PayService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private orderservice: OrderService,
    private productService: ProductService,
    private CouponService: CouponService,
    private router: Router,
    private location: Location
  ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.quantity = +params['quantity'];
      this.orderNumber = params['orderNumber'];
    });
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
        this.getCoupon(this.currentUser.id);
      }else {
        this.router.navigate(['/']);
      }
    });
    this.getOrder(this.orderNumber);
    this.getProduct(this.productId);
  }
  showPromotion() {
    this.Promotion = !this.Promotion;
  }
  back() {
    this.location.back();
  }
  /**
   * 根据订单ID获取订单产品
   * @method getOrder
   * @param {string} id 订单ID
   */
  getOrderProduct(id) {
    this.orderservice.getOrderProduct(id).then((res) => {
      if (res.status.error === 0) {
        this.OrderProduct = res.result;
      }
    });
  }
  /**
   * 根据ID获取产品信息
   * method getProduct
   * @param {number} id 产品id
   */
  getProduct(id: number) {
    this.productService.getProduct(id).then((res) => this.product = res);
  }
  /**
   * 根据订单ID获取订单信息
   * @method getOrder
   * @param {string} id 订单ID
   */
  getOrder(id) {
    this.orderservice.getOrder(id).then((res) => {
      if (res.status.error === 0) {
        this.Order = res.result;
        this.allPrice = this.Order.balences.toFixed(2);
        this.originalPrice = this.Order.balences.toFixed(2);
        this.actualPrice = this.Order.balences.toFixed(2);
        this.getOrderProduct(this.Order.id);
      }
    });
  }
  /**
   * 根据用户id获取用户促销卷信息
   * @method getCoupon
   * @param {number} id 用户ID
   */
  getCoupon(id) {
    this.CouponService.getUserCoupon(id).then((res) => {
      this.promotionList = res.result;
      const date = new Date().getTime();
      if (this.promotionList.length !== 0) {
        // 筛选当前时间是否小于促销券的截至时间
        this.promotionList = this.promotionList.filter((res) => {
          return date < new Date(res.endTime).getTime();
        });
        // 筛选促销券对产品的有效
        for (const x in this.promotionList) {
          if (this.promotionList[x].includeProduct === true) {
            this.promotionList = this.promotionList.filter((res) => {
              if ( Boolean(res.products.find((res) => this.productId === res.id)) ) {
                return res;
              }
            });
          }else {
            this.promotionList = this.promotionList.filter((res) => {
              if ( Boolean(res.products.find((res) => this.productId !== res.id)) ) {
                return res;
              }
            });
          }
        }
        // 如果还存在优惠券则选出最优的优惠券
        if (this.promotionList.length !== 0) {
          this.seleGood = this.promotionList.sort(this.compare)[0];
          this.actualPrice = (this.originalPrice * this.seleGood.coupon.discount).toFixed(2);
        }
      }
      this.promotionListLength = this.promotionList.length;
    });
  }
  /**
   * 提交订单actualPrice 订单总价paymenttype 订单类型(定金或全款) actualPrice打折后的价格
   * @method pay
   * @param {string} myOrder 订单编号
   * @param {string} title 订单标题
   * @param {string} code 产品code
   */
  pay(myOrder, title, code) {
    if (this.fullPayment) {
      this.payservice.SubAli(myOrder, title, this.originalPrice, 'FLOORING_BALANCE', code, this.actualPrice, this.seleGood.code)
        .then((res) => {
          return this.alifrom = res._body;
        });
    }else {
      this.payservice.SubAli(myOrder, title, this.originalPrice, 'FLOORING_DEPOSIT', code, this.actualPrice, this.seleGood.code)
        .then((res) => {
          return this.alifrom = res._body;
        });
    }
  }
  /**
   * 选择支付定金还是全款fullPaymeny为真是全款
   * @method selePayWay
   */
  selePayWay() {
    if (this.fullPayment) {
      this.originalPrice = (this.originalPrice * 0.1).toFixed(2);
      this.actualPrice = (this.actualPrice * 0.1).toFixed(2);
    }else {
      this.originalPrice = this.Order.balences.toFixed(2);
      this.actualPrice = this.Order.balences.toFixed(2);
    }
    this.fullPayment = !this.fullPayment;
  }
  /**
   * 选择优惠券
   * @method seleCoupon
   * @param {object} res 优惠券
   */
  seleCoupon(res) {
    this.seleGood = res;
  }
}
