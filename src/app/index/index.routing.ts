import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
const INDEXROUTING: Routes = [
  {
    path: '',
    component: IndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(INDEXROUTING)],
  exports: [RouterModule],
})

export class IndexRoutinModule { }
