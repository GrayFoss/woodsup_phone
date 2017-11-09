import {Component} from '@angular/core';

@Component({
  selector: 'mall',
  template: `
<header-component [type]="type"></header-component>
<router-outlet></router-outlet>
`
})
export class MallComponent {
  public selectV = 'mall';
  public type = 'normal';
}
