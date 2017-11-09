import {
  Component, OnInit, ElementRef, OnDestroy, Renderer2, AfterViewInit
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ProductService } from '../../../shared/services/products/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Apply } from '../../../shared/utils/models/Apply';
import { ArticleService } from '../../../shared/services/article/article.service';
import { Carousel } from '../../../shared/common/header/carousel/carousel';
import { CouponService } from '../../../shared/services/coupon.service';
declare const Swiper: any;

@Component({
  selector: 'mall-index',
  templateUrl: './mall-index.component.html',
  styleUrls: ['./swiper.min.css', './mall-index.component.scss'],
  animations: [
    trigger('showOrHidden', [
      state('show', style({
        opacity: 1,
        transform: 'scale(1)',
        height: '100%'
      })),
      state('hidden',   style({
        opacity: 0,
        transform: 'scale(0.1)',
        height: '0px'
      })),
      transition('show => hidden', animate('200ms ease-in')),
      transition('hidden => show', animate('200ms ease-out'))
    ])
  ]
})

export class MallIndexComponent implements OnInit, OnDestroy, AfterViewInit {
  public isFirst: string = 'true';
  public promotiones;
  public window_width;
  public window_height;
  public myObjects = [];
  public scenesArray = [0, 1, 2, 3];
  public showMengban: boolean = false;
  public showChooseSex: boolean = true;
  // 计时
  public endTime: any;
  public recommendMessage: Apply = new Apply();
  // 性别判断
  public isMan: boolean = true;
  public article_banneres;
  // 领取优惠券
  public showSmall: boolean = false;
  public showSmallTimer: boolean = false;
  public swiper: any;
  constructor(
    public router: Router,
    public articleservice: ArticleService,
    public allProduct: ProductService,
    public route: ActivatedRoute,
    public el: ElementRef,
    public renderer: Renderer2,
    public ele: ElementRef,
    private couponService: CouponService,
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
    }
  }
  ngAfterViewInit() {
      setTimeout(() => {
        this.showSmallTimer = true;
        this.showSmall = false;
      }, 3000);
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
  backTop() {
    // const body = this.ele.nativeElement.querySelector('body');
    if (typeof window !== 'undefined') {
      document.body.scrollTop = 0;
    }
  }
  getBanner() {
    // this.articleservice.getArticleBaner().then((res) => {
    //   this.article_banneres = res;
    //   this.loadScript('assets/lib/swiper.min.js', 'swiper', () => {
    //     const swiper = new Swiper('.swiper-container', {
    //       autoplay: 2500,
    //       autoplayDisableOnInteraction: false,
    //       loop: true
    //     });
    //   });
    // });
    this.article_banneres = [
      {
        url: '',
        titleImg: 'assets/img/mall/banner/banner1.jpg'
      }, {
        url: '',
        titleImg: 'assets/img/mall/banner/banner2.jpg'
      },
      // {
      //   url: '/product',
      //   titleImg: 'assets/img/mall/banner/banner3.jpg'
      // },
      {
        url: '/product/60',
        titleImg: 'assets/img/mall/banner/banner4.jpg'
    }];
    this.loadScript('assets/lib/swiper.min.js', 'swiper', () => {
      this.swiper = new Swiper('.swiper-container', {
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        loop: true
      });
    });
  }


  goScenes(e) {
    console.log(e);
    this.router.navigate(['/experience']);
  }
  goProducts(e) {
    console.log(e);
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
  toggleGift() {
    this.showSmall = !this.showSmall;
    this.showMengban = false;
  }
  showGift() {
    this.showSmall = !this.showSmall;
    this.showMengban = true;
  }

//  领取优惠券
  getCoupon() {
    this.couponService.getShareCouponCode()
      .then((res) => {
        if (res.status.error === 0) {
          this.couponService.getCouponByCode(res.result.code)
            .then(respones => {
              if (respones.status.error === 0) {
                this.router.navigate(['/user/coupon', respones.result.code]);
              }
            });
        }else {
          this.router.navigate(['/admin/login']);
        }
      });
  }
}
