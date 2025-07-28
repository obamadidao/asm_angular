import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService, Product, CategoryService, Category } from '../service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-edit.html',
  styleUrls: ['./product-edit.css'],
})
export class ProductEdit implements OnInit {
  product: Product | null = null;
  isLoading = true;
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = {
            ...data,
            categoryId: Number(data.categoryId), // ensure correct type
          };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy sản phẩm:', err);
          this.isLoading = false;
        },
      });
    }

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh mục:', err);
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.product) {
          this.product.image = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(form: NgForm): void {
    if (form.valid && this.product) {
      this.productService.updateProduct(this.product.id, this.product).subscribe({
        next: () => {
          alert('Cập nhật sản phẩm thành công!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật sản phẩm:', err);
          alert('Cập nhật thất bại.');
        },
      });
    }
  }
}
