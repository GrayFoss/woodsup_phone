import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../core/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public reg = /^1[0-9]{10}/;
  public winHeight: number;
  public winWidth: number;
  public prompting;
  public cpassword: any;
  public password: any;
  public Phone;
  public username;
  public smsVerifyCode;
  constructor(
    public location: Location,
    public userservice: UsersService,
    public router: Router
  ) { }
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.winWidth = window.innerWidth;
      this.winHeight = window.innerHeight;
    }
  }
  confirm(x) {
    if (!x) {
      this.prompting = '请输入正确的手机号';
      this.setTimer();
    }
  }
  setTimer() {
    setTimeout(() => {
      this.prompting = false;
    }, 1000);
  }
  /**
   * 返回上一级页面
   * @method back
   */
  back() {
    this.location.back();
  }
  /**
   * 注册
   * @method doRegister
   * @param {string} username 用户名
   * @param {string} Phone 手机号
   * @param {string} password 密码
   * @param {string} smsVerifyCode 验证码
   */
  doRegister(username, Phone, password, smsVerifyCode) {
    if (this.username === undefined) {
      this.prompting = '请输入账号';
      this.setTimer();
      return false;
    }
    if (this.password === undefined) {
      this.prompting = '请输入密码';
      this.setTimer();
      return false;
    }else if (this.password.length <= 6) {
      this.prompting = '密码最少6位数';
      this.setTimer();
      return false;
    }
    if (this.password !== this.cpassword) {
      this.prompting = '两次输入的密码不一致';
      this.setTimer();
      return false;
    }
    if (!this.reg.test(this.Phone)) {
      this.prompting = '请输入正确的手机号';
      this.setTimer();
      return false;
    }
    this.userservice.register(username, Phone, password, smsVerifyCode).then((res) => {
      if (res.status.error === 0) {
        this.prompting = '注册成功';
      } else  {
        this.prompting = res.status.message;
      }
    });
  }
}
