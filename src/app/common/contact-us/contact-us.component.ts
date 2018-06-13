import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    trigger('showOrHidden', [
      state('*', style({
        opacity: 1,
        transform: 'scale(1)',
        height: '100%'
      })),
      state('void',   style({
        opacity: 0,
        transform: 'scale(0.1)',
        height: '0px'
      })),
      transition('* => void', animate('200ms ease-in')),
      transition('void => *', animate('200ms ease-out'))
    ])
  ]
})

export class ContactUsComponent implements OnDestroy, OnInit {
  private activeLeft: boolean = false;
  public connect: any = [
    {
      imgSrc: 'assets/img/main/footer/tel.png',
      content: '电话: 15323894017'
    },
    {
      imgSrc: 'assets/img/main/footer/address.png',
      content: '地址: 深圳市南山区新世界豪园D2-12'
    }
  ];
  constructor(
  ) {
  }

  ngOnInit() {
    if (location.pathname === '/about-us') {
      this.activeLeft = true;
    }
  }

  ngOnDestroy() {
  }
}
