import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';


@NgModule({
  declarations: [
    FormUserComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
