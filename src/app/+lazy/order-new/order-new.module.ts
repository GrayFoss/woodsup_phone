
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderNewRouting } from './order-new.routing';
import { OrderOneComponent } from './order-one.component/order-one.component';
import { OrderTwoComponent } from './order-two.component/order-two.component';
import { OrderThreeComponent } from './order-three.component/order-three.component';
import { OrderNewAddressComponent } from './order-address/order-address.component';
import { OrderFourComponent } from './order-four.component/order-four.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { AliPayComponent } from './order-three.component/alipay.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../shared/services/User.service';
import { OrderService } from '../../shared/services/order.service';
import { CouponService } from '../../shared/services/coupon.service';
import { PayService } from '../../shared/services/pay.service';
import { ProductService } from '../../shared/services/products/product.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule.forRoot(),
    OrderNewRouting
  ],
  declarations: [
    AliPayComponent,
    OrderTwoComponent,
    OrderThreeComponent,
    OrderNewAddressComponent,
    OrderOneComponent,
    OrderFourComponent,
    OrderDetailComponent
  ],
  providers: [
    UserService,
    OrderService,
    CouponService,
    PayService,
    ProductService
  ]
})
export class OrderNewModule {}
