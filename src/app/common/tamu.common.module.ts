import { NgModule, ModuleWithProviders } from '@angular/core';

import {ContactUsComponent} from './contact-us/contact-us.component';
import {ScenePipe} from '../pipe/scenePipe';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BottomNavComponent} from './bottom-nav/bottom-nav.component';
import { MaterialModule } from '../material.module';

const MODULES = [
  RouterModule,
  CommonModule,
  MaterialModule
];
const PIPES = [
  ScenePipe,
];
const COMPONENTS = [
  ContactUsComponent,
  BottomNavComponent,
];
const PROVIDERS = [
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
export class MyCommonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MyCommonModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
