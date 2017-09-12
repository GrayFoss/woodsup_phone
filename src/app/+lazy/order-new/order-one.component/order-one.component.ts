import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../shared/services/products/product.service';
import { Product } from '../../../shared/utils/models/Product';
import { Location } from '@angular/common';

@Component({
  selector: 'order-one',
  templateUrl: 'order-one.component.html',
  styleUrls: ['order-one.component.scss']
})

export class OrderOneComponent implements OnInit {
  public quantity: any = 30;
  public productId: number;
  public product: Product = new Product();
  public totalPrice;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
  ) {}
  ngOnInit(): void {
    this.productId = +this.router.url.toString().split(';')[1].split('=')[1];
    this.getProduct(this.productId);
  }
  getProduct(id: number) {
    this.productService.getProduct(id).then((res) => {
      this.totalPrice = 30 * res.label_price;
      return this.product = res;
    });
  }
  calculate() {
    this.totalPrice = +this.quantity * this.product.label_price;
  }
  addQuantity() {
    this.quantity = this.quantity + 1;
    this.calculate();
  }
  reduceQuantity () {
    if (this.quantity >= 1) {
      this.quantity = this.quantity - 1;
      this.calculate();
    }
  }
  nextStep1() {
    if (this.quantity <= 0 ) {
      alert('平方数需要大于0');
    }else {
      this.router.navigate(['/order/2', {productId: this.productId, quantity: this.quantity }]);
    }
  }
  back() {
    this.location.back();
  }
}
