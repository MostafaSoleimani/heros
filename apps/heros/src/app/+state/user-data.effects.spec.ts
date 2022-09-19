import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UserDataActions from './user-data.actions';
import { UserDataEffects } from './user-data.effects';

describe('UserDataEffects', () => {
  let actions: Observable<Action>;
  let effects: UserDataEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UserDataEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UserDataEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: UserDataActions.initUserData() });

      const expected = hot('-a-|', {
        a: UserDataActions.loadUserDataSuccess({ userData: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
