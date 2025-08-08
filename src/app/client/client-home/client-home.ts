import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../service';
import { AuthService, User } from '../../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-client-home',
  templateUrl: './client-home.html',
  styleUrls: ['./client-home.css'],
  imports: [CommonModule, RouterModule, CurrencyPipe]
})
export class ClientHomeComponent implements OnInit {
  products: Product[] = [];
  user: User | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
  }
}
