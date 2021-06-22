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
   * @param provinceId string
   * @param name string
   * @param pageNumber number
   * @param pageSize number
   * @returns list
   */
  getDistributor( name: string, pageNumber: number, pageSize: number, provinceId?: number): Observable<any> {
    let url = `distributor?name=${name}&provinceId=${provinceId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (!provinceId) {
      url = `distributor?name=${name}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
    }
    return this.http.get<any>(url);
  }

  delete(distributorId): Observable<any> {
    return this.http.delete<any>(`distributor?distributorId=${distributorId}`).pipe(map((res: any) => res.payload));
  }
}
