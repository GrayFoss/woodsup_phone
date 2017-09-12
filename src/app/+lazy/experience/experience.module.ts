import { NgModule } from '@angular/core';
import { webvrEnvironmentService } from '../../shared/services/vr/webvr.environment.services';
import { SharedModule } from '../../shared/shared.module';
import { vrJSLoader } from '../../shared/utils/jsLoader/vrJSLoader';
import { ExperienceRoutingModule } from './experience.routing';
import { ExperienceComponent } from './experience.component';
import { ProductService } from '../../shared/services/products/product.service';
import { BriwserRedirectService } from '../../shared/services/briwserRedirect.service';

@NgModule({
    imports: [
      ExperienceRoutingModule,
      SharedModule.forRoot()
    ],
    declarations: [
      ExperienceComponent
    ],
    providers: [
      BriwserRedirectService,
      vrJSLoader,
      ProductService,
      webvrEnvironmentService],
})
export class ExperienceModule { }
