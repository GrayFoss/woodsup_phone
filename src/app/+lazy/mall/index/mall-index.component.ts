import {
  Component, OnInit, ElementRef, OnDestroy, Renderer2
} from '@angular/core';
import { ProductService } from '../../../shared/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from '../../../shared/utils/models/Apply';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Carousel } from '../../../shared/common/header/carousel/carousel';
declare const Swiper: any;

@Component({
  selector: 'mall-index',
  templateUrl: './mall-index.component.html',
  styleUrls: ['./swiper.min.css', './mall-index.component.scss'],
})

export class MallIndexComponent implements OnInit, OnDestroy {
  public isFirst: string = 'true';
  public promotiones;
  public window_width;
  public window_height;
  public myObjects = [];
  public scenesArray = [0, 1, 2, 3];
  public showMengban: boolean = true;
  public showChooseSex: boolean = true;
  // 计时
  public endTime: any;
  public recommendMessage: Apply = new Apply();
  // 性别判断
  public isMan: boolean = true;
  public article_banneres;
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
    }
  }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const first = localStorage.getItem('isFirst');
      if (first) {
        this.isFirst = 'false';
      }
      this.onBom();
      this.getBanner();
      if (document.querySelector('.mengban')) {
        const mengban = document.querySelector('.mengban');
        mengban.addEventListener('touchstart', this.end, false);
      }
    }
  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      document.getElementsByTagName('head')[0].removeChild(document.getElementById('swiper'));
    }
  }
  /**
   * swiper.min.js
   * @method loadScript
   */
  loadScript(url, id, callback) {
    const script = document.createElement ('script');
    script.type = 'text/javascript';
    script.id = id;
    script.onload = function() {
      callback();
    };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }
  getBanner() {
    this.articleservice.getArticleBaner().then((res) => {
      this.article_banneres = res;
      this.loadScript('assets/lib/swiper.min.js', 'swiper', () => {
        const swiper = new Swiper('.swiper-container', {
          autoplay: 2500,
          autoplayDisableOnInteraction: false,
          loop: true
        });
        console.log(document.getElementById('swiper'))
      });
    });
  }
  goScenes(e) {
    this.router.navigate(['/experience']);
  }
  goProducts(e) {
    this.router.navigate(['/product']);
  }
  isWoman() {
    if (typeof window !== 'undefined' && document.querySelector('.mengban')) {
      const mengban = document.querySelector('.mengban');
      mengban.removeEventListener('touchstart', this.end, false);
    }
    this.isFirst = 'false';
    localStorage.setItem('isFirst', 'false');
    localStorage.setItem('isMan', 'false');
    event.preventDefault();
  }
  hideMengban() {
    if (typeof window !== 'undefined' && document.querySelector('.mengban')) {
      const mengban = document.querySelector('.mengban');
      mengban.removeEventListener('touchstart', this.end, false);
    }
    this.isFirst = 'false';
    localStorage.setItem('isFirst', 'false');
    localStorage.setItem('isMan', 'true');
    event.preventDefault();
  }
}
