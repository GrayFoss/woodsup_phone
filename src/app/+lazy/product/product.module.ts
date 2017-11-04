import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product.routing';
import { ProductSidbarComponent } from './index/product-sidebar.component';
import { ProductIndexComponent } from './index/product-index.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductPromotionComponent } from './promotion/product-promotion.component';
import { DetailDirective } from './detail/product-img.directive';
import { SharedModule } from '../../shared/shared.module';
import { ProductService } from '../../shared/services/products/product.service';
import { vrJSLoader } from '../../shared/utils/jsLoader/vrJSLoader';
import { webvrEnvironmentService } from '../../shared/services/vr/webvr.environment.services';
import {CouponService} from "../../shared/services/coupon.service";

@NgModule({
    imports: [
      FormsModule,
      ProductRoutingModule,
      SharedModule.forRoot()
    ],
    exports: [],
    declarations: [
      ProductComponent,
      ProductIndexComponent,
      ProductDetailComponent,
      DetailDirective,
      ProductPromotionComponent,
      ProductSidbarComponent],
    providers: [
      CouponService,
      ProductService,
      vrJSLoader,
      webvrEnvironmentService
    ],
})
export class ProductModule { }
