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
   * @param name string
   * @param companyName string
   * @param pageNumber number
   * @param pageSize number
   * @param status number
   * @param type number
   * @returns list
   */
  getProduct(name: string, companyName: string, pageNumber: number, pageSize, status, type): Observable<any> {
    return this.http.get<any>(`product?name=${name}&companyName=${companyName}&type=${type}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
