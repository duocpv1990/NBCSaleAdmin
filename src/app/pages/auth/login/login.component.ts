import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  errorLogin: any;
  constructor(
    private router: Router,
    private localStorage: LocalStorageService,
    private authService: AuthenticationService
  ) { }

  data = {
    type: {
      phone: 'phone',
      password: 'password',
    },
  };
  ngOnInit(): void { }

  // tslint:disable-next-line:typedef
  login(ev) {
    this.authService
      .login({
        username: ev.username,
        password: ev.password,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.localStorage.set('access_token', res);
          this.router.navigate(['home']);
        },
        (err) => {
           console.log(err);

          //this.errorLogin = err.error.message;
        }
      );
  }
  // tslint:disable-next-line:typedef
  routeTo(e) {
    console.log(e);
  }
}
