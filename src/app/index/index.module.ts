import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { IndexRoutinModule } from './index.routing';

@NgModule({
  imports: [
    IndexRoutinModule
  ],
  declarations: [
    IndexComponent
  ]
})
export class IndexModule {}
