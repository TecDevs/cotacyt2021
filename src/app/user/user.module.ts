import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormProyectComponent } from './pages/form-proyect/form-proyect.component';


@NgModule({
  declarations: [
    FormProyectComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
