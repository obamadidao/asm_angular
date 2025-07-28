import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService, Category } from '../service';
import { FormsModule } from '@angular/forms';

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

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.categoryService.getCategoryById(id).subscribe({
        next: (data) => {
          this.category = data;
          this.categoryName = data.name;
        },
        error: (err) => {
          console.error('Lỗi tải danh mục:', err);
          this.errorMessage = 'Không tìm thấy danh mục này.';
        },
      });
    } else {
      this.errorMessage = 'ID danh mục không hợp lệ.';
    }
  }

  updateCategory(): void {
    if (!this.category || !this.categoryName.trim()) {
      this.errorMessage = 'Tên danh mục không được để trống.';
      return;
    }

    const updatedCategory: Category = {
      id: this.category.id,
      name: this.categoryName.trim(),
    };

    this.categoryService.updateCategory(updatedCategory.id, updatedCategory).subscribe({
      next: () => {
        alert('Cập nhật danh mục thành công!');
        this.router.navigate(['/categories']);
      },
      error: (err) => {
        console.error('Lỗi cập nhật danh mục:', err);
        this.errorMessage = 'Đã xảy ra lỗi khi cập nhật danh mục.';
      },
    });
  }
}
