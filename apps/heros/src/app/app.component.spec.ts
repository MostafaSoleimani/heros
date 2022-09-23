import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UserDataState } from './+state/user-data.reducer';
import { getAllUserData } from './+state/user-data.selectors';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';

const userDatas = [{name: 'mostafa', age: 35, email: ''}];

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const fakeStore: any = {
    dispatch: jest.fn(),
    select: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{provide: Store<UserDataState>, useValue: fakeStore}],
      imports: [MaterialModule, RouterTestingModule.withRoutes(appRoutes)]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'heros'`, () => {
    expect(app.title).toEqual('heros');
  });

  it('should subscribe to store to get user data', () => {
    
    jest.spyOn(fakeStore, 'select').mockReturnValue(of(userDatas));
    fixture.detectChanges();
    expect(fakeStore.select).toHaveBeenCalledWith(getAllUserData);
    expect(app.userData).toEqual(userDatas[0]);
  })

});
