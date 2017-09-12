import {Directive, ElementRef, HostListener, AfterViewInit, OnInit, Renderer2, Input} from '@angular/core';
declare const event: any;
@Directive({
  selector: '[MyCarousel]'
})
export class CarouselDirective implements AfterViewInit {
  private wrap = this.el.nativeElement;
  private box;
  private aLi;
/*
  private aNav;
*/
  @Input() public myLength;
  private aHeight;
  private aWidth;
  private startPoint = 0;
  private startEle = 0;
  private now = 0;
  private timer;
  constructor(private el: ElementRef) {
  }
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.box = this.el.nativeElement.querySelector('.box');
      // this.box.innerHTML += this.box.innerHTML;
      this.aLi = this.el.nativeElement.querySelectorAll('.carousel-box-li');
/*
      this.aNav = this.el.nativeElement.querySelectorAll('.carousel-nav-span');
*/
      this.aHeight = this.aLi.clientHeight;
      this.aWidth = this.wrap.clientWidth;
      this.wrap.style.height = this.aHeight + 'px';
      this.box.style.width = this.aLi.length * 100 + '%';
      for (let i = 0; i < this.aLi.length; i++) {
        this.aLi[i].style.width = 1 / this.aLi.length * 100 + '%';
      }
      this.cssTransformVal(this.box, 'translateX', 0);
      this.auto();
      this.wrap.addEventListener('touchstart', (e) => {
        clearInterval(this.timer);
        this.box.style.transition = 'none';
        const moveX = this.cssTransformVal(this.box, 'translateX');
        this.now = Math.round(-moveX / this.aWidth);
        if (this.now === 0) {
          this.now = this.myLength;
        }else if (this.now === this.aLi.length - 1) {
          this.now = this.myLength - 1;
        }
        this.cssTransformVal(this.box, 'translateX', -this.now * this.aWidth);
        this.startPoint = e.changedTouches[0].pageX;
        this.startEle = this.cssTransformVal(this.box, 'translateX');
      }, true);
      this.wrap.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const endPoint = e.changedTouches[0].pageX;
        const disX = endPoint - this.startPoint;
        this.cssTransformVal(this.box, 'translateX', disX + this.startEle);
      }, true);
      this.wrap.addEventListener('touchend', (e) => {
        const moveX = this.cssTransformVal(this.box, 'translateX');
        this.now = Math.round(-moveX / this.aWidth);
        this.tab();
        this.auto();
      }, true);
    }
  }
  public cssTransformVal(ele, attr, val?) {
    if (!ele.transform) {
      ele.transform = {};
    }
    // 当传入值时对属性进行设置。
    if (arguments.length > 2) {
      ele.transform[attr] = val;
      let sval = '';
      for (const s in ele.transform) {
        if (s === 'translateX') {
          sval += s + '(' + ele.transform[s] + 'px)';
        }
        ele.style.WebkitTransform = ele.style.transform = sval;
      }
    }else {
      let val = ele.transform[attr];
      if (typeof val === 'undefined') {
        if (attr === 'translateX') {
          val = 0;
        }
      }
      return val;
    }
  }
  public auto () {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.now === this.aLi.length - 1) {
        this.now = this.myLength - 1;
      }
      this.box.style.transition = 'none';
      this.cssTransformVal(this.box, 'translateX', -this.now * this.aWidth);
      setTimeout(() => {
        this.now++;
        this.tab();
      }, 30);
    }, 5000);
  }
  public tab() {
      this.box.style.transition = '.5s';
      this.cssTransformVal(this.box, 'translateX', -this.now * this.aWidth);
  }
}
