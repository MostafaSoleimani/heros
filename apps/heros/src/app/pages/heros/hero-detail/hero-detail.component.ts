import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelHerosService } from '../../../core/service/marvel-heros.service';
import { IApiResult, IHero } from './../../../core/model/heros.model';

@Component({
  selector: 'marvel-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  heroId;
  hero?: IHero;
  constructor(
    activatedRoute: ActivatedRoute, 
    private marvelHerosService: MarvelHerosService
    ) {
    this.heroId = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.marvelHerosService.get(this.heroId).subscribe((res: IApiResult<IHero>) => {
      console.log('hero:   ', res)
      this.hero = res.data.results[0];
    })
  }
}
