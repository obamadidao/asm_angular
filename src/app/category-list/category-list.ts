import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
})

export class CategoryList implements OnInit {
  categories: Category[] = [];

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: () => this.notyf.error('Không tải được danh sách danh mục.'),
    });
  }

  onDelete(category: Category): void {
    Swal.fire({
      title: 'Xác nhận',
      html: `Bạn có chắc chắn muốn xóa danh mục <strong>${category.name}</strong> không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(category.id.toString()).subscribe({
          next: () => {
            this.notyf.success(`Đã xóa danh mục "${category.name}" thành công!`);
            this.loadCategories();
          },
          error: () => {
            this.notyf.error(`Xóa danh mục "${category.name}" thất bại.`);
          },
        });
      }
    });
  }

  onEdit(event: MouseEvent, id: string): void {
    event.stopPropagation(); // chặn click lan ra ngoài
    event.preventDefault(); // chặn load lại trang
    this.router.navigate(['/admin/categories', id, 'edit']); // đảm bảo đi đúng route admin
  }
}
