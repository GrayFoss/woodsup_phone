import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ArticleService } from '../../../shared/services/article/article.service';
import { ProductService } from '../../../shared/services/products/product.service';
@Component({
  selector: 'mall-promotion',
  templateUrl: 'mall-promotion.component.html',
  styleUrls: ['./mall-promotion.component.scss']
})
export class MallPromotionComponent implements OnInit {
  public promotiones;
  public articles;
  constructor(
    public articleservice: ArticleService,
    public allProduct: ProductService,
    public router: Router,
    public location: Location
  ) { }
  getPromotion(page, limit) {
    this.allProduct.getPromotion(page, limit).then((res) => this.promotiones = res.slice(0, 3));
  }
  ngOnInit() {
    this.getPromotion(1, 3);
    this.getArticles(3, '专题');
  }
  getArticles(page: number, cate: string) {
    this.articleservice.getArticles(page, cate).then((res) => this.articles = res);
  }
  gotoProductDetail(id: number) {
    this.router.navigate(['/product/' + id]);
  }
  back() {
    this.location.back();
  }
}
