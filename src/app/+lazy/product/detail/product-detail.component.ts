import {
  Component, ElementRef, OnInit, ViewChild, Renderer2, NgZone, AfterViewInit, OnDestroy,
  OnChanges, SimpleChanges
} from '@angular/core';
import { CommonVR } from '../../../shared/utils/models/CommonVR';
import { webvrPanoComponent } from '../../../shared/common/vrenvironment/webvr.pano.component';
import { vrJSLoader } from '../../../shared/utils/jsLoader/vrJSLoader';
import { webvrEnvironmentService } from '../../../shared/services/vr/webvr.environment.services';
import { VRURLS } from '../../../shared/utils/jsLib/vrJs';
import { ProductService } from '../../../shared/services/products/product.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import {CouponService} from "../../../shared/services/coupon.service";
@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  public seleProduct = [];
  public product: any;
  public _host: HTMLElement;
  public commonVR: CommonVR;
  public fileName = '簪缨世家';
  public matName: string = '7882';
  public jsLibIndex: number = 0;
  public prefix: string = 'vr';
  public parameter_more: boolean;
  @ViewChild(webvrPanoComponent) webvrPanoComponent: webvrPanoComponent;
  public window_width: number;
  public id: any;
  // 控制男生版显示的内容
  public showMan: string = 'true';
  public detailLists = [
    {name: '产品详情'},
    {name: '基本信息'},
    {name: '点评'}
  ];
  public detailClass = this.detailLists[0];
  public allproductes: any;
  public allProductLength: number;
  public like: boolean;
  constructor(
    private couponService: CouponService,
    public vrjsLoader: vrJSLoader,
    public el: ElementRef,
    public _render: Renderer2,
    public _webvr: webvrEnvironmentService,
    public ngZone: NgZone,
    private productService: ProductService,
    public route: ActivatedRoute,
    public location: Location,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.showMan =  localStorage.getItem('isMan');
      this.window_width = window.innerWidth;
      document.body.scrollTop = 0;
    }
    this.getProducts(1, 200);

    if (typeof window !== 'undefined') {
      this._host = this.el.nativeElement.querySelector('#product_three');
      this.loadJSFiles(this._host, this._render);
    }

  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      for (let _index = 0; _index < VRURLS.length; _index++) {
        this._render.removeChild(this._host, this._host.querySelector('#vr' + (_index)));
      }
    }
  }
  public loadJSFiles(host: HTMLElement, _render: Renderer2) {
    // load js lib
    VRURLS.map((url) => {
      if (this.jsLibIndex === VRURLS.length - 1) {
        this.vrjsLoader.appendScript(_render, host, url, this.jsLibIndex++, true, false, this.prefix, () => {
          // 触发angular ngchange
          this.ngZone.run(() => {
            this.commonVR = new CommonVR(host);
            this._webvr.initialVR(host, _render, this.commonVR);
            this.route.params
              .switchMap((params: Params) => this.id = params['id'])
              .subscribe((params: Params) => {
                this.getProduct(this.id);
              });
          });
        });
        // this.getProduct(this.id);
        if (this.commonVR) {
          // this.webvrPanoComponent.setMaterials(this.fileName, this.matName);
        }
      }else {
        this.vrjsLoader.appendScript(_render, host, url, this.jsLibIndex++, true, false, this.prefix, null);
      }
    });
  }
  /**
   * 根据ID获取产品信息
   * method getProduct
   * @param {number} id 产品id
   */
  getProduct(id: number) {
    this.productService.getProduct(id).then((res) => {
      this.matName = res.code;
      this.product = res;
      if (!this.product.expert_comment) {
        this.product.expert_comment = `独有的除甲醛专利，地板环保等级达到E0。新型锁扣技术，安装方便、牢固。`;
      }
      if (!this.product.designer_comment) {
        this.product.designer_comment = `设计师系列木纹工艺，低调宽和，色泽柔润，适合搭配各种风格的家具设计。`;
      }
      this.webvrPanoComponent.setMaterials(this.fileName, this.matName);
    });
  }
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
  getProducts(page, limit) {
    this.productService.getProducts(page, limit).then((res) => {
      this.allproductes = res;
      this.allProductLength = this.allproductes.length;
      this.random();
    });
  }
  IsLike() {
    this.like = !this.like;
  }
  back() {
    this.location.back();
  }
  random() {
    this.seleProduct = [];
    const cc = Math.floor(Math.random() * (this.allProductLength - 3));
    for (let x = 0; x < 3; x++) {
      this.seleProduct.push(this.allproductes[cc + x]);
    }
  }
  gotoExperience() {
    this.router.navigate(['/experience', {code: this.matName}]);
  }
  gotoOrder() {
    this.router.navigate(['/order/1', {product_id: this.id}]);
  }
  clickDetail(res) {
    this.detailClass = res;
    if (res.name === '基本信息') {
      document.body.scrollTop = this.el.nativeElement.querySelector('.parameter').offsetTop - 52;
    }else if (res.name === '产品详情' ) {
      document.body.scrollTop = 0;
    }else {
      if (this.el.nativeElement.querySelector('.sort4')) {
        document.body.scrollTop = this.el.nativeElement.querySelector('.sort4').offsetTop - 42;
      }else {
        document.body.scrollTop = 42;
      }
    }
  }
  gotoProduct(res) {
    this.router.navigate(['product', res]);
    document.body.scrollTop = 0;
  }
}
