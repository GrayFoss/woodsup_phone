import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFavComponent } from './fav/user-fav.component';
import { UserSettingComponent } from './setting/user-setting.component';
import { UserSignupComponent } from './signup/user-signup.component';
import { UserHeaderComponent } from './user-header.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserForgetComponent } from './forget/user-forget.component';
import { UserRouting } from './user.routing';
import { CollectionOrderComponent } from './collection.orders.component';
import { UserOrderComponent } from './order/user-order.component';
import { UserComponent } from './user.component';
import { UserIndexComponent } from './index/user-index.component';
import { UserServerComponent } from './server/user-server.component';
import { CouponComponent } from './coupon/coupon.component';
import { SharedModule } from '../../shared/shared.module';
import { OrderService } from '../../shared/services/order.service';
import { CouponService } from '../../shared/services/coupon.service';
import { sha1 } from '../../shared/utils/sha1';
import { ActivityService } from '../../shared/services/activity.service';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    UserRouting,
    SharedModule.forRoot()
  ],
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserSettingComponent,
    UserIndexComponent,
    UserSignupComponent,
    UserLoginComponent,
    UserForgetComponent,
    CollectionOrderComponent,
    UserFavComponent,
    UserOrderComponent,
    UserServerComponent,
    CouponComponent
  ],
  providers: [
    ActivityService,
    sha1,
    OrderService,
    CouponService]
})

export class UserModule { }
