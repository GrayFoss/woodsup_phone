import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'carousel',
    template: `
    <div class="wrap"  MyCarousel [myLength]="myObjects.length" [style.height.px]="win_wi * 9/16">
      <ul class="box" [style.height.px]="win_wi * 9/16">
        <li class="carousel-box-li" *ngFor="let xx of myObjects;">
          <div (click)="geArti(xx)">
             <img [src]="xx.src" [style.width.px]="win_wi">
          </div>
        </li>
        <li class="carousel-box-li" *ngFor="let xx of myObjects;">
          <div (click)="geArti(xx)">
            <img [src]="xx.src" [style.width.px]="win_wi">
          </div>
        </li>
      </ul>
    </div>
`,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit {
  @Input() myObjects;
  public win_wi;
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.win_wi = window.innerWidth;
    }
  }
  constructor(
    public router: Router
  ) {}
  ngAfterContentInit() {
  }
  geArti(res) {
    if (res.id1 !== 194) {
      this.router.navigate(['/article', res.id1]);
    }else {
      this.router.navigate(['togo']);
    }
  }
}
