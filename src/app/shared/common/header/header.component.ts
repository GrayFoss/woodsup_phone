import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import { CookieUtil } from '../../utils/cookie/CookieUtil';
import { UserService } from '../../services/User.service';
import { User } from '../../utils/models/User';
import {state, style, trigger, transition, animate} from '@angular/animations';
declare const QC: any;

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('humState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})

export class HeaderComponent implements OnInit {
  public currentUser: User = new User();
  public aaa: number;
  public cookie = CookieUtil;
  public win_hei;
  public win_wid;
  public haveBarCode: boolean = false;
  public haveMengban: boolean = false;
  constructor(
    public userservice: UserService,
    public renderer: Renderer2
  ) {}
  ngOnInit(): void {
    if ( typeof window !== 'undefined') {
      this.win_hei = window.innerHeight;
      this.win_wid = window.innerWidth;
    }
    this.getLoginStatus();
  }
  /**
   * 显示右边菜单栏
   * @method toggleState
   */
  toggleState() {
    this.aaa = (this.aaa === 1 ? 0 : 1);
  }
  /**
   * 退出登录
   * @method logout
   */
  logout() {
    this.userservice.doLogout();
    this.currentUser = null;
  }
  /**
   * 获取登录信息
   * @method logout
   */
  getLoginStatus() {
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
      }
    });
  }
  showMengban() {
    this.haveBarCode = true;
    this.haveMengban = true;
  }
  hideMengban() {
    this.haveBarCode = false;
    this.haveMengban = false;
  }
}
