import { UserDataEntity } from './user-data.models';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserDataService } from '../core/service/user-data.service';

import * as UserDataActions from './user-data.actions';

@Injectable()
export class UserDataEffects {


  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.initUserData),
      switchMap(() => this.userDataService.get().pipe(
        map(userData => UserDataActions.loadUserDataSuccess({ userData })),
        catchError((error: any) => of(UserDataActions.loadUserDataFailure({ error })))
      ))
    )
  );

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.getUserData),
      switchMap(() => this.userDataService.get().pipe(
        map(userData => UserDataActions.loadUserDataSuccess({ userData })),
        catchError((error: any) => of(UserDataActions.loadUserDataFailure({ error })))
      ))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.logout),
      switchMap(() => {
        localStorage.removeItem('access_token');
        return of(UserDataActions.loadUserDataSuccess({ userData:{name: '', email: '', age: 0 }}))
      })
    )
  );

  constructor(private readonly actions$: Actions, private userDataService: UserDataService) { }
}
