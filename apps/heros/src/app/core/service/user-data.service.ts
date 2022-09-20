import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {}

  get() {
    const Authorization = 'Bearer ' + localStorage.getItem('access_token') ?? '';
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': Authorization
    });
    return this.http.get<{name: string, email: string, age: number}>('/api/user', {headers});
  }
}
