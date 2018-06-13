/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import {HomeComponent} from './features/home.component';
import {CollectionComponent} from './features/collection/collection.component';
import {SnapshotComponent} from './features/snapshot/snapshot.component';
import {ProductComponent} from './features/product/product.component';
import {AboutModule} from './features/+lazy/about/about.module';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'collection', component: CollectionComponent, pathMatch: 'full' },
  { path: 'snapshot', component: SnapshotComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponent, pathMatch: 'full' },
  { path: 'about-us', loadChildren: './features/+lazy/about/about.module#AboutModule' },
  // { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: '**', component: NotFound404Component }
];
