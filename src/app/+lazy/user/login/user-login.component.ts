import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CookieUtil } from '../../../shared/utils/cookie/CookieUtil';
import { User } from '../../../shared/utils/models/User';
import { UserService } from '../../../shared/services/User.service';
import { sha1 } from '../../../shared/utils/sha1';

declare const QC: any;
declare const WB2: any;

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  public reg = /^1[0-9]{10}/;
  // store the URL so we can redirect after logging in
  public redirectUrl: string;
  public loginError: string;
  public cookie = CookieUtil;
  public user: User = new User();
  public phone: boolean = true;
  constructor(
    public userservice: UserService,
    public location: Location,
    public router: Router,
    public sha1: sha1) {
  }
  gotoSignup() {
    this.router.navigate(['/user/signup']);
  }
  /**
   * 账号密码登陆,成功则返回上一页，失败显示登录错误
   * @methed doLogin
   */
  doLogin() {
    if (!this.reg.test(this.user.phone)) {
      this.loginError = '请输入正确的手机号';
      return false;
    }
    this.userservice.login(this.user.phone, this.sha1.Sha1(this.user.password), false).then((res) => {
      if (res.status.error === 0) {
        this.location.back();
      } else {
        this.loginError = res.status.message;
      }
    });
  }
  /**
   * 用户手机号登录,未注册的话跳转到注册页面，成功返回上一层页面
   * @methed phoneLogin
   * @param {string} phone 手机号
   * @param {string} smsVerifyCode 验证码
   */
  phoneLogin(phone, smsVerifyCode) {
    if (!this.reg.test(phone)) {
      this.loginError = '请输入正确的手机号';
      return false;
    }
    this.userservice.phoneLogin(phone, smsVerifyCode).then((res) => {
      if (res.status.error === 0) {
        this.location.back();
      }else {
        this.loginError = res.status.message;
      }
    });
  }
  /**
   * 当用户输入账号或密码，将错误提示隐藏
   * @methed lose
   */
  lose() {
    this.loginError = '';
  }
  ngOnInit(): void {
    this.getLoginStatus();
  }
  confirm(x) {
    if (!x) {
      this.loginError = '请输入正确的手机号';
    }
  }
  getLoginStatus() {
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.router.navigate(['/']);
      } else {
      }
    });
  }
  /**
   * QQ登录
   * @methed qqLogin
   */
  qqLogin() {
    if (typeof (QC) !== 'undefined') {
      QC.Login({
        // 插入按钮的节点id
        btnId: 'qqLoginBtn',
        // 按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
        size: 'B_M'
      });
    }
  }
  /**
   * 微博登录
   * @methed weiboLogin
   */
  weiboLogin() {
    if (typeof (WB2) !== 'undefined') {
      WB2.anyWhere(function (W) {
        W.widget.connectButton({
          id: 'wb_connect_btn',
          type: '4,5',
          callback: {
            login: function (o) {
              // 登录后的回调函数
              this.location.back();
              console.log('login: ' + o.screen_name);
              console.log(12);
            },
            logout: function () {
              // 退出后的回调函数
              console.log('logout');
            }
          }
        });
      });
    }
  }
  bbb() {
    if (typeof (WB2) !== 'undefined') {
      WB2.login(function() {
        console.log(453);
      });
    }
  }
}
