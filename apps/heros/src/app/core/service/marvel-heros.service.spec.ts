import { of } from 'rxjs';
import { IApiResult, IHero } from '../model/heros.model';
import { MarvelHerosService } from './marvel-heros.service';

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
  const httpSpy: any = {
    get: jest.fn()
  }
  const service = new MarvelHerosService(httpSpy);
  const marvelUrl = 'https://gateway.marvel.com/v1/public/characters';
  const apikey = 'f58792977ff894aa9698d09d56419178';
  it('Should get all heros', () => {
    const queryParams = {
      apikey
    }
    jest.spyOn(httpSpy, 'get').mockReturnValue(of(DUMMY_HEROS))
    service.getAll();
    expect(httpSpy.get).toBeCalled();
    expect(httpSpy.get).toHaveBeenCalledWith(marvelUrl, { params: queryParams });

  });

  it('Should be able to get one hero', () => {
    const queryParams = {
      apikey
    }
    const id = 'someId'
    jest.spyOn(httpSpy, 'get').mockReturnValue(of(DUMMY_HEROS))
    service.get(id);
    expect(httpSpy.get).toBeCalled();
    expect(httpSpy.get).toHaveBeenCalledWith(`${marvelUrl}/${id}`, { params: queryParams });
  });

});
