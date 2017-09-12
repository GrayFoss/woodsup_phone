import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/utils/models/User';
import { UserService } from '../../../shared/services/User.service';

@Component({
  selector: 'user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  public currentUser = new User();
  public winHeight: number;
  constructor(
    public userservice: UserService,
    public router: Router
  ) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.winHeight = window.innerHeight;
    }
  }
  /**
   * 退出登录
   * @method logout
   */
  logout() {
    this.userservice.doLogout();
    this.router.navigate(['/']);
  }
  getLoginStatus() {
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
      } else {
        this.router.navigate(['user/login']);
      }
    });
  }
}
