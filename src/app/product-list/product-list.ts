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
      error: (err: any) => console.error('Error loading products', err),
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err: any) => console.error('Error loading categories', err),
    });

    this.brandService.getAllBrands().subscribe({
      next: (data: Brand[]) => {
        this.brands = data;
      },
      error: (err: any) => console.error('Error loading brands', err),
    });
  }

  filterProducts(): Product[] {
    const search = this.filterText.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      (product.id !== undefined && product.id.toLowerCase().includes(search))
    );
  }

  getCategoryName(categoryId: string): string {
    return (
      this.categories.find(c => c.id === categoryId)?.name || 'Unknown'
    );
  }

  getBrandName(brandId: string): string {
    return (
      this.brands.find(b => b.id === brandId)?.name || 'Unknown'
    );
  }

  editProduct(id: string): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  viewProduct(id: string): void {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          alert('Xóa sản phẩm thành công!');
          this.loadData();
        },
        error: (err: any) => {
          console.error('Lỗi khi xóa sản phẩm:', err);
          alert('Đã xảy ra lỗi khi xóa sản phẩm.');
        },
      });
    }
  }
}
