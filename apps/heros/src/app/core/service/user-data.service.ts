import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {}

  get(name: string) {
    // TODO: Add token to header
    return this.http.get<{name: string, email: string, age: number}>('/api/user/' + name);
  }
}
