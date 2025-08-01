import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
})
export class CategoryList implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Lỗi tải danh mục:', err),
    });
  }

  // Sửa id sang string
  onDelete(id: string): void {
    if (confirm('Bạn có chắc muốn xóa danh mục này?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          alert('Xóa danh mục thành công');
          this.loadCategories(); // reload danh sách
        },
        error: (err) => {
          console.error('Lỗi khi xóa:', err);
          alert('Xóa thất bại');
        },
      });
    }
  }

  // Sửa id sang string
  onEdit(id: string): void {
   this.router.navigate(['/categories', id, 'edit']);
  }
}
