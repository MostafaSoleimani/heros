import { Action } from '@ngrx/store';

import * as UserDataActions from './user-data.actions';
import { UserDataEntity } from './user-data.models';
import {
  UserDataState,
  initialUserDataState,
  userDataReducer,
} from './user-data.reducer';

describe('UserData Reducer', () => {
  const createUserDataEntity = (name = ''): UserDataEntity => ({
    name: name,
    email: '',
    age: 0
  });

  describe('valid UserData actions', () => {
    it('loadUserDataSuccess should return the list of known UserData', () => {
      const userData = createUserDataEntity('PRODUCT-AAA');
      const action = UserDataActions.loadUserDataSuccess({ userData });

      const result: UserDataState = userDataReducer(
        initialUserDataState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = userDataReducer(initialUserDataState, action);

      expect(result).toBe(initialUserDataState);
    });
  });
});
