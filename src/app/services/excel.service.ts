import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(public http: HttpClient) {
  }

  import(param, url): Observable<any> {
    return this.http.post<any>(`${url}/imporrt`, param).pipe(map((res: any) => res.payload));
  }
}
