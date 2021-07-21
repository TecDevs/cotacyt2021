import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginGuard } from './Guards/AuthGuards/login.guard';
import { RegistroProyectoGuard } from './Guards/UserGuards/registro-proyecto.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'principal',
    component: NavbarComponent,
    children: [
      {
        path: 'usuario',
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [RegistroProyectoGuard]
      },
      {
        path: '**',
        redirectTo: 'usuario'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
