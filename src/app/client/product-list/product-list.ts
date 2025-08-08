import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../service'; // Đảm bảo đúng đường dẫn

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
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
