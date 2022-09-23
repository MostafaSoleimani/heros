import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { AuthService } from '../service/auth.service';
import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const fakeAuthService: any = {
    login: jest.fn()
  }

  const fakeRouter: any = {
    navigate: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useValue: fakeAuthService},
        {provide: Router, useValue: fakeRouter}
      ],
      imports: [MaterialModule, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have not call login', () => {
    jest.spyOn(fakeAuthService, 'login').mockReturnValue(of());
    component.login();
    expect(fakeAuthService.login).not.toHaveBeenCalled();
  })

  it('Should have call login', () => {
    jest.spyOn(fakeAuthService, 'login').mockReturnValue(of('something'));
    jest.spyOn(fakeRouter, 'navigate');
    component.loginForm.patchValue({userName: 'niloofar', password: '123456'});
    component.login();
    expect(fakeAuthService.login).toHaveBeenCalled();
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/heros']);
  })
});
