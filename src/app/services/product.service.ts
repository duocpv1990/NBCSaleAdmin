import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(public http: HttpClient) {
  }
  /**
   * get list product
   * @param pageNumber number
   * @param pageSize number
   * @returns list
   */
  getProduct(pageNumber: number, pageSize): Observable<any> {
    return this.http.get<any>(`product?pageNumber=${pageNumber}&pageSize=${pageSize}`).pipe(map((res: any) => res.payload));
  }
}
