import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';


const DUMMY_DATA = {
    "name": "niloofar",
    "email": "niloofar@baam.sadad.co.ir",
    "age": 30
  }

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;
    let injector;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });
        injector = getTestBed();
        service = injector.inject(AuthService);
        httpMock = injector.inject(HttpTestingController);
        
    });

    afterEach(() => {
        httpMock.verify();
    });


    describe('AuthService Login', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });
        it('be able to Login via Post', () => {
            service.login({ userName: 'niloofar', password: '123456' }).subscribe(userData => {
                expect(userData).toEqual(DUMMY_DATA);
            });
            const request = httpMock.expectOne(`${service.ROOT_URl}/api/auth/signin`);
            expect(request.request.method).toBe('POST');
            request.flush(DUMMY_DATA);
        });
    });

});
