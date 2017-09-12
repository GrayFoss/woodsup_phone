/**
 * Created by 76546 on 2017/6/20.
 */

import { RouterModule, Routes } from '@angular/router';
import { CyberPromotionComponent } from './cyber-promotion.component';
import { MapUrlComponent } from './mapUrl.component';

const activityRoutes: Routes = [
  {
    path: '',
    component: CyberPromotionComponent
  },
  {
    path: 'map',
    component: MapUrlComponent
  }
];
export const activityRouting = RouterModule.forChild(activityRoutes);
