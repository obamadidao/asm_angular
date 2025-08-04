// src/app/auth/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  emailError = '';
  passwordError = '';
  generalError = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {
    this.emailError = '';
    this.passwordError = '';
    this.generalError = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    if (!this.email) {
      this.emailError = 'Email không được để trống';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Email không hợp lệ';
    }

    // Validate password
    if (!this.password) {
      this.passwordError = 'Mật khẩu không được để trống';
    } else if (this.password.length < 8) {
      this.passwordError = 'Mật khẩu phải từ 8 ký tự trở lên';
    }

    // Nếu có lỗi, không gửi request
    if (this.emailError || this.passwordError) return;

    this.loading = true;
    this.auth
      .login(this.email, this.password)
      .pipe(
        catchError((e: any) => {
          this.generalError = e.message || 'Lỗi đăng nhập';
          return of(void 0);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        if (this.generalError) return;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      });
  }
}
