import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Category } from '../service';
import { FormsModule, NgForm } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-edit.html',
  styleUrls: ['./category-edit.css'],
})
export class CategoryEdit implements OnInit {
  category: Category | null = null;
  categoryName = '';
  errorMessage = '';

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getCategoryById(id).subscribe({
        next: (data) => {
          this.category = data;
          this.categoryName = data.name;
        },
        error: () => {
          this.errorMessage = 'Không tìm thấy danh mục này.';
        },
      });
    } else {
      this.errorMessage = 'ID danh mục không hợp lệ.';
    }
  }

  updateCategory(form: NgForm): void {
    if (!this.category || form.invalid || !this.categoryName.trim()) {
      this.notyf.error('Tên danh mục không được để trống.');
      return;
    }

    const trimmedName = this.categoryName.trim();

    // Kiểm tra trùng tên
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        const isDuplicate = categories.some(
          (c) =>
            c.name.toLowerCase() === trimmedName.toLowerCase() &&
            c.id !== this.category!.id
        );

        if (isDuplicate) {
          this.notyf.error('Tên danh mục đã tồn tại.');
        } else {
          const updatedCategory: Category = {
            id: this.category!.id,
            name: trimmedName,
          };

          this.categoryService.updateCategory(updatedCategory.id, updatedCategory).subscribe({
            next: () => {
              this.notyf.success('Cập nhật danh mục thành công!');
              this.router.navigate(['/categories']);
            },
            error: () => {
              this.notyf.error('Đã xảy ra lỗi khi cập nhật danh mục.');
            },
          });
        }
      },
      error: () => {
        this.notyf.error('Không thể kiểm tra tên danh mục.');
      },
    });
  }
}
