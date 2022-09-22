import { getTestBed, TestBed } from '@angular/core/testing';

import { MarvelHerosService } from './marvel-heros.service';




import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports

import { IApiResult, IHero } from '../model/heros.model';

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
      }
    ],
    total: 200
  },
  etag: '',
  status: 'OK'
};
describe('MarvelHerosService', () => {
  let service: MarvelHerosService;
  let httpMock: HttpTestingController;
  let injector;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelHerosService]
    });
    injector = getTestBed();
    service = injector.inject(MarvelHerosService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('MarvelHerosService Fetch heros', () => {
    it('be able to retrieve Heros from the API bia GET', () => {
      service.getAll().subscribe(heros => {
        expect(heros.data.results.length).toBe(1);
        expect(heros).toEqual(DUMMY_HEROS);
      });
      const request = httpMock.expectOne(`${service.ROOT_URl}/characters?apikey=f58792977ff894aa9698d09d56419178`);
      expect(request.request.method).toBe('GET');
      request.flush(DUMMY_HEROS);
    });

    it('be able to retrieve One Hero from the API bia GET', () => {
      service.get('1').subscribe(heros => {
        expect(heros.data.results.length).toBe(1);
        expect(heros).toEqual(DUMMY_HEROS);
      });
      const request = httpMock.expectOne(`${service.ROOT_URl}/characters/1?apikey=f58792977ff894aa9698d09d56419178`);
      expect(request.request.method).toBe('GET');
      request.flush(DUMMY_HEROS);
    });
  });

});
