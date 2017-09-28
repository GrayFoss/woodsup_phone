import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../../shared/services/User.service';
import { Location } from '@angular/common';
import { Order } from '../../../shared/utils/models/Order';
import { ProductService } from '../../../shared/services/products/product.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'order-two',
  templateUrl: './order-two.component.html',
  styleUrls: ['./order-two.component.scss']
})

export class OrderTwoComponent implements OnInit {
  public currentUser;
  public productId;
  public quantity;
  public prompting;
  public product;
  constructor(
    private orderservice: OrderService,
    private userservice: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.quantity = +params['quantity'];
    });
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
        this.prompting = null;
      }
    });
    this.getProduct(this.productId);
  }
  /**
   * 关闭未填写地址提示
   * @method close
   */
  close() {
    this.prompting = null;
  }
  gotoOrder() {
    this.router.navigate(['/order/new/address', {productId: this.productId, quantity: this.quantity }]);
  }
  nextStep2() {
    if (this.prompting) {
      const order = new Order();
      const totalPrice = (Number(this.product.label_price) * this.quantity).toString();
      const products = [];
      products.push(this.product);
      this.orderservice.addOrder(order, totalPrice, products).then((res) => {
        if (res.status.error === 0) {
          const orderNumber = res.result.orderNumber;
          this.router.navigate(['/order/3', {productId: this.productId, quantity: this.quantity, orderNumber: orderNumber}]);
        }
      });
    }else {
      this.prompting = '请您填写收货地址';
      this.setTimer();
    }
  }
  /**
   * 根据ID获取产品信息
   * method getProduct
   * @param {number} id 产品id
   */
  getProduct(id: number) {
    this.productService.getProduct(id).then((res) => this.product = res);
  }
  back() {
    this.location.back();
  }
  setTimer() {
    setTimeout(() => {
      this.prompting = null;
    }, 1000);
  }
}
