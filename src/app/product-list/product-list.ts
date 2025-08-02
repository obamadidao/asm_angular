import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import {
  ProductService,
  Product,
  CategoryService,
  Category,
  BrandService,
  Brand
} from '../service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  filterText = '';

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
      },
      error: () => {
        this.notyf.error('Không tải được danh sách sản phẩm.');
      },
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: () => {
        this.notyf.error('Không tải được danh mục.');
      },
    });

    this.brandService.getAllBrands().subscribe({
      next: (data: Brand[]) => {
        this.brands = data;
      },
      error: () => {
        this.notyf.error('Không tải được thương hiệu.');
      },
    });
  }

  filterProducts(): Product[] {
    const search = this.filterText.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      (typeof product.id === 'string' && product.id.toLowerCase().includes(search))
    );
  }

  getCategoryName(categoryId: string): string {
    return this.categories.find(c => c.id === categoryId)?.name || 'Unknown';
  }

  getBrandName(brandId: string): string {
    return this.brands.find(b => b.id === brandId)?.name || 'Unknown';
  }

  editProduct(id: string): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  viewProduct(id: string): void {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(product: Product): void {
    Swal.fire({
      title: 'Xác nhận',
      html: `Bạn có chắc chắn muốn xóa sản phẩm <strong>${product.name}</strong> không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product.id.toString()).subscribe({
          next: () => {
            this.notyf.success(`Đã xóa sản phẩm "${product.name}" thành công!`);
            this.loadData();
          },
          error: () => {
            this.notyf.error(`Xóa sản phẩm "${product.name}" thất bại.`);
          },
        });
      }
    });
  }
}
