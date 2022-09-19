import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  USER_DATA_FEATURE_KEY,
  UserDataState,
  userDataAdapter,
} from './user-data.reducer';

// Lookup the 'UserData' feature state managed by NgRx
export const getUserDataState = createFeatureSelector<UserDataState>(
  USER_DATA_FEATURE_KEY
);

const { selectAll, selectEntities } = userDataAdapter.getSelectors();

export const getUserDataLoaded = createSelector(
  getUserDataState,
  (state: UserDataState) => state.loaded
);

export const getUserDataError = createSelector(
  getUserDataState,
  (state: UserDataState) => state.error
);

export const getAllUserData = createSelector(
  getUserDataState,
  (state: UserDataState) => selectAll(state)
);

export const getUserDataEntities = createSelector(
  getUserDataState,
  (state: UserDataState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getUserDataState,
  (state: UserDataState) => state.selectedId
);

export const getSelected = createSelector(
  getUserDataEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
