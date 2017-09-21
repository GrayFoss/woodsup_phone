import {
  Component, OnInit, ElementRef, OnDestroy, HostListener, Renderer2, ViewEncapsulation,
  AfterViewInit
} from '@angular/core';
import { ProductService } from '../../../shared/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from '../../../shared/utils/models/Apply';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Carousel } from '../../../shared/common/header/carousel/carousel';

@Component({
  selector: 'mall-index',
  templateUrl: './mall-index.component.html',
  styleUrls: ['./mall-index.component.scss'],
})
export class MallIndexComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  public isFirst: boolean = true;
  public promotiones;
  public window_width;
  public window_height;
  public window_ob;
  public myObjects = [];
  public scenesArray = [0, 1, 2, 3];
  public showMengban: boolean = true;
  public showChooseSex: boolean = true;
  // 计时
  public endTime: any;
  public recommendMessage: Apply = new Apply();
  // 性别判断
  public isMan: boolean = true;
  private article_banneres;
  constructor(
    public router: Router,
    public articleservice: ArticleService,
    public allProduct: ProductService,
    public route: ActivatedRoute,
    public el: ElementRef,
    public renderer: Renderer2
  ) {
  }
  end() {
    event.preventDefault();
  }
  onBom() {
    if (typeof window !== 'undefined') {
      this.window_width = window.innerWidth;
      this.window_height = window.innerHeight;
      this.window_ob = [this.window_width, this.window_height];
    }
  }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const first = sessionStorage.getItem('isFirst');
      console.log(first)
      if (first ) {
        this.isFirst = false;
        sessionStorage.setItem('isFirst', 'false');
      }
      this.onBom();
    }
    this.getBanner();
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && document.querySelector('.mengban')) {
      const mengban = document.querySelector('.mengban');
      mengban.addEventListener('touchmove', this.end, false);
    }
  }
  getBanner() {
    this.articleservice.getArticleBaner().then((res) => {
      this.article_banneres = res.reverse();
      this.myObjects = this.article_banneres.map((obj) => {
        return new Carousel(obj.titleImg, obj.id);
      });
    });
  }

  goScenes(e) {
    this.router.navigate(['/experience']);
  }
  goProducts(e) {
    this.router.navigate(['/product']);
  }
  ngOnDestroy() {}
  isWoman() {
    const mengban = document.querySelector('.mengban');
    mengban.removeEventListener('touchmove', this.end, false);
    this.isFirst = false;
    this.isFirst = false;
    sessionStorage.setItem('isFirst', 'true');
    sessionStorage.setItem('isMan', 'false');
    const first = sessionStorage.getItem('isFirst');
    console.log(first)
  }
  hideMengban() {
    if (typeof window !== 'undefined' && document.querySelector('.mengban')) {
      const mengban = document.querySelector('.mengban');
      mengban.removeEventListener('touchmove', this.end, false);
    }
    this.isFirst = false;
    sessionStorage.setItem('isFirst', 'true');
    sessionStorage.setItem('isMan', 'true');
    const first = sessionStorage.getItem('isFirst');
    console.log(first)
  }
}
