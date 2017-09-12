/**
 * Created by 76546 on 2017/6/20.
 */
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apply } from '../../shared/utils/models/Apply';
import { CyberService } from '../../shared/services/cyber.service';
import { CouponService } from '../../shared/services/coupon.service';

@Component({
  selector: 'cyber-promotion',
  templateUrl: './cyber-promotion.component.html',
  styleUrls: ['./cyber-promotion.component.css']
})
export class CyberPromotionComponent implements OnInit, AfterViewInit {
  code: any;
  endTime: any;
  public prompt: boolean = false;
  public reg = /^1[0-9]{10}/;
  public model = new Apply('');
  public Inter;
  public Confirm: boolean = false;
  public ypos: number;
  public exhibition: boolean = true;
  public promptPhone: boolean;
  constructor(
    private el: ElementRef,
    public router: Router,
    private couponservice: CouponService,
    private cyberService: CyberService
  ) {
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
  showExhibition() {
    this.exhibition = !this.exhibition;
  }
  Top() {
    if (typeof window !== 'undefined') {
      const top = this.el.nativeElement.querySelectorAll('.apply_top')[0].offsetTop;
      document.body.scrollTop = top;
      this.ypos = 0;
      this.Inter = window.setInterval(() => {
        if (this.ypos < top) {
          this.ypos += 20;
          document.body.scrollTop = this.ypos;
        } else {
          clearInterval(this.Inter);
        }
      }, 20);
    }
  }
  goTogo() {
    this.router.navigate(['/togo/map']);
  }
  gotoApply() {
    const top = this.el.nativeElement.querySelector('.apply_top').offsetTop;
    document.body.scrollTop = top;
  }
  onSubmit(res: any) {
    if (this.reg.test(res)) {
      this.endTime = new Date();
      this.model.other = res;
      this.model.type  = 'apply-0722tugou';
      this.model.urlPath  = '/togo';
      this.model.action = 'click';
      this.model.target = 'button#apply';
      this.model.endTime = this.endTime.getTime();
      this.cyberService.addOrder(this.model)
        .then(respones => {
          if (respones.status.error === 0) {
            this.Confirm = true;
          }
        });
    }else {
      this.showPrompt();
    }
  }
  closeConfirm() {
    this.Confirm = false;
  }
  openPrompt() {
    this.promptPhone = true;
  }
  closePrompt() {
    this.promptPhone = false;
  }
  /**
   * 手机号错误提示
   * @method showPrompt
   */
  showPrompt() {
    if (this.prompt === false) {
      this.prompt = true;
      setTimeout(() => {
        this.prompt = false;
      }, 1000);
    }
  }
  getCoupon() {
    this.couponservice.getShareCouponCode()
      .then((res) => {
        this.couponservice.getCouponByCode(res.result.code)
          .then(respones => {
            if (respones.status.error === 0) {
              this.router.navigate(['/user/coupon', respones.result.code]);
            }
          });
      });
  }
}
