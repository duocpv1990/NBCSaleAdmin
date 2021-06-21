import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(public http: HttpClient) {
  }
  /**
   * get list Nation
   * @returns list Nation
   */
  getNation(): Observable<any>  {
    return this.http.get<any>(`nation`).pipe(map((res: any) => res.payload));
  }
  /**
   * get list Province by id Nation
   * @param nationId number
   * @returns list Province
   */
  getProvince(nationId: number): Observable<any> {
    return this.http.get<any>(`province?nationId=${nationId}`).pipe(map((res: any) => res.payload));
  }
  /**
   * get list District by provinceId
   * @param provinceId number
   * @returns list District
   */
   getDistrict(provinceId: number): Observable<any> {
    return this.http.get<any>(`district?provinceId=${provinceId}`).pipe(map((res: any) => res.payload));
  }
}
