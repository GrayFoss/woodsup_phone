import {Component} from '@angular/core';

@Component({
  selector: 'mall',
  template: `
<header-component></header-component>
<router-outlet></router-outlet>
<footer-component [selectV]="selectV"></footer-component>
`
})
export class MallComponent {
  public selectV = 'mall';
}
