import { UserDataEntity } from './user-data.models';
import {
  userDataAdapter,
  UserDataPartialState,
  initialUserDataState,
} from './user-data.reducer';
import * as UserDataSelectors from './user-data.selectors';

describe('UserData Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getUserDataName = (it: UserDataEntity) => it.name;

    const createUserDataEntity = (name = ''): UserDataEntity => ({
      name: name,
      email: '',
      age: 0
    });

  let state: UserDataPartialState;

  beforeEach(() => {
    state = {
      userData: userDataAdapter.setAll(
        [
          createUserDataEntity('PRODUCT-AAA'),
          createUserDataEntity('PRODUCT-BBB'),
          createUserDataEntity('PRODUCT-CCC'),
        ],
        {
          ...initialUserDataState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('UserData Selectors', () => {
    it('getAllUserData() should return the list of UserData', () => {
      const results = UserDataSelectors.getAllUserData(state);
      const selId = getUserDataName(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    // it('getSelected() should return the selected Entity', () => {
    //   const result = UserDataSelectors.getUserDataState(state) as UserDataEntity;
    //   const selId = getUserDataId(result);

    //   expect(selId).toBe('PRODUCT-BBB');
    // });

    it('getUserDataLoaded() should return the current "loaded" status', () => {
      const result = UserDataSelectors.getUserDataLoaded(state);

      expect(result).toBe(true);
    });

    it('getUserDataError() should return the current "error" state', () => {
      const result = UserDataSelectors.getUserDataError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
