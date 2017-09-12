import { AfterViewInit, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { OrderStatus } from '../../../shared/utils/models/OrderStatus';
import { OrderService } from '../../../shared/services/order.service';
import { UserService } from '../../../shared/services/User.service';

@Component({
  selector: 'user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss'],
})

export class UserOrderComponent implements OnInit, AfterViewInit {
  orderBeing: any;
  public orders: any;
  public ORDERSTATUS: OrderStatus[] = [
    {name: '全部' },
    {name: '待付款' },
    {name: '待收货' },
    {name: '已完成' },
    {name: '已取消' },
  ];
  public ClassStatus: OrderStatus;
  private currentUser: any;
  constructor(
    private router: Router,
    private orderservice: OrderService,
    public userservice: UserService
  ) {}
  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
        this.getOrderUser(this.currentUser.id);
      }
    });
  }
  /**
   * 获取用户订单信息
   * @method getOrderUser
   * @parma {number} id 用户ID
   */
  getOrderUser(id: number) {
    this.userservice.getOrderUser(id).then((res) => {
      this.orders = res.result;
      this.orders.forEach((response, index, array) => {
        this.orderservice.getOrderProduct(res.id).then((resqq) => {
          if (resqq.result[0]) {
            array[index].product = resqq.result[0];
          }else {
            array[index].product = {
              name: '云深间造VR家装定制优惠福利卡',
              code: 'tugou0722',
            };
          }
        });
      });
    });
  }
  seleStatus(res) {
    this.ClassStatus = res;
  }
}
