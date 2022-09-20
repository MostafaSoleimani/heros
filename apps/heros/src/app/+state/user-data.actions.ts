import { createAction, props } from '@ngrx/store';
import { UserDataEntity } from './user-data.models';

export const initUserData = createAction('[UserData Page] Init');
export const getUserData = createAction('[UserData Page] Init');

export const loadUserDataSuccess = createAction(
  '[UserData/API] Load UserData Success',
  props<{ userData: UserDataEntity }>()
);

export const loadUserDataFailure = createAction(
  '[UserData/API] Load UserData Failure',
  props<{ error: any }>()
);
