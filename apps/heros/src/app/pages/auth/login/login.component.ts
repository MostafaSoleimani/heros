import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isString } from '../../../core/utils/type-assertion';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'marvel-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    ){}

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    const { userName, password } = this.loginForm.value;
    if (isString(userName) && isString(password)) {
      this.authService.login({ userName, password }).subscribe({
        next: res => {
          this.router.navigate(['/heros']);
        },
        error: err => {
          console.log('err:   ', err );
        }
      })
    }
  }

}
