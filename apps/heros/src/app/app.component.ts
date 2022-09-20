import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserDataState } from './+state/user-data.reducer';
import { Store, select } from '@ngrx/store';
import { getAllUserData } from './+state/user-data.selectors';
import { UserDataEntity } from './+state/user-data.models';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'heros';
  userData?: UserDataEntity;
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  // getAllUserData
  constructor(private store: Store<UserDataState>){}

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe({
      next: (darkMode: boolean | null) => {
        const darkClassName = 'darkMode';
        this.className = darkMode ? darkClassName : '';
      }
    });
    this.store.select(getAllUserData).subscribe(userData => {
      console.log('user data:    ', userData);
      this.userData = userData[0]
    })
  }

  changeTheme(theme: 'dark' | 'light') {
    const darkClassName = 'darkMode';
    this.className = theme === 'dark' ? darkClassName : '';
  }
}
