import { RouterModule, Routes} from '@angular/router';
import { UserFavComponent } from './fav/user-fav.component';
import { UserSettingComponent } from './setting/user-setting.component';
import { UserSignupComponent } from './signup/user-signup.component';
import { UserLoginComponent } from './login/user-login.component';
import { UserForgetComponent } from './forget/user-forget.component';
import { UserOrderComponent } from './order/user-order.component';
import { UserComponent } from './user.component';
import { UserIndexComponent } from './index/user-index.component';
import { UserServerComponent } from './server/user-server.component';
import { CouponComponent } from './coupon/coupon.component';

const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'index',
        component: UserIndexComponent,
      },
      {
        path: 'fav',
        component: UserFavComponent,
      },
      {
        path: 'setting',
        component: UserSettingComponent,
      },
      {
        path: 'signup',
        component: UserSignupComponent,
      },
      {
        path: 'login',
        component: UserLoginComponent,
      },
      {
        path: 'forget',
        component: UserForgetComponent,
      },
      {
        path: 'order',
        component: UserOrderComponent,
      },
      {
        path: 'server',
        component: UserServerComponent,
      },
      {
        path: 'coupon/:id',
        component: CouponComponent,
      },
    ]
  }
];

export const UserRouting = RouterModule.forChild(UserRoutes);
