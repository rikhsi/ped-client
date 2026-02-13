import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOption } from '@typings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) {}

  getQuery$<R>(url: string, option?: HttpOption): Observable<R> {
    return this.http.get<R>(url, option);
  }

  getBlobQuery$<R>(url: string, option?: HttpOption): Observable<R> {
    return this.http.get<R>(url, { ...option, responseType: 'blob' as any });
  }

  postQuery$<T, B>(url: string, data: T, option?: HttpOption): Observable<B> {
    return this.http.post<B>(url, data, option);
  }

  putQuery$<T, B>(url: string, data: T, option?: HttpOption): Observable<B> {
    return this.http.put<B>(url, data, option);
  }
  patchQuery$<T, B>(url: string, data: T, option?: HttpOption): Observable<B> {
    return this.http.patch<B>(url, data, option);
  }

  deleteQuery$<T, B>(url: string, option?: HttpOption): Observable<B> {
    return this.http.delete<B>(url, option);
  }
}
