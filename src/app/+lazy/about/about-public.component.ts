import { Component } from '@angular/core';
@Component({
  selector: 'about-foorter',
  templateUrl: './about-public.component.html',
  styleUrls: ['about-public.component.scss']
})
export class AboutPublicComponent {
  public selectV = 'about';
  public type = 'back';
  public adreesColor = 1;
  seleAdress(x: number) {
    this.adreesColor = x;
  }
}
