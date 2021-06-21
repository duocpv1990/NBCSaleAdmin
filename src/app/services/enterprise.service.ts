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
  getEnterprise(companyCode: string, name: string, pageNumber: number, pageSize: number, status?: number): Observable<any>  {
    let url = `company?companyCode=${companyCode}&name=${name}&status=${status}
      &pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (!status) {
      url = `company?companyCode=${companyCode}&name=${name}
      &pageNumber=${pageNumber}&pageSize=${pageSize}`;
    }
    return this.http.get<any>(url).pipe(map((res: any) => res.payload));
  }

  getEnterpriseDetail(companyId): Observable<any> {
    return this.http.get<any>(`company/detail?companyId=${companyId}`).pipe(map((res: any) => res.payload));
  }
}
