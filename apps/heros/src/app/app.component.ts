import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from './+state/user-data.actions';
import { UserDataEntity } from './+state/user-data.models';
import { UserDataState } from './+state/user-data.reducer';
import { getAllUserData } from './+state/user-data.selectors';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  title = 'heros';
  userData?: UserDataEntity;
  @HostBinding('class') className = '';

  constructor(private store: Store<UserDataState>){}

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    this.changeTheme(theme == 'dark' ? 'dark' : 'light')
    this.store.select(getAllUserData).subscribe(userData => {
      console.log('user data:    ', userData);
      this.userData = userData[0]
    });
  }

  changeTheme(theme: 'dark' | 'light') {
    const darkClassName = 'darkMode';
    this.className = theme === 'dark' ? darkClassName : '';
    localStorage.setItem('theme', theme)
  }

  logout() {
    this.store.dispatch(logout())
  }
}
