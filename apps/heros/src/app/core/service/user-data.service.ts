import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataEntity } from '../../+state/user-data.models';

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
    return this.http.get<UserDataEntity>(environment.apiUrl + '/api/user', {headers});
  }
}
