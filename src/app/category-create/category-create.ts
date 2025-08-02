import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService, Category } from '../service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-create.html',
  styleUrls: ['./category-create.css'],
})
export class CategoryCreate {
  categoryName = '';

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  handleSubmit(form: NgForm): void {
    if (form.invalid || !this.categoryName.trim()) {
      this.notyf.error('Tên danh mục là bắt buộc');
      return;
    }

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        const exists = categories.some(
          (cate) => cate.name.toLowerCase() === this.categoryName.trim().toLowerCase()
        );

        if (exists) {
          this.notyf.error('Tên danh mục đã tồn tại');
          return;
        }

        const newCategory: Omit<Category, 'id'> = {
          name: this.categoryName.trim(),
        };

        this.categoryService.createCategory(newCategory).subscribe({
          next: () => {
            this.notyf.success('Tạo danh mục thành công!');
            this.router.navigate(['/categories']);
          },
          error: () => {
            this.notyf.error('Đã xảy ra lỗi khi tạo danh mục');
          },
        });
      },
      error: () => {
        this.notyf.error('Không thể kiểm tra trùng tên danh mục');
      },
    });
  }
}
