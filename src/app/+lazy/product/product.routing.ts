
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './product.component';
import { ProductIndexComponent } from './index/product-index.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import {ProductPromotionComponent} from './promotion/product-promotion.component';

const ProductRoutes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: '',
        component: ProductIndexComponent
      },
      {
        path: 'promotion',
        component: ProductPromotionComponent
      },
      {
        path: ':id',
        component: ProductDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(ProductRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
