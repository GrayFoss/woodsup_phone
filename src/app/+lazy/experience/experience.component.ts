import {
  Component, OnInit, HostListener, AfterViewInit, ElementRef, ViewChild, NgZone, Renderer2,
  OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../shared/services/products/product.service';
import { BriwserRedirectService } from '../../shared/services/briwserRedirect.service';
import { TYPEES } from '../../shared/utils/data/mock-type';
import { COLORS } from '../../shared/utils/data/mock-color';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { webvrPanoComponent } from '../../shared/common/vrenvironment/webvr.pano.component';
import { CommonVR } from '../../shared/utils/models/CommonVR';
import { webvrEnvironmentService } from '../../shared/services/vr/webvr.environment.services';
import { vrJSLoader } from '../../shared/utils/jsLoader/vrJSLoader';
import { VRURLS } from '../../shared/utils/jsLib/vrJs';

@Component({
  selector: 'experience-componet',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [
    trigger('flyInOutLeft', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('flyInOutRight', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(100%)'}),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ExperienceComponent implements OnInit, AfterViewInit, OnDestroy {
  public selectV = 'scene';
  public win_height;
  public win_width;
  public products;
  public allProducts;
  public seleBrand = false;
  // 判断设备是否横屏，取消首部和底部
  public hiddRotate: boolean= true;
  // 得到所有产品
  public id: number;
  // 判断用户登录是否为PC端
  public Brow;
  public scenes = [
    {id: 1, name: '洛克菲勒', imgUrl: './assets/img/experience/1.png', fileName: 'luokefeile'},
    {id: 2, name: '簪缨世家', imgUrl: './assets/img/experience/2.png', fileName: 'zanyingshijia'},
    {id: 3, name: '汉普顿夏日', imgUrl: './assets/img/experience/3.png', fileName: 'hanpudunxiari'},
    {id: 4, name: '欢乐颂', imgUrl: './assets/img/experience/4.png', fileName: 'huanlesong'},
    {id: 5, name: '诺亚', imgUrl: './assets/img/experience/5.png', fileName: 'nuoya'},
    {id: 6, name: '纸牌屋', imgUrl: './assets/img/experience/6.png', fileName: 'zhipaiwu'}
  ];
  public types = [
    {id: 1, name: '场景选择'},
    {id: 2, name: '产品挑选'},
  ];
  public kinds = TYPEES;
  public colors = COLORS;
  public typeSelect = '场景选择';
  // 显示主面板
  public Main = '';
  public filter;
  // 选择地板种类
  public selekind;
  public floor_color: any;
  public MatName: string = '7882';
  public fileName = '簪缨世家';
  public canvasHeight: number;
  public EL;
  public timing = false;
  public clearTimer;
  public index: number = 0;
  public jsLibIndex: number = 0;
  public commonVR: CommonVR;
  public _host: HTMLElement;
  public prefix: string = 'vr';
  public back: string = 'back';
  @ViewChild(webvrPanoComponent) webvrPanoComponent: webvrPanoComponent;
  constructor(
    public _render: Renderer2,
    public vrjsLoader: vrJSLoader,
    public ngZone: NgZone,
    public _webvr: webvrEnvironmentService,
    private BriwserRedirectService: BriwserRedirectService,
    public route: ActivatedRoute,
    public router: Router,
    public el: ElementRef,
    public allProduct: ProductService
  ) {
    this.EL = this.el.nativeElement;
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.getWidthHeight();
      this.canvasHeight = window.innerHeight;
      let that = this;
      window.addEventListener('orientationchange', function() {
        window.location.reload();
      });
    }
    this.route.params.subscribe((params) => {
      if (params.code) {
        this.MatName = params['code'];
      }
    });
    this.getBrowser();
    this.getScreen();
  }
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this._host = this.el.nativeElement.querySelector('#canvas-container');
      this.loadJSFiles(this._host, this._render);
    }
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
          });
        });
        this.getAllproduct(1, 200);
      }else {
        this.vrjsLoader.appendScript(_render, host, url, this.jsLibIndex++, true, false, this.prefix, null);
      }
    });
  }
  getWidthHeight() {
    this.win_width = window.innerWidth;
    this.win_height = window.innerHeight;
  }
  setTime() {
    this.clearTimer = window.setTimeout( () => {this.timing = false; }, 5000);
  }
  getAllproduct(page, limit) {
    this.allProduct.getProducts(page, limit).then((res) => {
      this.allProducts = res;
      this.products = res;
      if (typeof this.MatName === 'undefined') {
        this.MatName = this.allProducts[0].code;
        this.webvrPanoComponent.setMaterials(this.fileName, this.MatName);
      }else {
        this.webvrPanoComponent.setMaterials(this.fileName, this.MatName);
      }
    });
  }
  /**
   * 获取浏览器的设备,Brow为真为PC，
   * @method getBrowser
   */
  getBrowser() {
    this.Brow = this.BriwserRedirectService.BriwserRedirect();
  }
  /**
   * 判断用户第一次加载是否为横屏hiddRotate为真是竖屏
   * @method getRotate
   */
  getScreen() {
    if (typeof window !== 'undefined') {
      this.Brow = this.BriwserRedirectService.BriwserRedirect();
      if (!this.Brow && window.innerHeight < window.innerWidth) {
        this.hiddRotate = false;
        this.canvasHeight = window.innerHeight;
      }else {
        this.canvasHeight = window.innerHeight - 35;
      }
    }
  }
  getType(res) {
    this.typeSelect = res;
  }
  /**
   * 显示地板种类还是地板颜色
   * @method selectParameter
   * @param {string} res '地板'或'颜色'
   */
  selectParameter(res) {
    this.filter = res;
  }
  /**
   * 选择产品分类(地板or挂画)
   * @method selectProduct
   * @param {string} res 传入产品类别的参数
   */
  selectProduct(res) {
    this.Main = res;
    this.timing = true;
    this.setTime();
  }
  /**
   * 选择地板场景
   * @method setScene
   * @param {scene} res 场景对象
   */
  setScene(res) {
    this.fileName = res.name;
    this.webvrPanoComponent.setMaterials(this.fileName, this.MatName);
  }
  /**
   * 选择地板
   * @method selectFloor
   * @param {product} res 地板对象
   */
  selectFloor(res) {
    this.MatName = res.code;
    this.index = this.products.lastIndexOf(res);
    this.EL.querySelector(`.floor_list`).querySelector('ul').scrollTop = 85 * (this.index - 1);
    this.webvrPanoComponent.setMaterials(this.fileName, this.MatName);
  }
  /**
   * 筛选地板类型(实木、强化or多层)
   * @method seleScene
   * @param {string} res
   */
  selectKind(res) {
    this.selekind = res;
    this.filterProduct(res.prototype, '');
  }
  /**
   * 筛选地板颜色
   * @method filter_floor_color
   * @param {string} res 颜色
   */
  filter_floor_color(res) {
    this.floor_color = res;
    this.filterProduct('', this.floor_color.prototype);
  }
  /**
   * 筛选产品
   * @method filterProduct
   * @param {string} kind 地板类型
   * @param {string} color 地板颜色
   */
  filterProduct(kind?, color?) {
    this.products = this.allProducts;
    if (kind && kind !== '') {
      this.products = this.products.filter((res) => res.type === kind);
    }
    if (color && color !== '') {
      this.products = this.products.filter((res) => res.color === color);
    }
  }
  /**
   * 上滑
   * @method slidingUp
   * @param {string} res class的名字
   */
  slidingUp(res) {
    this.EL.querySelector(`.${res}`).querySelector('ul').scrollTop -= this.EL.querySelector(`.${res}`).querySelector('ul').clientHeight;
  }
  /**
   * 下滑
   * @method slidingUnder
   * @param {string} res class的名字
   */
  slidingUnder(res) {
    this.EL.querySelector(`.${res}`).querySelector('ul').scrollTop += this.EL.querySelector(`.${res}`).querySelector('ul').clientHeight;
  }
  /**
   * 处理动画回调
   */
  flyInOutRightDone(res) {
    if (this.EL.querySelector(`.floor_list`)) {
      this.EL.querySelector(`.floor_list`).querySelector('ul').scrollTop = 85 * (this.index - 1);
    }
  }
  Rotate() {
    if ( window.orientation === 180 || window.orientation === 0 ) {
      this.hiddRotate = true;
      this.getWidthHeight();
      this.canvasHeight = this.win_height - 35;
    }
    if ( window.orientation === 90 || window.orientation === -90 ) {
      this.hiddRotate = false;
      this.getWidthHeight();
      this.canvasHeight = this.win_height;
    }
  }
  launchFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  @HostListener('orientationchange') onRotate() {
    this.Rotate();
  }
  /**
   * 监听手指点击，使左右两边显示,并清除计时器
   * method HostListener(touchstart)
   */
  @HostListener('touchstart') dsajk() {
    window.clearTimeout(this.clearTimer);
    this.timing = true;
    // this.setTime();
  }

//   处理子组件传值
  handleAlreadyInit(done) {
    console.log(done);
  }
}
