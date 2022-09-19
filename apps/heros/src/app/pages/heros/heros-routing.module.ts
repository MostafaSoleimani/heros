import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HerosComponent } from './heros/heros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HerosComponent
  },
  {
    path: ':id',
    component: HeroDetailComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HerosRoutingModule { }
