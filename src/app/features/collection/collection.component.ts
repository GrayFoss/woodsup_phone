import { Component, OnDestroy, OnInit } from '@angular/core';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {PhoneDataService} from '../../services/data.service';


@Component({
  selector: 'tamu-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [
    trigger('show2hidden', [
      transition('void => *', [
        animate(300, keyframes([
          style({opacity: 0, offset: 0}),
          style({opacity: 0.7, offset: 0.7}),
          style({opacity: 1, offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(300, keyframes([
          style({opacity: 1, offset: 0}),
          style({opacity: 0.8, offset: 0.5}),
          style({opacity: 0, offset: 1.0})
        ]))
      ])
    ]),
  ]
})

export class CollectionComponent implements OnDestroy, OnInit {

  public showRoom: boolean = false;
  public showStyle: boolean = false;
  private collectionList = [];
  public page = 1;
  private limit: number = 6;
  public roomList = [
    {name: '全部', value: ''}, {name: '客厅', value: 'livingroom'},
    {name: '卧室', value: 'bedroom'}, {name: '餐厅', value: 'canteen'},
    {name: '书房', value: 'studyroom'}, {name: '儿童房', value: '洗手间'}
  ];
  public styleList = [
    {name: '全部', value: ''}, {name: '北欧', value: '北欧'},
    {name: '欧式', value: '欧式'}, {name: '现代', value: '现代'},
    {name: '美式', value: '美式'}, {name: '新中式', value: '新中式'},
    {name: '新古典', value: '新古典'}, {name: '混搭', value: '混搭'},
    {name: '日式', value: '日式'}
  ];
  private currentRoom = {name: '全部', value: ''};
  private currentStyle = {name: '全部', value: ''};

  constructor(
    private dataService: PhoneDataService,
  ) {
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    let page = this.page;
    let limit = this.limit;
    let type = 'stpaul_Flooring_Collection';
    let tone = this.currentStyle.value;
    let position = this.currentRoom.value;
    let data: FetchObj = {page, limit, type};
    if (tone) {
      data.tone = tone;
    }
    if (position) {
      data.position = position;
    }
    console.log(data)
    this.dataService.listCollectionByUser(data).then(res => {
      if (res.status.error === 0) {
        res.result.forEach(c => {
          let item = c.collectionProducts.find(cp => cp.objName === 'fbottom');
          c.fbottomCode = item ? item.product.code : '';
        });
        if (page === 1) {
          this.collectionList = res.result;
        } else {
          this.collectionList = this.collectionList.concat(res.result);
        }
      }
    }).catch(err => {
      console.error(err)
    });
  }

  onScroll() {
    if ((this.page * this.limit) > this.collectionList.length) return;
    this.page++;
    this.fetchData();
  }

  selectRoom(room) {
    this.currentRoom = room;
    this.page = 1;
    this.fetchData();
  }
  selectStyle(style) {
    this.currentStyle = style;
    this.page = 1;
    this.fetchData();
  }
  back() {
    window.history.back();
  }
  toggleRoom(e) {
    this.showStyle = false;
    this.showRoom = !this.showRoom;
    this.prevent(e);
  }
  toggleStyle(e) {
    this.showRoom = false;
    this.showStyle = !this.showStyle;
    this.prevent(e);
  }

  ngOnDestroy() {
  }
  prevent(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  byPropagation() {
    this.showRoom = false;
    this.showStyle = false;
  }
}

export interface FetchObj {
  page: number;
  limit: number;
  type: string;
  tone?: string;
  position?: string;
}
