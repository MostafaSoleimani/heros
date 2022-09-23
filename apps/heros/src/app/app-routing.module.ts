import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'heros',
    loadChildren: () => import('./pages/heros/heros.module').then(m => m.HerosModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
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
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
