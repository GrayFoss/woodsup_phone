import {Component, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'user-forget',
  templateUrl: './user-forget.component.html',
  styleUrls: ['./user-forget.component.scss']
})
export class UserForgetComponent {
  public x: boolean = true;
  public y: boolean = false;
  public ccc: boolean = true;
  public username: string;
  public verification: string;
  getVerification(value: string, cc: string) {
    this.verification = value;
    console.log(cc);
  }
  showPassword() {
    this.x = false;
    this.y = true;
  }
}
