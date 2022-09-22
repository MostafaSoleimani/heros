import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { UserDataState } from '../../../+state/user-data.reducer';

import { HerosContainerComponent } from './heros-container.component';

describe('HerosContainerComponent', () => {
  let component: HerosContainerComponent;
  let fixture: ComponentFixture<HerosContainerComponent>;
  const fakeStore: any = {
    dispatch: jest.fn()
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HerosContainerComponent],
      providers: [{provide: Store<UserDataState>, useValue: fakeStore}]
    }).compileComponents();

    fixture = TestBed.createComponent(HerosContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should dispatch getUserData', () => {
    jest.spyOn(fakeStore, 'dispatch');
    fixture.detectChanges();
    expect(fakeStore.dispatch).toHaveBeenCalled();
  })
});
