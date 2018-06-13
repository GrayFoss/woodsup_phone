import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import {HttpModule} from '@angular/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {Sha1} from './services/sha1';
import {
  COOKIE_OPTIONS,
  CookieModule,
  CookieOptions,
  CookieOptionsProvider,
  CookieService
} from 'ngx-cookie';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};



export const IMPORTS = [
  SwiperModule,
  HttpModule,
  InfiniteScrollModule,
  CookieModule.forRoot(),
]

export const PROVIDERS = [
  {
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  },
  Sha1,
]
