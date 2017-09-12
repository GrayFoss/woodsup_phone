import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../../shared/services/products/product.service';
@Component({
  selector: 'product-promotion',
  templateUrl: './product-promotion.component.html',
  styleUrls: ['./product-promotion.component.scss'],
})
export class ProductPromotionComponent implements OnInit {
  public selectV = 'mall';
  public promotiones;
  constructor(
    public allProduct: ProductService,
    public router: Router,
    public location: Location
  ) { }
  getPromotion(page, limit) {
    this.allProduct.getPromotion(page, limit).then((res) => {
      return this.promotiones = res.slice(0, 3);
    });
  }
  ngOnInit() {
    this.getPromotion(1, 3);
  }
  gotoProductDetail(id: number) {
    this.router.navigate(['/product/' + id]);
  }
  back() {
    this.location.back();
  }
}
