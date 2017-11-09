import { Component, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
@Component({
  selector: 'footer-component',
  templateUrl: `./footer.component.html`,
  styleUrls: ['./footer.component.scss'],
  animations: [
    trigger('showOrHidden', [
      state('show', style({
        opacity: 1,
        transform: 'scale(1)',
        height: '100%'
      })),
      state('hidden',   style({
        opacity: 0,
        transform: 'scale(0.1)',
        height: '0px'
      })),
      transition('show => hidden', animate('200ms ease-in')),
      transition('hidden => show', animate('200ms ease-out'))
    ])
  ]
})

export class FooterComponent implements AfterViewInit {
  @Input() selectV: string;
  public viewCheck: boolean = false;
  public connectStatus: string = 'hidden';
  public connect: any = [
    {
      imgSrc: 'assets/img/main/footer/tel.png',
      content: '电话: 17603021617'
    },
    {
      imgSrc: 'assets/img/main/footer/address.png',
      content: '地址: 深圳市南山区新世界豪园D2-12'
    }
  ];
  constructor(
    public router: Router,
  ) {}
  ngAfterViewInit(): void {
    this.viewCheck = true;
  }
  //  显示隐藏联系方式
  toggleConnect() {
    this.connectStatus = this.connectStatus === 'hidden' ? 'show' : 'hidden';
  }
}
