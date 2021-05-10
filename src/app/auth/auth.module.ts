import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpAuthorComponent } from './pages/sign-up-author/sign-up-author.component';


@NgModule({
  declarations: [
    SignInComponent,
    SignUpAuthorComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
