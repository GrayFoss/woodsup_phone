import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ADDRESS } from '../../../shared/utils/data/address-mock';
import { UserService } from '../../../shared/services/User.service';
import { User } from '../../../shared/utils/models/User';

@Component({
  selector: 'order-address',
  templateUrl: './order-address.component.html',
  styleUrls: ['./order-address.component.scss'],
})
export class OrderNewAddressComponent implements OnInit, AfterContentChecked {
  public prompting: string;
  public quantity: number;
  public productId: number;
  public win_he: number;
  public order = 'address';
  public addresses = ADDRESS;
  public province: string;
  public city: string;
  public area: string;
  public areas= [];
  public cities= [];
  public currentUser: User = new User();
  public _phone: string;
  public lt: boolean;
  public smsSend: boolean = true;
   constructor(
     public location: Location,
     public userservice: UserService,
     public router: Router,
     private route: ActivatedRoute
   ) { }
  ngAfterContentChecked() {
    this.selectProvince();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = +params['productId'];
      this.quantity = +params['quantity'];
    });
    if (typeof window !== 'undefined') {
      this.win_he = window.innerHeight;
      this.userservice.getLoginStatus().then((res) => {
        if (res.status.error === 0) {
          this.currentUser = res.result;
        }
      });
      this._phone = this.currentUser.phone;
    }
  }
  selectProvince() {
    for (let i = 0; i < this.addresses.length; i++) {
      if (this.addresses[i].name === this.currentUser.state) {
        this.cities = this.addresses[i].cityList;
      }
    }
    this.areas = [];
  }
  selectCity() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === this.city) {
        this.areas = this.cities[i].areaList;
        break;
      }
    }
  }
  selectle() {
    this.lt = !this.lt;
  }
  addAddressToUser() {
      if (!this.currentUser.state || !this.currentUser.city || !this.currentUser.street) {
        return this.prompting = '请输入正确的地址';
      }
      if (!this.currentUser.displayname || !this.currentUser.phone) {
        return this.prompting = '请输入您的联系方式';
      }
      if (!this.currentUser.smsVerifyCode) {
        return this.prompting = '请输入验证码';
      }
      this.userservice.updateUserAddress(this.currentUser).then((res) => {
        if (res.status.error === 0) {
          this.router.navigate(['/order/2', {productId: this.productId, quantity: this.quantity }]);
        }else {
          this.prompting = res.status.message;
        }
      });
  }
  back() {
    this.location.back();
  }
}
