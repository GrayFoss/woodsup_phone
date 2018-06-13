import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from '../reducers';
import { Store } from '@ngrx/store';

import {
  SwiperConfigInterface,
  SwiperCoverflowEffectInterface,
} from 'ngx-swiper-wrapper';
import {PhoneDataService} from '../services/data.service';
import {collectionIds, snapshotIds} from './all.data';


// 3D 切换效果参数设置
const coverflowEffectConfig: SwiperCoverflowEffectInterface = {
  rotate: 0,
  stretch: 200,
  depth: 200,
  modifier: 1,
  slideShadows: false
};

@Component({
  selector: 'tamu-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnDestroy, OnInit {
  config: SwiperConfigInterface;
  private collectionList: any[] = [];
  private snapshotList: any[] = [];

  constructor(
    private store: Store<AppState>,
    private dataService: PhoneDataService,
  ) {
  }

  ngOnInit() {
    this.config = {
      direction: 'horizontal',
      // 开启鼠标的抓手状态
      grabCursor: false,
      // 被选中的滑块居中，默认居左
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      // loopedSlides: 8,
      autoplay: true,
      speed: 2000,
      // 切换效果为 coverflow
      // effect: 'coverflow',
      // coverflow 配置
      coverflowEffect: coverflowEffectConfig,
      // 前进后退按钮设置
      // navigation: navigationConfig,
      pagination: {
        el: '.swiper-pagination',
      },
    };
    this.getCollectionByIdList(collectionIds.slice(0, 6));
    this.getSnapshotByIdList(snapshotIds.slice(0, 6));
  }

  getCollectionByIdList(list) {
    list.forEach(id => {
      this.dataService.getCollectionById(id).then(res => {
        if (res.status.error === 0) {
          console.log(typeof this.collectionList)
          this.collectionList.push(res.result);
        }
      })
    });
  }
  getSnapshotByIdList(list) {
    list.forEach(id => {
      this.dataService.getCollectionById(id).then(res => {
        if (res.status.error === 0) {
          let snap = res.result;
          snap.name = `[${snap.panoScene.tone} - ${this.judgePos(snap.panoScene.position)}]  ${snap.panoScene.name}`;
          console.log(snap.panoScene.position);
          this.snapshotList.push(res.result);

        }
      })
    });
  }
  judgePos(eng) {
    let name;
    switch (eng) {
      case 'kitchen':
        name = '厨房'
        break;
      case 'bedroom':
        name = '卧室'
        break;
      case 'livingroom':
        name = '客厅'
        break;
      case 'studyroom':
        name = '书房'
        break;
      default:
        name = '其他';
        break;
    }
    return name;
  }
  onScroll() {
    console.log('asdssssssssssssssssssssssssssss')
  }
  ngOnDestroy() {
  }
}
