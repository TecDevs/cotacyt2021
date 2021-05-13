import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpAuthorComponent } from './pages/sign-up-author/sign-up-author.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'registro-autor',
        component: SignUpAuthorComponent,
      },
      {
        path: 'sesion',
        component: SignInComponent
      },
      {
        path: '**',
        redirectTo: 'sesion',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
