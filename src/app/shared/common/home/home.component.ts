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
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [DesktopScenesService]
  }
)

export class  HomeComponent implements OnInit {
  public like = false;
  public likeImg: string;
  public likeCount = 0;
  public sceneInfo: any;
  // 计时
  public endTime: any;
  public strEnd: string;
  public referrer: string;
  public recommendMessage: Apply = new Apply();
  public sceneAbout = {
    '欧式' : '追求简练、明快、浪漫、单纯和抽象的欧式风格。',
    '图兰朵' : '简练、明快、浪漫、单纯和抽象的欧式风格。',
    '诺亚' : '明快、浪漫、单纯和抽象的欧式风格。',
    '簪缨世家' : '浪漫、单纯和抽象的欧式风格。',
    '欢乐颂' : '单纯和抽象的欧式风格。'
  };
  public title = [ '根据兴趣推荐', '猜你喜欢', '看官请留步', '万里挑一' ];
  public portrait = [ 'assets/img/main/por1.jpg', 'assets/img/main/por1.jpg'
  , 'assets/img/main/por2.jpg', 'assets/img/main/por3.jpg'];
  @Input('sceneID') sceneID: any;
  constructor(
    private sceneService: DesktopScenesService,
    private collectmsgservice: CollectMsgService,
    private router: Router,
    public allProduct: ProductService) {
    const randomNum = Math.floor( Math.random() * this.title.length );
    this.sceneInfo = {
      headerPortrait: this.portrait[randomNum],
      recommendTitle: this.title[randomNum] ,
      recommendTag: 'assets/img/main/tag_recommend.png',
      recommendTagShow: true,
      recomendType: '欧式',
      recommendSummary: '追求简练、明快、浪漫、单纯和抽象的欧式风格',
      sceneImg: '../assets/img/carousel/tulanduo.jpg',
      // http://wecareroom.com/upload/experience/cover/%E7%B0%AA%E7%BC%A8%E4%B8%96%E5%AE%B6/scene1.png;
      sceneName: '图兰朵',
      products: [
      {
        productImg: 'http://image.wecareroom.com/upload/product_t/YP9210.png',
        // http://dashboard.forwoodsup.cn/upload/product_list/XL8042.png
        productName: '黄金罗盘',
        productPrice: '999'
      },
      {
        productImg: 'http://image.wecareroom.com/upload/product_t/VFL-P035.png',
        productName: '美国胡桃木KS1194',
        productPrice: '332'
      },
      {
        productImg: 'http://image.wecareroom.com/upload/product_t/VFL-P046.png',
        productName: '梣木橄榄',
        productPrice: '291'
      },
      {
        productImg: 'http://image.wecareroom.com/upload/product_t/VFL-P046.png'
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
        res = res.map( (res) => {
          return {
            product: res,
            productID: res.id,
            productCode: res.code,
            productName: res.name,
            productPrice: res.orgin_price,
            productImg: 'http://image.wecareroom.com/upload/product_t/' + res.code + '.png'
          };
        });
        this.sceneInfo.products = res;
        this.sceneInfo.products = this.sceneInfo.products.filter( (pro) => pro.productName !== null && pro.productPrice !== null && pro.productCode !== null );
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
    this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
    this.router.navigate(['/product/', id]);
    document.body.scrollTop = 0;
  }
  goSceneDetail(e) {
    this.collectMsg(e);
    this.recommendMessage.product = null;
    this.recommendMessage.panoSceneRecord = this.sceneInfo.scene;
    this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
  }

  collectMsg(e) {
    const type = 'Recommend';
    this.recommendMessage = this.collectmsgservice.collectMsg(e, type);
  }

  goProducts(e) {
    this.collectMsg(e);
    this.recommendMessage.panoSceneRecord = this.sceneInfo.scene;
    this.allProduct.sendMessage(this.recommendMessage).then( (res) => { console.log(res); } );
    this.router.navigate(['/product']);
  }

  handleError( error: any ): Promise<any> {
    console.error('An error occurred!', error);
    return Promise.reject(error.message || error);
  }
}
