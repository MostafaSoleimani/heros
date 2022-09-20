import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    login(data: any) {
        return this.http.post<{access_token: string}>('/api/auth/signin', data).pipe(
            tap(res => localStorage.setItem('access_token', res.access_token))
        )
    }

    isAuthenticated(): boolean {
        console.log('access_token:   ', localStorage.getItem('access_token'))
        return !!localStorage.getItem('access_token');
    }
}