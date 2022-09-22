import { of } from 'rxjs';
import { AuthService } from './auth.service';


const DUMMY_DATA = {
    "name": "niloofar",
    "email": "niloofar@baam.sadad.co.ir",
    "age": 30
}
describe('MarvelHerosService', () => {
    const httpSpy: any = {
        post: jest.fn()
    }
    const service = new AuthService(httpSpy);
    it('Should be able to retrieve User Data from the API', () => {
        const loginReq = {
            userName: 'niloofar',
            password: '123456'
        }
        jest.spyOn(httpSpy, 'post').mockReturnValue(of(DUMMY_DATA))
        service.login(loginReq);
        expect(httpSpy.post).toBeCalled();
        expect(httpSpy.post).toHaveBeenCalledWith(service.ROOT_URl + '/api/auth/signin', loginReq);
    });
});
