/**
 * Created by 76546 on 2017/7/5.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'mapUrl',
  template: `
    <iframe [src]="mapUrl| sanitizeUrl"></iframe>`,
  styles: [`
  iframe{
    width: 100%;
    height: 100%;
  }`]
})

export class MapUrlComponent {
  public mapUrl = './assets/html/togo.html';

}
