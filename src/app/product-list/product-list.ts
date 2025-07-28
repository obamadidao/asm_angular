import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ProductService, Product, CategoryService, Category } from '../service';

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
  filterText = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
  }

  filterProducts(): Product[] {
    const search = this.filterText.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(search) ||
      (product.id !== undefined && product.id.toString().includes(search))
    );
  }

 getCategoryName(categoryId: any): string {
  return (
    this.categories.find(c => String(c.id) === String(categoryId))?.name || 'Unknown'
  );
}


  editProduct(id: number): void {
    this.router.navigate(['/products', id, 'edit']);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  deleteProduct(id: number): void {
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
