import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from './../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    ROOT_URl = environment.apiUrl
    constructor(private http: HttpClient) { }

    login(data: any) {
        return this.http.post<{access_token: string}>(this.ROOT_URl + '/api/auth/signin', data).pipe(
            tap(res => localStorage.setItem('access_token', res.access_token))
        )
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }
}