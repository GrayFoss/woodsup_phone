import { NgModule } from '@angular/core';
import { AboutServerComponent } from './server/about-server.component';
import { AboutTeamComponent } from './about-team.component';
import { AboutBrandComponent } from './about-brand.component';
import { ReserveServerComponent } from './server/reserve-server.component';
import { AboutPublicComponent } from './about-public.component';
import { AboutRoutingModule } from './about.routing';
import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';
import {MyCommonModule} from '../../../common/tamu.common.module';

@NgModule({
  imports: [
    AboutRoutingModule,
    CommonModule,
    MyCommonModule.forRoot(),
  ],
  exports: [],
  declarations: [
    AboutComponent,
    AboutTeamComponent,
    AboutBrandComponent,
    AboutPublicComponent,
    ReserveServerComponent,
    AboutServerComponent,
  ],
  providers: [],
})
export class AboutModule { }
