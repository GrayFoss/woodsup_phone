import { NgModule } from '@angular/core';
import { MallComponent } from './mall.component';
import { MallRoutingModule } from './mall.routing';
import { SharedModule } from '../../shared/shared.module';
import { MallIndexDirective } from './index/mall-index.directive';
import { MallIndexComponent } from './index/mall-index.component';
import { ArticleService } from '../../shared/services/article/article.service';
import { ProductService } from '../../shared/services/products/product.service';
import { MallPromotionComponent } from './promotion/mall-promotion.component';
import { MallServerComponent } from './server/mall-server.component';
import { MallStyleComponent } from './style/mall-style.component';
import { MallTypeComponent } from './type/mall-type.component';
import { DesktopScenesService } from '../../shared/services/desktop.scenes.service';
import { ActivityService } from '../../shared/services/activity.service';

@NgModule({
    imports: [
      MallRoutingModule,
      SharedModule.forRoot()
    ],
    exports: [],
    declarations: [
      MallComponent,
      MallIndexComponent,
      MallIndexDirective,
      MallServerComponent,
      MallStyleComponent,
      MallTypeComponent,
      MallPromotionComponent
      ],
    providers: [
      ActivityService,
      ArticleService,
      ProductService,
      DesktopScenesService
    ],
})
export class MallModule { }
