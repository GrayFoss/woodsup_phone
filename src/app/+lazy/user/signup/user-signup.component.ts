
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/User.service';


@Component({
  selector: 'user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss']
})
export class UserSignupComponent implements OnInit {
  public reg = /^1[0-9]{10}/;
  public exist: string;
  public username: string;
  public password: string;
  public cpassword: string;
  public displayname: string;
  public smsVerifyCode: string;
  constructor(
    public userservice: UserService,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
    }
  }
  doSignup() {
    if (!this.reg.test(this.username)) {
      this.exist = '请输入正确的手机号';
      return false;
    }
    if (this.displayname === undefined) {
      this.exist = '请输入昵称';
      return false;
    }
    if (this.password === undefined) {
      this.exist = '请输入密码';
      return false;
    }else if (this.password.length <= 6){
      this.exist = '密码最少6位数';
      return false;
    }
    if (this.password !== this.cpassword) {
      this.exist = '两次输入的密码不一致';
      return false;
    }
    this.userservice.signup(this.username, this.displayname, this.password, this.smsVerifyCode).then((res) => {
      if (res.status.error === 0) {
        this.exist = '注册成功';
      } else  {
        this.exist = res.status.message;
      }
    });
  }
  /**
   * 清除注册失败显示的错误信息
   * @method clean
   */
  clean() {
    this.exist = '';
  }
  /**
   * 用于接收输入的手机号是不是正确
   * @method confirm
   */
  confirm(x) {
    if (!x) {
      this.exist = '请输入正确的手机号';
    }
  }
}
