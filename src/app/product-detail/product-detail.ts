import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product, CategoryService, Category } from '../service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetail implements OnInit {
  product: Product | null = null;
  categoryName: string = 'Không rõ';
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.isLoading = false;
          this.loadCategoryName();
        },
        error: (err) => {
          console.error('Lỗi khi lấy sản phẩm:', err);
          this.product = null;
          this.isLoading = false;
        },
      });
    } else {
      this.product = null;
      this.isLoading = false;
    }
  }

  loadCategoryName(): void {
    if (!this.product) return;

    this.categoryService.getCategoryById(this.product.categoryId).subscribe({
      next: (category: Category) => {
        this.categoryName = category?.name || 'Không rõ';
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
        this.categoryName = 'Không rõ';
      },
    });
  }
}
