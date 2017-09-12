import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { WebvrButtonComponent } from './common/vrenvironment/webvr.button.component';
import { webvrPanoComponent } from './common/vrenvironment/webvr.pano.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/header/footer.component';
import { RightSidebarComponent } from './common/header/right.sidebar.component';
import { SideBarComponent } from './common/header/sidebar.component';
import { CarouselDirective } from './common/header/carousel/mycarousel.directive';
import { CarouselComponent } from './common/header/carousel/carousel.component';
import { SendPhoneComponent } from './common/header/send.phone.component';
import { UserService } from './services/User.service';
import { KeFuComponent } from './common/header/kefu.component';
import { HomeComponent } from './common/home/home.component';
import { SanitizeUrl } from './utils/pips/SanitizeUrl';
import { SanitizeHtml } from './utils/pips/SanitizeHtml';
import { CollectMsgService } from './services/CollectMsg.service';
import { CouponService } from './services/coupon.service';
import { FilterCodePipe } from './utils/pips/filterCodePipe';
import { TofixedPipe } from './utils/pips/toFixedPipe';

const MODULES = [
  // Do NOT include UniversalModule, HttpModule, or JsonpModule here
  CommonModule,
  RouterModule
];

const PIPES = [
  // put pipes here
  FilterCodePipe,
  TofixedPipe,
  SanitizeHtml,
  SanitizeUrl
];

const COMPONENTS = [
  // put shared components here
  WebvrButtonComponent,
  webvrPanoComponent,
  HeaderComponent,
  FooterComponent,
  KeFuComponent,
  SendPhoneComponent,
  SideBarComponent,
  RightSidebarComponent,
  CarouselComponent,
  SendPhoneComponent,
  HomeComponent,
  CarouselDirective,
];

const PROVIDERS = [
  UserService,
  CollectMsgService,
  CouponService
];

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
