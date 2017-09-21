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

@Component({
  selector: 'product-index',
  templateUrl: './product-index.component.html',
  styleUrls: ['./product-index.component.scss'],
  animations: [
    trigger('filterState', [
      state('inactive', style({
        transform: 'translateX(0%)',
        // width: '100%'
      })),
      state('active',   style({
        transform: 'translateX(50%)',
        // width: '50%'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-in'))
    ]),
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
  public typeA;
  public priceBackground: Price;
  public recommendMessage: Apply = new Apply();
  public sendType = 'Normal';
  subscription: Subscription;
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
  ngAfterViewInit(): void {
  }
  public getProduct(page, limit) {
    this.productService.getProducts(page, limit).then((res) => {
      this.allproductes = res;
      this.seleproductes = this.allproductes;
      this.filterProducts(this.TONE, this.BRAND, this.STYLENAME, this.TYPENAME);
    });
  }
  public toggleState() {
    this.scerenList.state = (this.scerenList.state === 'active' ? 'inactive' : 'active');
  }
  public backleft() {
    this.scerenList.state = (this.scerenList.state === 'active' ? 'inactive' : 'inactive');
  };
  public showAll() {
    this.seleproductes = this.allproductes;
    this.STYLENAME = null;
    this.TYPENAME = null;
    this.BRAND = null;
    this.TONE = null;
  }
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
      }else {
        this.seleproductes = this.seleproductes.filter((product) => product.brand === brand);
      }
    }
    if (type) {
      if ('强化复合' === type) {
        this.seleproductes = this.seleproductes.filter((product) => {
          this.typeA = product;
          if (this.typeA.type !== null) {
            return this.typeA.type === 'LaminateFlooring';
          }
        });
      } else if ('三层实木' === type) {
        this.seleproductes = this.seleproductes.filter((product) => {
          this.typeA = product;
          if (this.typeA.type !== null) {
            return this.typeA.type === 'EngineeredFlooring';
          }
        });
      }else {
        this.seleproductes = this.seleproductes.filter((product) => {
          this.typeA = product;
          if (this.typeA.type !== null) {
            return this.typeA.type === 'SolidwoodFlooring';
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
}
