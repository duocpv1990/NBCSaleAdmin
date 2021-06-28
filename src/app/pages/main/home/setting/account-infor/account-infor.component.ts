import { Component, OnInit } from '@angular/core';
import { CiAuthStateService } from '@consult-indochina/auth';
import { BaseUploadComponent, S3FileService } from '@consult-indochina/common';
import * as cloneDeep from 'lodash/cloneDeep';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-account-infor',
  templateUrl: './account-infor.component.html',
  styleUrls: ['./account-infor.component.scss']
})
export class AccountInforComponent extends BaseUploadComponent implements OnInit {
  // userProfile = {
  //   MediaURL: '',
  //   FirstName: '',
  //   LastName: '',
  //   Phone: '',
  //   Email: '',
  // };
  userProfile: any;
  tempProfile: any;
  constructor(private ciAuthStateService: CiAuthStateService, public s3Service: S3FileService, private profileService: ProfileService) {
    super(s3Service);
  }

  ngOnInit(): void {
    this.getUser();
    // this.ciAuthStateService.set(this.userProfile);
  }
  getUser(): void {
    this.ciAuthStateService.currentUser$.subscribe(res => {
      this.userProfile = cloneDeep(res[0]);
      this.tempProfile = res[0];
      console.log(this.userProfile);
    });
  }

  preview(files: File[]): void {
    this.multipleUpload(files).subscribe(res => {
      this.userProfile.MediaURL = this.fileLinkList[0];
    });
  }
  saveUser(): void {
    const req = {
      FirstName: this.userProfile.FirstName,
      LastName: this.userProfile.LastName,
      Email: this.userProfile.Email,
      Phone: this.userProfile.Phone,
      MediaURL: this.userProfile.MediaURL,
    };
    this.profileService.seftEdit(req).subscribe(result => {
      console.log(result);
      this.tempProfile = this.userProfile;
      this.userProfile = cloneDeep(this.tempProfile);
    });
  }
}

