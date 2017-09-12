import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ali-pay',
  template: `<div [innerHTML]="alifrom | sanitizeHtml"></div>`,
})

export class AliPayComponent implements OnInit, AfterViewInit {
  @Input() alifrom;
  constructor(
    public el: ElementRef
  ) {}
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.el.nativeElement.querySelector('form').submit();
  }
}
