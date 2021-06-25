import { Component, OnInit } from '@angular/core';
import { CiAuthStateService } from '@consult-indochina/auth';

@Component({
  selector: 'app-account-infor',
  templateUrl: './account-infor.component.html',
  styleUrls: ['./account-infor.component.scss']
})
export class AccountInforComponent implements OnInit {
  // userProfile = {
  //   MediaURL: '',
  //   FirstName: '',
  //   LastName: '',
  //   Phone: '',
  //   Email: '',
  // };
  userProfile: any;
  constructor(private ciAuthStateService: CiAuthStateService) { }

  ngOnInit(): void {
    this.ciAuthStateService.currentUser$.subscribe(res => {
      this.userProfile = res[0];
      console.log(this.userProfile);

    });
    this.ciAuthStateService.set(this.userProfile);
  }

}
