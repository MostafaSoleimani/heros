import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of, switchMap } from 'rxjs';
import { UserDataService } from '../core/service/user-data.service';

import * as UserDataActions from './user-data.actions';
import * as UserDataFeature from './user-data.reducer';

@Injectable()
export class UserDataEffects {


  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDataActions.initUserData),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return UserDataActions.loadUserDataSuccess({ userData: {name: '', age: 0, email: ''} });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserDataActions.loadUserDataFailure({ error });
        },
      })
    )
  );

  fetch$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserDataActions.getUserData),
    fetch({
      run: (action) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return this.userDataService.get(action.name).pipe(
          switchMap(x => of(UserDataActions.loadUserDataSuccess({ userData: x })))
        );
      },
      onError: (action, error) => {
        console.error('Error', error);
        return UserDataActions.loadUserDataFailure({ error });
      },
    })
  )
);

  constructor(private readonly actions$: Actions, private userDataService:UserDataService) {}
}
