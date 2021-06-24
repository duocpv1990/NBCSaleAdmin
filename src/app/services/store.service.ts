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
  getStores(name, provinceId, type, pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`store?name=${name}&provinceId=${provinceId}&type=${type}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getStoresDetail(StoreId: any): Observable<any> {
    return this.http.get<any>(`store/detail?storeId=${StoreId}`).pipe(map((res: any) => res.payload));
  }
  edit(StoreId, param): Observable<any> {
    return this.http.put<any>(`store?storeId=${StoreId}`, param).pipe(map((res: any) => res.payload));
  }
  add(param): Observable<any> {
    return this.http.post<any>(`store`, param).pipe(map((res: any) => res.payload));
  }
  delete(StoreId): Observable<any> {
    return this.http.delete<any>(`store?storeId=${StoreId}`).pipe(map((res: any) => res.payload));
  }
  updateImage(param): Observable<any> {
    return this.http.post<any>(`store/media`, param).pipe(map((res: any) => res.payload));
  }
}
