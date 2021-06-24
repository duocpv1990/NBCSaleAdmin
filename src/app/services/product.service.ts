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
   * @param productCode string
   * @param pageNumber number
   * @param pageSize number
   * @param status number
   * @param type number
   * @returns list
   */
  getProduct(name: string, companyName: string, productCode: string, pageNumber: number, pageSize, status, type): Observable<any> {
    return this.http.get<any>(`product?name=${name}&companyName=${companyName}&productCode=${productCode}&type=${type}&status=${status}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  edit(productId, param): Observable<any> {
    return this.http.put<any>(`product?productId=${productId}`, param).pipe(map((res: any) => res.payload));
  }
  add(param): Observable<any> {
    return this.http.post<any>(`product`, param).pipe(map((res: any) => res.payload));
  }
  getProductDetail(productId): Observable<any> {
    return this.http.get<any>(`product/detail?productId=${productId}`).pipe(map((res: any) => res.payload));
  }
  delete(productId): Observable<any> {
    return this.http.delete<any>(`product?productId=${productId}`).pipe(map((res: any) => res.payload));
  }
  updateImage(param): Observable<any> {
    return this.http.post<any>(`product/media`, param).pipe(map((res: any) => res.payload));
  }
}
