// src/app/auth/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirm = '';
  loading = false;

  nameError = '';
  emailError = '';
  passwordError = '';
  confirmError = '';
  generalError = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  submit() {

    this.nameError = '';
    this.emailError = '';
    this.passwordError = '';
    this.confirmError = '';
    this.generalError = '';

    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!this.name.trim()) {
      this.nameError = 'Họ tên không được để trống';
    } else if (!nameRegex.test(this.name)) {
      this.nameError = 'Họ tên không hợp lệ (không chứa số hoặc ký tự đặc biệt)';
    }

    if (!this.email.trim()) {
      this.emailError = 'Email không được để trống';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Email không hợp lệ';
    }

    if (!this.password) {
      this.passwordError = 'Mật khẩu không được để trống';
    } else if (this.password.length < 8) {
      this.passwordError = 'Mật khẩu phải từ 8 ký tự trở lên';
    }

    if (!this.confirm) {
      this.confirmError = 'Vui lòng xác nhận mật khẩu';
    } else if (this.password !== this.confirm) {
      this.confirmError = 'Mật khẩu không khớp';
    }


    if (
      this.nameError ||
      this.emailError ||
      this.passwordError ||
      this.confirmError
    ) {
      return;
    }

    this.loading = true;
    this.auth
      .register(this.name, this.email, this.password)
      .pipe(
        catchError((err) => {

          if (err.message?.includes('Email')) {
            this.emailError = err.message;
          } else {
            this.generalError = err.message || 'Lỗi đăng ký';
          }
          return of();
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        if (this.generalError || this.emailError) return;
        this.router.navigateByUrl('/login');
      });
  }
}
