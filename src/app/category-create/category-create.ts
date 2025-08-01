import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService, Category } from '../service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-create.html',
  styleUrls: ['./category-create.css'],
})
export class CategoryCreate {
  categoryName = '';
  errorMessage = '';

  constructor(private categoryService: CategoryService, private router: Router) {}

  createCategory(): void {
    if (!this.categoryName.trim()) {
      this.errorMessage = 'Tên danh mục không được để trống.';
      return;
    }

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        const nameExists = categories.some(
          (cate) => cate.name.toLowerCase() === this.categoryName.trim().toLowerCase()
        );

        if (nameExists) {
          this.errorMessage = 'Tên danh mục đã tồn tại.';
          return;
        }

        const newCategory: Omit<Category, 'id'> = { name: this.categoryName.trim() };

        this.categoryService.createCategory(newCategory).subscribe({
          next: () => {
            alert('Tạo danh mục thành công!');
            this.router.navigate(['/categories']);
          },
          error: (err: any) => {
            console.error('Lỗi tạo danh mục:', err);
            this.errorMessage = 'Đã xảy ra lỗi khi tạo danh mục.';
          },
        });
      },
      error: () => {
        this.errorMessage = 'Không thể kiểm tra trùng tên danh mục.';
      },
    });
  }
}
