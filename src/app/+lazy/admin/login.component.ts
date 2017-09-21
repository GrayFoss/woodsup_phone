/**
 * Created by joe on 2017/9/20.
 */
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/User.service';
import { Location } from '@angular/common';
import { sha1 } from '../../shared/utils/sha1';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public reg = /^1[0-9]{10}/;
  public logWay = ['手机验证', '账号密码'];
  public selectWay = '手机验证';
  public winWidth: number;
  public winHeight: number;
  public Phone;
  public yanzhengma;
  public prompting;
  public accoutPhone;
  public accoutPassword;
  constructor(
    public userservice: UserService,
    public location: Location,
    public sha1: sha1
  ) {
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.winWidth = window.innerWidth;
      this.winHeight = window.innerHeight;
    }
  }
  seleway(res) {
    this.selectWay = res;
  }
  /**
   * 返回上一级页面
   * @method back
   */
  back() {
    this.location.back();
  }
  /**
   * 手机号登录,成功返回上一层页面
   * @methed phoneLogin
   * @param {string} Phone 手机号
   * @param {string} yanzhengma 验证码
   */
  phoneLogin(Phone, yanzhengma) {
    if (!this.reg.test(this.Phone)) {
      this.prompting = '请输入正确的手机号';
      this.setTimer();
      return false;
    }
    this.userservice.phoneLogin(Phone, yanzhengma).then((res) => {
      if (res.status.error === 0) {
        this.location.back();
      }else {
        this.prompting = res.status.message;
        this.setTimer();
      }
    });
  }
  /**
   * 账号密码登录
   * @method accoutLogin
   * @param {string} accoutPhone 用户账号
   * @param {string} accoutPassword 用户密码
   */
  accoutLogin(accoutPhone, accoutPassword) {
    if (!this.reg.test(this.accoutPhone)) {
      this.prompting = '请输入正确的手机号';
      this.setTimer();
      return false;
    }
    this.userservice.login(accoutPhone, this.sha1.Sha1(accoutPassword), false).then((res) => {
      if (res.status.error === 0) {
        this.location.back();
      } else {
        this.prompting = res.status.message;
        this.setTimer();
      }
    });
  }
  setTimer() {
    setTimeout(() => {
      this.prompting = false;
    }, 1000);
  }
  confirm(x) {
    if (!x) {
      this.prompting = '请输入正确的手机号';
      this.setTimer();
    }
  }
}
