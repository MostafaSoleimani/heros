import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from '../../app-routing.module';
import { AuthService } from '../../pages/auth/service/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const fakeAuthService = {
    isAuthenticated: jest.fn()
  }

  const fakeRouter = {
    navigate: jest.fn()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      providers: [
        { provide: Router, useValue: fakeRouter },
        { provide: AuthService, useValue: fakeAuthService }
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('Should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('Should return true', () => {
    jest.spyOn(fakeAuthService, 'isAuthenticated').mockReturnValue(true);
    jest.spyOn(fakeRouter, 'navigate');
    const can = guard.canActivate(new ActivatedRouteSnapshot());
    expect(can).toBeTruthy();
    expect(fakeRouter.navigate).not.toHaveBeenCalledWith(['auth']);
  })

  it('Should navigate to auth', () => {
    jest.spyOn(fakeAuthService, 'isAuthenticated').mockReturnValue(false);
    jest.spyOn(fakeRouter, 'navigate');
    const can = guard.canActivate(new ActivatedRouteSnapshot());
    expect(can).toBeFalsy()
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['auth']);
  })

});
