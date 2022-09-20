import { Component, OnInit } from '@angular/core';
import { UserDataState } from '../../../+state/user-data.reducer';
import { Store, select } from '@ngrx/store';
import { getUserData } from '../../../+state/user-data.actions';

@Component({
  selector: 'marvel-heros-container',
  templateUrl: './heros-container.component.html',
  styleUrls: ['./heros-container.component.scss'],
})
export class HerosContainerComponent implements OnInit {
  constructor(private store: Store<UserDataState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUserData())
  }
}
