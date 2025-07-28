import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService, Category } from '../service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.css'],
})
export class CategoryList implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Lỗi tải danh mục:', err),
    });
  }
}
