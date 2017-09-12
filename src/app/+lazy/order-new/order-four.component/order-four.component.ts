import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'order-four',
  templateUrl: './order-four.component.html',
  styleUrls: ['./order-four.component.scss']
})
export class OrderFourComponent implements OnInit, AfterViewInit {
  // 获取订单顶部的高度
  public xx;
  public winHeight;
  orderNumber: string;
  currentUser: any;
  constructor(
    private el: ElementRef,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      if (window.location.href.indexOf('order/detail/?') > 0) {
        this.orderNumber = window.location.href.toString().split('&')[10].split('=')[1];
      }
    }
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.xx = this.el.nativeElement.querySelector('.height').offsetHeight;
    }
    this.winHeight = window.innerHeight;
  }
  gotoOrderDetail() {
    this.router.navigate(['/order/detail', {orderNumber: this.orderNumber}]);
  }
}
