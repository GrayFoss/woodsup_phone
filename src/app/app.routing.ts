import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: './+lazy/mall/mall.module#MallModule'},
  { path: 'article', loadChildren: './+lazy/article/article.module#ArticleModule'},
  { path: 'experience', loadChildren: './+lazy/experience/experience.module#ExperienceModule'},
  { path: 'about', loadChildren: './+lazy/about/about.module#AboutModule'},
  { path: 'togo', loadChildren: './+lazy/activity/activity.module#ActivityModule'},
  { path: 'product', loadChildren: './+lazy/product/product.module#ProductModule'},
  { path: 'order', loadChildren: './+lazy/order-new/order-new.module#OrderNewModule'},
  { path: 'user', loadChildren: './+lazy/user/user.module#UserModule'},
  { path: 'admin', loadChildren: './+lazy/admin/admin.module#AdminModule'},
  { path: '**', component: NotFound404Component }
];
