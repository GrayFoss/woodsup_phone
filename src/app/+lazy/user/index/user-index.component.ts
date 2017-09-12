import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/utils/models/User';
import { UserService } from '../../../shared/services/User.service';

@Component({
  selector: 'user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {
  public currentUser = new User();
  public prompt: boolean = false;
  constructor(
    public userservice: UserService,
    public router: Router) {
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
     this.userservice.getLoginStatus().then((res) => {
       if (res.status.error === 0) {
         this.currentUser = res.result;
       }else {
         this.router.navigate(['user/login']);
       }
     });
    }
  }
  /**
   * 暂时屏蔽收藏功能
   * @method showPrompt
   */
  showPrompt() {
    if (this.prompt === false) {
      this.prompt = true;
      setTimeout(() => {
        this.prompt = false;
      }, 1000);
    }
  }
}
