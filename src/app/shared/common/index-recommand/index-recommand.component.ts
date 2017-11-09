/**
 * Created by Administrator on 2017/6/28.
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecommendMessage } from '../../utils/models/recommendMessage';
import { ProductService } from '../../services/products/product.service';
import { DesktopScenesService } from '../../services/desktop.scenes.service';
import { Apply } from '../../utils/models/Apply';
import {CollectMsgService} from "../../services/CollectMsg.service";

@Component( {
    selector: 'index-recommand',
    templateUrl: './index-recommand.component.html',
    styleUrls: ['./index-recommand.component.scss'],
    providers: [DesktopScenesService]
  }
)

export class IndexRecommandComponent implements OnInit {
  public like = false;
  public likeImg: string;
  public likeCount = 0;
  public sceneInfo: any;
  // 计时
  public endTime: any;
  public strEnd: string;
  public referrer: string;
  public recommendMessage: Apply = new Apply();
  @Input('sceneID') sceneID: any;
  public normalScene = [
    {
      // 现代.欢乐颂
     imgSrc: 'assets/img/mall/recommend_scene/6.png'
    },
    {
      // 北欧.诺亚
      imgSrc: 'assets/img/mall/recommend_scene/5.png'
    },
    {
      // 新中式.簪缨世家
      imgSrc: 'assets/img/mall/recommend_scene/3.png'
    },
    {
      // 美式.汉普顿夏日
      imgSrc: 'assets/img/mall/recommend_scene/7.png'
    },
    {
      // 美式_洛克菲勒
      imgSrc: 'assets/img/mall/recommend_scene/8.png'
    },
    {
      // 纸牌屋
      imgSrc: 'assets/img/mall/recommend_scene/4.png'
    }
  ]
  public showProducts: any;
  public initProducts: any;
  public isShowMore: boolean = false;
  constructor(
    private sceneService: DesktopScenesService,
    private collectmsgservice: CollectMsgService,
    private router: Router,
    public allProduct: ProductService) {
    this.sceneInfo = {
      recommendTagShow: true,
      recomendType: '',
      recommendSummary: '',
      sceneImg: '',
      // http://wecareroom.com/upload/experience/cover/%E7%B0%AA%E7%BC%A8%E4%B8%96%E5%AE%B6/scene1.png;
      sceneName: '',
      products: [
      {
        productImg: '',
        // http://dashboard.forwoodsup.cn/upload/product_list/XL8042.png
        productName: '',
        productPrice: ''
      }
    ]
    };
  }

  ngOnInit() {
    // 来源地址
    if (typeof window !== 'undefined') {
      this.referrer = decodeURI(document.referrer);
    }
    this.likeImg = 'assets/img/main/heart_not_click.png';
    // 获取场景
    this.sceneService.getSceneByID(this.sceneID).then(
      ( res ) => {
        this.sceneInfo.recomendType = res.tone;
        this.sceneInfo.sceneName = res.name;
        // this.sceneInfo.recommendSummary = this.sceneAbout[ '' + res.name];
        this.sceneInfo.recommendSummary = res.description;
        this.sceneInfo.sceneImg = 'http://image.wecareroom.com/upload/experience/cover/' + res.name + '/scene1.png';
        this.sceneInfo.scene = res;
     }
   );
   // 获取场景下的产品
    this.sceneService.listProductOfPanoScene(this.sceneID).then(
      ( res ) => {
        res = res.map( ( res ) => {
          return {
            product: res,
            productID: res.id,
            productCode: res.code,
            productName: res.name,
            productPrice: res.orgin_price,
            productImg: 'http://image.wecareroom.com/upload/product_t/256-8/' + res.code + '.png'
          };
        });
        this.sceneInfo.products = res;
        this.sceneInfo.products = this.sceneInfo.products.filter( (pro) => pro.productName !== null && pro.productPrice !== null && pro.productCode !== null );
        this.initProducts = [ this.sceneInfo.products[0], ...this.sceneInfo.products[1], ...this.sceneInfo.products[2]] ;
        this.showProducts = this.initProducts;
      }
    );
  }

  // 收藏功能
  clickLike() {
    this.like = !this.like;
    if ( this.like === true ) {
      this.likeImg = 'assets/img/main/heart_clicked.png';
      this.likeCount++;
    } else {
      this.likeImg = 'assets/img/main/heart_not_click.png';
      this.likeCount = 0;
    }
    console.log(this.likeCount);
  }
  goProductDetail(e, product) {
    const id = product.product.id;
    this.recommendMessage.product = product.product;
    this.collectMsg(e);
    this.recommendMessage.panoSceneRecord = this.sceneInfo.scene;
    // this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
    this.router.navigate(['/product/', id, this.sceneID]);
    document.body.scrollTop = 0;
  }
  goSceneDetail(e) {
    this.collectMsg(e);
    this.recommendMessage.product = null;
    this.recommendMessage.panoSceneRecord = this.sceneInfo.scene;
    // this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
    console.log(this.recommendMessage);
  }

  collectMsg(e) {
    const type = 'Mobile';
    this.recommendMessage = this.collectmsgservice.collectMsg(e, type);
  }
  //
  // goProducts(e) {
  //   this.collectMsg(e);
  //   this.recommendMessage.panoSceneRecord = this.sceneInfo.scene;
    // this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
  //   this.router.navigate(['/product']);
  // }

  showMore() {
    this.showProducts = this.sceneInfo.products;
    this.isShowMore = ! this.isShowMore ;
  }
  closeMore() {
    this.showProducts = this.initProducts;
    this.isShowMore = ! this.isShowMore ;
  }

  handleError( error: any ): Promise<any> {
    console.error('An error occurred!', error);
    return Promise.reject(error.message || error);
  }
}
