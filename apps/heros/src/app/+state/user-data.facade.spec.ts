import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as UserDataActions from './user-data.actions';
import { UserDataEffects } from './user-data.effects';
import { UserDataFacade } from './user-data.facade';
import { UserDataEntity } from './user-data.models';
import {
  USER_DATA_FEATURE_KEY,
  UserDataState,
  initialUserDataState,
  userDataReducer,
} from './user-data.reducer';
import * as UserDataSelectors from './user-data.selectors';

interface TestSchema {
  userData: UserDataState;
}

describe('UserDataFacade', () => {
  let facade: UserDataFacade;
  let store: Store<TestSchema>;
  const createUserDataEntity = (id: string, name = ''): UserDataEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(USER_DATA_FEATURE_KEY, userDataReducer),
          EffectsModule.forFeature([UserDataEffects]),
        ],
        providers: [UserDataFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UserDataFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allUserData$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allUserData$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadUserDataSuccess` to manually update list
     */
    it('allUserData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allUserData$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        UserDataActions.loadUserDataSuccess({
          userData: [createUserDataEntity('AAA'), createUserDataEntity('BBB')],
        })
      );

      list = await readFirst(facade.allUserData$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
