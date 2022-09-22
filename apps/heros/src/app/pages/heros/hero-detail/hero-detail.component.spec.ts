import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IApiResult, IHero } from '../../../core/model/heros.model';
import { CardNamePipe } from '../../../core/pipe/card-name.pipe';
import { MarvelHerosService } from '../../../core/service/marvel-heros.service';
import { MaterialModule } from '../../../material/material.module';
import { HerosRoutingModule } from '../heros-routing.module';

import { HeroDetailComponent } from './hero-detail.component';

const DUMMY_HEROS: IApiResult<IHero> = {
  attributionHTML: '',
  attributionText: '',
  code: 111,
  copyright: '',
  data: {
    count: 1,
    limit: 1,
    offset: 1,
    results: [
      {
        comics: { available: 1, collectionURI: '', items: [], returned: 1 },
        description: 'Dummy hero number 1',
        events: { available: 1, collectionURI: '', items: [], returned: 1 },
        id: 1,
        modified: '',
        name: 'Hero 1',
        resourceURI: '',
        series: { available: 1, collectionURI: '', items: [], returned: 1 },
        stories: { available: 1, collectionURI: '', items: [], returned: 1 },
        thumbnail: { path: '', extension: 'jpg' },
        urls: []
      },
    ],
    total: 200
  },
  etag: '',
  status: 'OK'
};
describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  const fakeMarvelService: any = {
    get: jest.fn()
  }

  const fakeActivatedRoute: any = {
    snapshot: {
      params: {
        id: 5
      }
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroDetailComponent, CardNamePipe],
      providers: [
        {provide: MarvelHerosService, useValue: fakeMarvelService},
        {provide: ActivatedRoute, useValue: fakeActivatedRoute},
      ],
      imports: [MaterialModule, HerosRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get hero', () => {
    expect(component.heroId).toBe(5);
    jest.spyOn(fakeMarvelService, 'get').mockReturnValue(of(DUMMY_HEROS))
    fixture.detectChanges();
    expect(component.hero).toEqual(DUMMY_HEROS.data.results[0]);
  })
});
