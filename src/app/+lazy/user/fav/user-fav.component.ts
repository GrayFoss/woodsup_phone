import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'user-fav',
  templateUrl: './user-fav.component.html',
  styleUrls: ['./user-fav.component.scss']
})
export class UserFavComponent {
  product: string;
  article: string = 'artcl';
  constructor(
    private location: Location
  ) {}
  onartivle(): void {
    this.product = '';
    this.article = 'artcl';
  }
  onproduct(): void {
    this.article = '';
    this.product = 'prod';
  }
  goBack(): void {
    this.location.back();
  }
}
