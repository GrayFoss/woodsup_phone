import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReserveServerComponent } from './server/reserve-server.component';
import { AboutPublicComponent } from './about-public.component';
import { AboutComponent } from './about.component';
const aboutrouting: Routes = [
  {
    path: '',
    component: AboutComponent,
  },
  {
    path: 'reserve',
    component: ReserveServerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(aboutrouting)],
  exports: [RouterModule],
})

export class AboutRoutingModule { }
