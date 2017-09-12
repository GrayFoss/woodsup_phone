/**
 * Created by Joe on 2017/1/11.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/User.service';

@Component({
  selector: 'collection-orders',
  template: `
<header *ngIf="currentUser">
  <!--<img src="./assets/img/3d/exit1.png" alt="" (click)="goBack()">-->
  <h3>{{currentUser.displayname}}</h3>
  <h4>{{currentUser.state}}&nbsp;&nbsp;&nbsp;{{currentUser.city}}</h4>
</header>`,
  styles: [`
header {
  height: 2.66667rem;
  padding: 0.77333rem 0 0;
  position: relative;
  background-image: url("./assets/img/personal/collection.png");
  background-size: 100%; }
header img {
  margin-top: 0.18667rem;
  position: absolute;
  width: 0.53333rem;
  height: 0.4rem;
  margin-left: 0.4rem; }
header h3 {
  font-size: 24px;
  color: #fff;
  text-align: center; }
header h4 {
  margin-top: 0.24rem;
  font-size: 18px;
  color: #fff;
  text-align: center; }`],
})
export class CollectionOrderComponent implements OnInit {
  public currentUser;
  constructor(
    private router: Router,
    public userservice: UserService,
  ) {}
  ngOnInit(): void {
    this.userservice.getLoginStatus().then((res) => {
      if (res.status.error === 0) {
        this.currentUser = res.result;
      }else {
        this.router.navigate(['/']);
      }
    });
  }
}
