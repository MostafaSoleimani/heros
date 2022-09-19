import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerosRoutingModule } from './heros-routing.module';
import { HerosComponent } from './heros/heros.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HerosComponent, HeroDetailComponent],
  imports: [
    CommonModule, 
    HerosRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
})
export class HerosModule {}
