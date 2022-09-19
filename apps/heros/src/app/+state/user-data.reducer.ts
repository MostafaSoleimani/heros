import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UserDataActions from './user-data.actions';
import { UserDataEntity } from './user-data.models';

export const USER_DATA_FEATURE_KEY = 'userData';

export interface UserDataState extends EntityState<UserDataEntity> {
  selectedId?: string | number; // which UserData record has been selected
  loaded: boolean; // has the UserData list been loaded
  error?: string | null; // last known error (if any)
}

export interface UserDataPartialState {
  readonly [USER_DATA_FEATURE_KEY]: UserDataState;
}

export const userDataAdapter: EntityAdapter<UserDataEntity> =
  createEntityAdapter<UserDataEntity>();

export const initialUserDataState: UserDataState =
  userDataAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialUserDataState,
  on(UserDataActions.initUserData, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(UserDataActions.loadUserDataSuccess, (state, { userData }) =>
    userDataAdapter.setAll(userData, { ...state, loaded: true })
  ),
  on(UserDataActions.loadUserDataFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function userDataReducer(
  state: UserDataState | undefined,
  action: Action
) {
  return reducer(state, action);
}
