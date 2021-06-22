import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeModel } from '../models/auth/change.model';
import { BaseApiService } from './base-api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseApiService<any> {
  constructor(http: HttpClient) {
    super(http, 'cognito/login');
  }

  login(params): Observable<any> {
    return this.http.post<any>(this.actionUrl, params).pipe(map((res: any) => res.payload));
  }
  changePassword = (params: ChangeModel) => {
    return this.http.post(`api/SalesManager/Admin/Account/ChangePassword`, params);
  }
}
