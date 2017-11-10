import { Directive, HostListener } from '@angular/core';
import { Router } from '@angular/router';
/**
 * Created by Administrator on 2017/11/9.
 */
@Directive({
  selector: 'body[orientationChange]',
  host: {
    '(onorientationchange)': 'change()'
  }
})

export class OrientationChangeDirective {
  constructor(private _router: Router) {}
  change() {
    console.log('changeOrienetation');
    // this._router.navigate(['']);
  }

}
