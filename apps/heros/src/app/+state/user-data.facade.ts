import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as UserDataActions from './user-data.actions';
import * as UserDataFeature from './user-data.reducer';
import * as UserDataSelectors from './user-data.selectors';

@Injectable()
export class UserDataFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(UserDataSelectors.getUserDataLoaded));
  allUserData$ = this.store.pipe(select(UserDataSelectors.getAllUserData));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(UserDataActions.initUserData());
  }
}
