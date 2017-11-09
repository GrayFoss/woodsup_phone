import {Component} from '@angular/core';

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent {
  onTop() {
    if (typeof window !== 'undefined') {
      document.body.scrollTop = 0;
    }
  }
}
