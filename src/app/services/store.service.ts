import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) {
  }
  getStores(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`store?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((res: any) => res.payload));
  }
}
