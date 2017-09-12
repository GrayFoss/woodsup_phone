/**
 * Created by Joe on 2017/5/4.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ExperienceComponent} from './experience.component';

const SceneRoutes: Routes = [
  { path: '', component: ExperienceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(SceneRoutes)],
  exports: [RouterModule],
})
export class ExperienceRoutingModule { }

