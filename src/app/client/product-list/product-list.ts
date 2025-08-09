import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  imports: [
    CommonModule,
    RouterModule // ⚠️ Đảm bảo có RouterModule để routerLink hoạt động
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy sản phẩm:', err);
      }
    });
  }
}
