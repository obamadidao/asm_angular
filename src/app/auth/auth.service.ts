
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first, map, switchMap, throwError } from 'rxjs';
import { Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private TOKEN_KEY = 'app_token';
  private USER_KEY = 'app_user';
  private readonly API_BASE = 'http://localhost:3000';

  constructor(private router: Router, private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const raw = localStorage.getItem(this.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private saveSession(user: User): void {
    const token = 'fake-jwt-' + Date.now(); 
    localStorage.setItem(this.TOKEN_KEY, token);


    const { password, ...safeUser } = user;
    localStorage.setItem(this.USER_KEY, JSON.stringify(safeUser));
  }

logout(): void {
  localStorage.removeItem(this.TOKEN_KEY);
  localStorage.removeItem(this.USER_KEY);
  this.router.navigate(['/client-home']); 
}


  register(name: string, email: string, password: string): Observable<void> {
    const encodedEmail = encodeURIComponent(email);

    return this.http
      .get<User[]>(`${this.API_BASE}/users?email=${encodedEmail}`)
      .pipe(
        first(),
        switchMap((users) => {
          if (users.length > 0) {
            return throwError(() => new Error('Email đã được sử dụng'));
          }

          const newUser: User = {
            id: 'u_' + Date.now(),
            name,
            email,
            password, 
          };

          return this.http
            .post<User>(`${this.API_BASE}/users`, newUser)
            .pipe(map(() => void 0));
        })
      );
  }


  login(email: string, password: string): Observable<void> {
    const encodedEmail = encodeURIComponent(email);

    return this.http
      .get<User[]>(`${this.API_BASE}/users?email=${encodedEmail}`)
      .pipe(
        first(),
        switchMap((users) => {
          const user = users?.[0];

          if (!user) {
            return throwError(() => new Error('Email không tồn tại'));
          }

          if (user.password !== password) {
            return throwError(() => new Error('Mật khẩu sai'));
          }

          this.saveSession(user);
          return of(void 0);
        })
      );
  }
}
