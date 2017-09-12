/**
 * Created by 76546 on 2017/7/13.
 */
import { RouterModule, Routes } from '@angular/router';
import { OrderOneComponent } from './order-one.component/order-one.component';
import { OrderTwoComponent } from './order-two.component/order-two.component';
import { OrderThreeComponent } from './order-three.component/order-three.component';
import { OrderNewAddressComponent } from './order-address/order-address.component';
import { OrderFourComponent } from './order-four.component/order-four.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const OrderNewRoutes: Routes = [
  {
    path: '1',
    component: OrderOneComponent
  },
  {
    path: '2',
    component: OrderTwoComponent
  },
  {
    path: '3',
    component: OrderThreeComponent
  },
  {
    path: '4',
    component: OrderFourComponent
  },
  {
    path: 'detail',
    component: OrderDetailComponent
  },
  {
    path: 'new/address',
    component: OrderNewAddressComponent
  }
];

export const OrderNewRouting = RouterModule.forChild(OrderNewRoutes);
