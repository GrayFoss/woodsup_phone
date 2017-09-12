import { Directive, ElementRef, OnInit, Input } from '@angular/core';
@Directive({
  selector: '[MallHeight]'
})
export class MallIndexDirective implements OnInit {
  @Input() MallHeight;
  constructor(private el: ElementRef) { }
  ngOnInit() {
     this.cc();
  }
  cc() {
    if (typeof window !== 'undefined') {
      const xx = this.el.nativeElement.querySelectorAll('li');
      for (const cc of xx){
        cc.style.height = (this.MallHeight[1] - this.MallHeight[0] * 9 / 16 - 89) / 3 + 'px';
      }
    }
  }
}
