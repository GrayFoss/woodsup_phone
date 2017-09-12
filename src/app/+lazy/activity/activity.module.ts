/**
 * Created by 76546 on 2017/6/20.
 */
import { NgModule } from '@angular/core';
import { CyberPromotionComponent } from './cyber-promotion.component';
import { activityRouting } from './activity.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MapUrlComponent } from './mapUrl.component';
import { SharedModule } from '../../shared/shared.module';
import { CyberService } from '../../shared/services/cyber.service';
import { CouponService } from '../../shared/services/coupon.service';
@NgModule({
  imports:       [
    CommonModule,
    FormsModule,
    SharedModule.forRoot(),
    activityRouting
  ],
  declarations: [
    CyberPromotionComponent,
    MapUrlComponent
  ],
  providers: [
    CyberService,
    CouponService
  ]
})
export class ActivityModule {
}
