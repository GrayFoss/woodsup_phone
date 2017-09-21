import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuriedSerivce } from './core/buried.service';
import { Apply } from './shared/utils/models/Apply';

@Component({
  selector: 'my-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  public date;
  public id: any;
  public recommendMessage: Apply = new Apply();
  constructor(
    private buriedService: BuriedSerivce,
    public route: ActivatedRoute,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // document.addEventListener('click', this.aa, false);
    }
  }
  buriedPoint(e) {
    this.date = new Date();
    let nodeAll = e.path.reverse().splice(5);
    nodeAll = nodeAll.reverse().slice(0, 3);
    let type = '';
    for (let x = 0; x < nodeAll.length; x++) {
      let nodeName = nodeAll[x].nodeName.toLocaleLowerCase();
      if (nodeAll[x].className.toLocaleLowerCase() !== '') {
        nodeName += `.${nodeAll[x].className.toLocaleLowerCase()}`;
      }
      if ( nodeAll[x].id.toLocaleLowerCase() !== '') {
        nodeName += `#${nodeAll[x].id.toLocaleLowerCase()}`;
      }
      type += `/${nodeName}`;
    }
    // 当前页面的路径
    this.recommendMessage.urlPath = this.router.url;
    // 收集点击的标签名, 格式为tagName + '.ClassName' + '#IDName', 向父级冒泡3个div
    this.recommendMessage.target = type;
    // 点击的时间
    this.recommendMessage.endTime = this.date.getTime();
    // 分类
    this.recommendMessage.type = 'mobile';
    this.buriedService.sendMessage(this.recommendMessage).then((response) => {
    })
  }
  @HostListener('touchstart') bb($event) {
    this.buriedPoint(event)
  }
}
