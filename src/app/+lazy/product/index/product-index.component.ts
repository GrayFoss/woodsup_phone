import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProductService } from '../../../shared/services/products/product.service';
import { ScreenService } from '../../../shared/services/screen.server';
import { Screen } from '../../../shared/model/screen';
import { PRICES } from '../../../shared/utils/data/mock-price';
import { Price } from '../../../shared/utils/models/Price';
import { CollectMsgService } from '../../../shared/services/CollectMsg.service';
import { Apply } from '../../../shared/utils/models/Apply';
import { Subscription } from 'rxjs/Subscription';
import { ProductFilter } from '../../../shared/utils/models/ProductFilter';

@Component({
  selector: 'product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
  animations: [
    // trigger('filterState', [
    //   state('inactive', style({
    //     transform: 'translateX(0%)',
    //     // width: '100%'
    //   })),
    //   state('active',   style({
    //     transform: 'translateX(50%)',
    //     // width: '50%'
    //   })),
    //   transition('inactive => active', animate('100ms ease-in')),
    //   transition('active => inactive', animate('100ms ease-in'))
    // ]),
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      state('out', style({transform: 'translateX(-86px)'})),
      transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('200ms ease-in'))
    ])
  ],
  providers: [ScreenService]
})
export class ProductIndexComponent implements OnInit , OnDestroy, AfterViewInit {
  public prices: Price[] = PRICES;
  public scerenList = new Screen();
  public selectV = 'mall';
  public allproductes;
  public seleproductes;
  public TONE;
  public BRAND;
  public STYLENAME;
  public TYPENAME;
  public scren = new Screen();
  public ccColor;
  public priceBackground: Price;
  public recommendMessage: Apply = new Apply();
  public sendType = 'Normal';
  // 搜索状态
  public searching: string = 'in';
  public searchWord: string = '' ;
  public filterWord: ProductFilter = {
    type: '',
    brand: '',
    color: ''
  };
  subscription: Subscription;
  // 左侧边栏
  public list: any = [
    {
      id: 'type',
      name: '种类',
      open: false,
      pages: [
        { belong: 'type', id: 'LaminateFlooring', name: '强化复合', open: false },
        { belong: 'type', id: 'SolidwoodFlooring', name: '纯实木', open: false },
        { belong: 'type', id: 'EngineeredFlooring', name: '三层实木', open: false }
        ]
    },
    {
      id: 'brand',
      name: '品牌',
      open: false,
      pages: [
        { belong: 'brand', id: 'Stpaul', name: '圣保罗', open: false },
        { belong: 'brand', id: 'Greenply', name: '新加坡', open: false },
        { belong: 'brand', id: 'Lalegno', name: '比利时', open: false }
      ]
    },
    {
      id: 'color',
      name: '颜色',
      open: false,
      pages: [
        { belong: 'color', id: 'Red', name: '红色', open: false },
        { belong: 'color', id: 'Brown', name: '棕色', open: false },
        { belong: 'color', id: 'Yellow', name: '黄色', open: false },
        { belong: 'color', id: 'Timber', name: '原木', open: false },
        { belong: 'color', id: 'Gray', name: '灰色', open: false }
        ]
    }
    ];
  constructor(
    private screenService: ScreenService,
    public router: Router,
    public route: ActivatedRoute,
    public productService: ProductService,
    private collectmsgservice: CollectMsgService
  ) {
    this.subscription = screenService.screen$.subscribe((x) => {
        this.scren = JSON.parse(x);
        this.scerenList = JSON.parse(x);
        if (this.scerenList.brand) {
          if (this.scerenList.brand === '新加坡Greenply') {
            this.scerenList.brand = '新加坡';
          }else if (this.scerenList.brand === '比利时Lalegno') {
            this.scerenList.brand = '比利时';
          }
        }
        this.filterProducts(this.scren.tone, this.scren.brand, this.scren.type, this.scren.price);
      }
    );
  }
  public compareSamll = (obj1, obj2) => {
    const val1 = obj1.label_price;
    const val2 = obj2.label_price;
    if ( parseInt(val1, 10) < parseInt(val2, 10)) {
      return -1;
    } else if ( parseInt(val1, 10) > parseInt(val2, 10)) {
      return 1;
    } else {
      return 0;
    }
  }
  public compareLarge = (obj1, obj2) => {
    const val1 = obj1.label_price;
    const val2 = obj2.label_price;
    if ( parseInt(val1, 10) < parseInt(val2, 10)) {
      return 1;
    } else if (parseInt(val1, 10) > parseInt(val2, 10)) {
      return -1;
    } else {
      return 0;
    }
  }
  ngOnInit(): void {
    // 智能挑选获取风格和类型
    this.scerenList.state = 'inactive';
    this.route.params.subscribe((params) => {
      this.scren.type = params['typeName'];
      if (params['brand'] === 'lalegno') {
        this.scren.brand = '比利时Lalegno';
        this.BRAND = '比利时Lalegno';
      }
      this.getProduct(1, 200);
    });
  }
  ngAfterViewInit(): void {}
  // 搜索
  search() {
    this.searching = 'out';
  }
  // 不搜索
  nosearch() {
    if (this.searchWord === '') {
      this.searching = 'in';
    }
  }

