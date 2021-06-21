import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(public http: HttpClient) {
  }
  /**
   * get list Meida Company
   * @param companyId number
   * @returns list Company Media
   */
  getCompanyMedia(companyId: number): Observable<any> {
    return this.http.get<any>(`company/media?${companyId}`).pipe(map((res: any) => res.payload));
  }
}
