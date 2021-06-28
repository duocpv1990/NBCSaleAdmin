import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProfileModel } from '../models/profile/profile.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseApiService<ProfileModel> {
  constructor(http: HttpClient) {
    super(http, 'userprofile');
  }
  seftEdit(param): Observable<any> {
    return this.http.put<any>(this.actionUrl, param);
  }
}
