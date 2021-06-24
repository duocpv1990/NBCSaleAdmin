import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistributorService {

  constructor(public http: HttpClient) {
  }
  /**
   * get list distributor
   * @param companyName string
   * @param name string
   * @param pageNumber number
   * @param pageSize number
   * @returns list
   */
  getDistributor( name: string, pageNumber: number, pageSize: number, companyName: string): Observable<any> {
    const url = `distributor?name=${name}&companyName=${companyName}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    // if (!provinceId) {
    //   url = `distributor?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    // }
    return this.http.get<any>(url);
  }
  getDistributorDetail(distributorId): Observable<any> {
    return this.http.get<any>(`distributor/detail?distributorId=${distributorId}`).pipe(map((res: any) => res.payload));
  }
  edit(distributorId, param): Observable<any> {
    return this.http.put<any>(`distributor?distributorId=${distributorId}`, param).pipe(map((res: any) => res.payload));
  }
  add(param): Observable<any> {
    return this.http.post<any>(`distributor`, param).pipe(map((res: any) => res.payload));
  }
  delete(distributorId): Observable<any> {
    return this.http.delete<any>(`distributor?distributorId=${distributorId}`).pipe(map((res: any) => res.payload));
  }
}
