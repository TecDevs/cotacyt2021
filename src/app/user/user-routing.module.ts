import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormProyectComponent } from './pages/form-proyect/form-proyect.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register-project',
        component: FormProyectComponent,
      },
      {
        path: '**',
        redirectTo: 'register-proyect'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
