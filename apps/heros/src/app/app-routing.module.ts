import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heros',
    loadChildren: () => import('./pages/heros/heros.module').then(m => m.HerosModule)
  },
  {
    path: '',
    redirectTo: 'heros',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'heros',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
