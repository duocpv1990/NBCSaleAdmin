import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(public http: HttpClient) {
    // super(http, 'company');
  }
  getEnterprise(companyCode: string, name: string, pageNumber: number, pageSize: number, status?, type?): Observable<any>  {
    const url = `company?companyCode=${companyCode}&name=${name}&status=${status}&type=${type}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  getTarget(): Observable<any>  {
    return this.http.get<any>(`targetmarket`).pipe(map((res: any) => res.payload));
  }

  getEnterpriseDetail(companyId): Observable<any> {
    return this.http.get<any>(`company/detail?companyId=${companyId}`).pipe(map((res: any) => res.payload));
  }
  edit(companyId, param): Observable<any> {
    return this.http.put<any>(`company?companyId=${companyId}`, param).pipe(map((res: any) => res.payload));
  }
  add(param): Observable<any> {
    return this.http.post<any>(`company`, param).pipe(map((res: any) => res.payload));
  }
  delete(companyId): Observable<any> {
    return this.http.delete<any>(`company?companyId=${companyId}`).pipe(map((res: any) => res.payload));
  }
}
