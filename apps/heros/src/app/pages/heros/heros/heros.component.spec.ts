import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IApiResult, IHero } from '../../../core/model/heros.model';
import { CardNamePipe } from '../../../core/pipe/card-name.pipe';
import { MarvelHerosService } from '../../../core/service/marvel-heros.service';
import { MaterialModule } from '../../../material/material.module';
import { HerosRoutingModule } from '../heros-routing.module';

import { HerosComponent } from './heros.component';

const DUMMY_HEROS: IApiResult<IHero> = {
  attributionHTML: '',
  attributionText: '',
  code: 111,
  copyright: '',
  data: {
    count: 3,
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
      {
        comics: { available: 1, collectionURI: '', items: [], returned: 1 },
        description: 'Dummy hero number 2',
        events: { available: 1, collectionURI: '', items: [], returned: 1 },
        id: 1,
        modified: '',
        name: 'Hero 2',
        resourceURI: '',
        series: { available: 1, collectionURI: '', items: [], returned: 1 },
        stories: { available: 1, collectionURI: '', items: [], returned: 1 },
        thumbnail: { path: '', extension: 'jpg' },
        urls: []
      },
      {
        comics: { available: 1, collectionURI: '', items: [], returned: 1 },
        description: 'Dummy hero number 3',
        events: { available: 1, collectionURI: '', items: [], returned: 1 },
        id: 1,
        modified: '',
        name: 'Hero 3',
        resourceURI: '',
        series: { available: 1, collectionURI: '', items: [], returned: 1 },
        stories: { available: 1, collectionURI: '', items: [], returned: 1 },
        thumbnail: { path: '', extension: 'jpg' },
        urls: []
      }
    ],
    total: 200
  },
  etag: '',
  status: 'OK'
};

describe('HerosComponent', () => {
  let component: HerosComponent;
  let fixture: ComponentFixture<HerosComponent>;
  const fakeMarvelService: any = {
    getAll: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerosComponent, CardNamePipe],
      providers: [{provide: MarvelHerosService, useValue: fakeMarvelService}],
      imports: [MaterialModule, HerosRoutingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HerosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get heros', () => {
    jest.spyOn(fakeMarvelService, 'getAll').mockReturnValue(of(DUMMY_HEROS))
    fixture.detectChanges();
    expect(component.heros).toEqual(DUMMY_HEROS.data.results);
    expect(component.countAll).toBe(DUMMY_HEROS.data.total)
  })
});
