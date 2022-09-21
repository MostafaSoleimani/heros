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
      // fetch({
      //   run: (action) => {
      //     // Your custom service 'load' logic goes here. For now just return a success action...
      //     return UserDataActions.loadUserDataSuccess({ userData: {name: '', age: 0, email: ''} });
      //   },
      //   onError: (action, error) => {
      //     console.error('Error', error);
      //     return UserDataActions.loadUserDataFailure({ error });
      //   },
      // })
    )
  );

  fetch$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserDataActions.getUserData),
    switchMap(() => this.userDataService.get().pipe(
      map(userData => UserDataActions.loadUserDataSuccess({ userData })),
      catchError((error: any) => of(UserDataActions.loadUserDataFailure({ error })))
    ))
    // fetch({
    //   run: () => {
    //     // Your custom service 'load' logic goes here. For now just return a success action...
    //     return this.userDataService.get().pipe(
    //       switchMap((userData: UserDataEntity) => new of(UserDataActions.loadUserDataSuccess({ userData })))
    //     );
    //   },
    //   onError: (_action: unknown, error: string) => {
    //     console.error('Error', error);
    //     return UserDataActions.loadUserDataFailure({ error });
    //   },
    // })
  )
);

  constructor(private readonly actions$: Actions, private userDataService:UserDataService) {}
}
