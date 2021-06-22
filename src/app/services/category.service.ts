import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient) {
  }
  getCategory(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`category?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((res: any) => res.payload));
  }
}
