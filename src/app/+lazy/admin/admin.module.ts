/**
 * Created by joe on 2017/9/20.
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { adminRouting } from './admin.routing';
import { FormsModule } from '@angular/forms';
import { sha1 } from '../../shared/utils/sha1';
import { RegisterComponent } from './register/register.component';
@NgModule({
  imports: [
    FormsModule,
    SharedModule.forRoot(),
    adminRouting
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  providers: [
    sha1
  ]
})
export class AdminModule {
}
