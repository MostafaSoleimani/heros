import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MaterialModule } from '../../../material/material.module';
import { of } from 'rxjs';
import { AuthService } from '../service/auth.service';

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
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have not call login', () => {
    jest.spyOn(fakeAuthService, 'login').mockReturnValue(of());
    component.login();
    fixture.detectChanges();
    expect(fakeAuthService.login).not.toHaveBeenCalled();
  })

  it('Should have call login', () => {
    jest.spyOn(fakeAuthService, 'login').mockReturnValue(of());
    jest.spyOn(fakeRouter, 'navigate').mockReturnValue(of());
    component.loginForm.patchValue({userName: 'niloofar', password: '123456'});
    component.login();
    expect(fakeAuthService.login).toHaveBeenCalled();
    fixture.detectChanges();
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/heros']);
  })
});
