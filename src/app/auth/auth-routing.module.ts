import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpAuthorComponent } from './pages/sign-up-author/sign-up-author.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-up-author',
        component: SignUpAuthorComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: '**',
        redirectTo: 'sign-up-author',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
