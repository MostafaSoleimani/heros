import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Store, select } from '@ngrx/store';
import { UserDataState } from '../../../+state/user-data.reducer';
import { getUserData } from '../../../+state/user-data.actions';
import { isString } from '../../../core/utils/type-assertion';

@Component({
  selector: 'marvel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private store: Store<UserDataState>){}
  @Output() submitForm = new EventEmitter<any>();

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    const { userName, password } = this.loginForm.value;
    if (isString(userName) && isString(password)) {
      this.authService.login({ userName, password }).subscribe({
        next: res => {
          console.log('res:   ', res );
          this.router.navigate(['/heros']);
          this.store.dispatch(getUserData({name: userName}))
        },
        error: err => {
          console.log('err:   ', err );
        }
      })
    }
  }

}
