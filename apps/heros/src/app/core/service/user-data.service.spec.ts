import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';

const DUMMY_DATA = {
  name: 'Mostafa',
  age: 35,
  email: 'something'
}

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;
  let injector;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDataService]
    });
    injector = getTestBed();
    service = injector.inject(UserDataService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('UserDataService Fetch User Data', () => {

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('be able to retrieve User Data from the API bia GET', () => {
      service.get().subscribe(userData => {
        expect(userData).toEqual(DUMMY_DATA);
      });
      const request = httpMock.expectOne(`${service.ROOT_URl}/api/user`);
      expect(request.request.method).toBe('GET');
      request.flush(DUMMY_DATA);
    });
  });
});
