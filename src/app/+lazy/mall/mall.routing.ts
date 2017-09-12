import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MallComponent } from './mall.component';
import { MallIndexComponent } from './index/mall-index.component';
import { MallPromotionComponent } from './promotion/mall-promotion.component';
import { MallServerComponent } from './server/mall-server.component';
import { MallStyleComponent } from './style/mall-style.component';
import { MallTypeComponent } from './type/mall-type.component';

const MallRoutes: Routes = [
  {
    path: '',
    component: MallComponent,
    children: [
      {
        path: '',
        component: MallIndexComponent
      },
      {
        path: 'server',
        component: MallServerComponent
      },
      {
        path: 'style',
        component: MallStyleComponent
      },
      {
        path: 'promotion',
        component: MallPromotionComponent
      },
      {
        path: 'type',
        component: MallTypeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(MallRoutes)],
  exports: [RouterModule],
})
export class MallRoutingModule { }
