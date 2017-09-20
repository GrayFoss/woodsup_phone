/**
 * Created by joe on 2017/9/18.
 */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuriedSerivce } from './buried.service';

const PROVIDERS = [
  BuriedSerivce
];

@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [],
  providers: [],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return{
      ngModule: CoreModule,
      providers: [
        ...PROVIDERS
      ]
    }
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
