import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Store, select } from '@ngrx/store';
import { UserDataState } from '../../../+state/user-data.reducer';

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
    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        console.log('res:   ', res );
        this.router.navigate(['/heros']);
      },
      error: err => {
        console.log('err:   ', err );
      }
    })
  }

}
