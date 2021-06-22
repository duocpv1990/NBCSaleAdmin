import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(public http: HttpClient) {
  }
  add(param): Observable<any> {
    return this.http.post<any>(`certification`, param).pipe(map((res: any) => res.payload));
  }
}
