import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CiAuthService } from '@consult-indochina/auth';
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
    private authService: AuthenticationService,
    private ciAuthService: CiAuthService
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
    const loginValue = {
      Username: ev.username,
      Password: ev.password,
    };
    this.ciAuthService.login(loginValue).subscribe(
      (res) => {
        this.router.navigate(['home']);
      },
      (err) => {
        console.log(err);

        this.router.navigate(['/home']);
      }
    );
    // this.ciAuthService
    //   .login(loginValue)
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.localStorage.set('access_token', res);
    //       this.router.navigate(['home']);
    //     },
    //     (err) => {
    //        console.log(err);

    //       //this.errorLogin = err.error.message;
    //     }
    //   );
  }
  // tslint:disable-next-line:typedef
  routeTo(e) {
    console.log(e);
  }
}
