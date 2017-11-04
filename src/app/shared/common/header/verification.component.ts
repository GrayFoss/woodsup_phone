/**
 * Created by joe on 2017/9/21.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { User } from '../../utils/models/User';
import { UserService } from '../../services/User.service';

@Component({
  selector: 'phone-verification',
  template: `
    <div (click)="countDown()" class="phone" id="fasong">
      <p >{{message}}{{send}}</p>
    </div>
  `,
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  public reg = /^1[0-9]{10}/;
  @Input() public phone;
  public intervalId = 0;
  public Inseconds = 60;
  public seconds;
  public send = '发送验证码';
  public message;
  public currentUser: User;
  @Output() confirm = new EventEmitter<boolean>();
  constructor(public userservice: UserService) {
  }
  setSeconds() {
    this.seconds = this.Inseconds;
  }
  countDown(): void {
    console.log(this.phone)
    if (!this.reg.test(this.phone)) {
      this.confirm.emit(false);
    }
    if (this.phone !== null && this.reg.test(this.phone)) {
      if (this.seconds === this.Inseconds ) {
        this.smsVerify();
        this.send =  '';
        this.message = this.Inseconds;
        this.intervalId = window.setInterval(() => {
          this.seconds -= 1;
          if (this.seconds > 0) {
            this.message = this.seconds;
          }
          if (this.seconds <= 0) {
            this.message = '';
            this.send = '重发验证码';
            clearInterval(this.intervalId);
            this.seconds = this.Inseconds;
          }
        }, 1000);
      }
    }else {
    }
  }
  smsVerify() {
    if (this.phone !== null) {
      this.userservice.smsVerify(this.phone);
    }
  }
  ngOnInit() {
    this.setSeconds();
  }
}
