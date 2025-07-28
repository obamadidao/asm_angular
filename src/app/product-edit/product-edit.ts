import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ProductService,
  Product,
  CategoryService,
  Category,
  BrandService,
  Brand,
} from '../service';
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
  brands: Brand[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy id dưới dạng string, không ép số nữa
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (data) => {
          this.product = { ...data };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy sản phẩm:', err);
          this.isLoading = false;
        },
      });
    }

    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Lỗi khi lấy danh mục:', err),
    });

    this.brandService.getAllBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => console.error('Lỗi khi lấy thương hiệu:', err),
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
      // Đảm bảo price là number trước khi gửi
      this.product.price = Number(this.product.price);

      this.productService.updateProduct(this.product.id.toString(), this.product).subscribe({
        next: () => {
          alert('Cập nhật sản phẩm thành công!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Lỗi khi cập nhật sản phẩm:', err);
          alert('Cập nhật thất bại.');
        },
      });
    } else {
      alert('Vui lòng điền đầy đủ và chính xác thông tin.');
    }
  }
}