  public getProduct(page, limit) {
    this.productService.getProducts(page, limit).then((res) => {
      this.allproductes = res;
      console.log(this.allproductes)
      this.seleproductes = this.allproductes;
      console.log(this.seleproductes);
      this.filterProducts(this.TONE, this.BRAND, this.STYLENAME, this.TYPENAME);
    });
  }
  // public toggleState() {
  //   this.scerenList.state = (this.scerenList.state === 'active' ? 'inactive' : 'active');
  // }
  // public backleft() {
  //   this.scerenList.state = (this.scerenList.state === 'active' ? 'inactive' : 'inactive');
  // }
  // public showAll() {
  //   this.seleproductes = this.allproductes;
  //   this.STYLENAME = null;
  //   this.TYPENAME = null;
  //   this.BRAND = null;
  //   this.TONE = null;
  // }
  public filterProducts(tone?: string, brand?: string, type?: string, price?: Price, sort?: number) {
    this.seleproductes = this.allproductes;
    if (tone) {
      this.seleproductes = this.seleproductes.filter((res) => {
        this.ccColor = res;
        if ( this.ccColor.color !== null) {
          return this.ccColor.color.indexOf(tone) >= 0;
        }
      });
    }
    if (brand) {
      if (brand === '比利时') {
        this.seleproductes = this.seleproductes.filter((product) => product.brand === '比利时Lalegno');
      }else if (brand === '新加坡') {
        this.seleproductes = this.seleproductes.filter((product) => product.brand === '新加坡Greenply');
      }else if (brand === '圣保罗')  {
        this.seleproductes = this.seleproductes.filter((product) => product.brand === '圣保罗地板');
      }
    }
    if (type) {
      if ('强化复合' === type) {
        this.seleproductes = this.seleproductes.filter((product) => {
          if (product.type !== null) {
            return product.type === 'LaminateFlooring';
          }
        });
      } else if ('三层实木' === type) {
        this.seleproductes = this.seleproductes.filter((product) => {
          if (product.type !== null) {
            return product.type === 'EngineeredFlooring';
          }
        });
      }else {
        this.seleproductes = this.seleproductes.filter((product) => {
          if (product.type !== null) {
            return product.type === 'SolidwoodFlooring';
          }
        });
      }
    }
    if (price) {
      this.scren.price = price;
      this.priceBackground = price;
      this.seleproductes = this.seleproductes.filter((product) => product.label_price >= price.min);
      this.seleproductes = this.seleproductes.filter((product) => product.label_price < price.max);
    }
    if (sort) {
      if ( sort === 1 ) {
        this.seleproductes.sort(this.compareSamll);
        this.scren.sort = 2;
      }
      if ( sort === 2) {
        this.seleproductes.sort(this.compareLarge);
        this.scren.sort = 1;
      }
    }
  }
  gotoProductDetail(event, res) {
    if (this.scerenList.state === 'inactive') {
      this.collectMsg(event, this.sendType);
      this.recommendMessage.product = res;
      this.productService.sendMessage(this.recommendMessage);
      this.router.navigate(['/product/' + res.id]);
    } else {
      this.scerenList.state = 'inactive';
    }
  }
  like(res) {
    if (res.target.src.toString().indexOf('heart_not-click') >= 0) {
      res.target.src = res.target.src.toString().replace('heart_not-click', 'heart_click');
    }else {
      res.target.src = res.target.src.toString().replace('heart_click', 'heart_not-click');
    }
  }

  collectMsg(e, type) {
    this.recommendMessage = this.collectmsgservice.collectMsg(e, type);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

//  切换侧边栏
  kindToggle (e, list) {
    const id = e.currentTarget.id;
    for (let i = 0, len = list.length; i < len; ++i ) {
      if (list[i].id === id) {
          list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
  }
// 过滤产品
  filterPro(item) {
    if ( item.open === true ) {
      this.filterWord[item.belong] = item.name;
    } else {
      this.filterWord[item.belong] = '';
    }
    // tone?: string, brand?: string, type?: string,
    this.filterProducts(this.filterWord.color , this.filterWord.brand, this.filterWord.type );
    console.log(this.filterWord);
  }

//  搜索产品
  searchPro(e) {
     this.searchWord = e.target.value;
     if (this.searchWord === '') {
       this.searching = 'in';
       this.seleproductes = this.allproductes;
     }else {
       this.searching = 'out';
       this.seleproductes = this.allproductes.filter( (pro) =>  pro.name.indexOf(this.searchWord) !== -1 );
     }
  }

}
