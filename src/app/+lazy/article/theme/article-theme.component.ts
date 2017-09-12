/**
 * Created by Joe on 2017/2/27.
 */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../shared/services/article/article.service';
import { ProductService } from '../../../shared/services/products/product.service';
@Component({
  selector: 'article-theme',
  templateUrl: './article-theme.component.html',
  styleUrls: ['./article-theme.component.css'],
})
export class ArticleThemeComponent implements OnInit {
  public selectV = 'mall';
  public promotiones;
  public styles;
  public sub;
  public article;
  constructor(
    public route: ActivatedRoute,
    public articleservice: ArticleService,
    public allProduct: ProductService,
    public router: Router) {
  }
  ngOnInit(): void {
    this.getPromotion(1, 3);
    this.getArticle();
  }
  getPromotion(page, limit) {
    this.allProduct.getPromotion(page, limit).then((res) => {
      return this.promotiones = res.slice(0, 3);
    });
  }
  getArticle() {
    this.sub = this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.articleservice.getArticle(id).then((article) => {
        this.article = article;
      });
    });
  }
}
