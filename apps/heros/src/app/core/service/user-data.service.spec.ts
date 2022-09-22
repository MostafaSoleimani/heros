import { HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

import { UserDataService } from './user-data.service';

const DUMMY_DATA = {
  name: 'Mostafa',
  age: 35,
  email: 'something'
}
describe('MarvelHerosService', () => {
  const httpSpy: any = {
    get: jest.fn()
  }
  const service = new UserDataService(httpSpy);
  it('Should be able to retrieve User Data from the API', () => {
    jest.spyOn(httpSpy, 'get').mockReturnValue(of(DUMMY_DATA))
    service.get();
    expect(httpSpy.get).toBeCalled();
    expect(httpSpy.get).toHaveBeenCalled();
  });
});
