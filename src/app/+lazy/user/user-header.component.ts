/**
 * Created by jun on 2016/12/29.
 */
import {Component} from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'user-header',
  template: `
    <header class="logoc">
      <img src="./assets/img/shop/chacha.png" alt="" (click)="back()">
      <div class="logoo">
        <img src="./assets/img/share/user@2x.png" alt="">
      </div>
    </header>`,
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent {
  constructor(public location: Location) { }
  back() {
    this.location.back();
  }
}
