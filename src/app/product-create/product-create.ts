import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product-create',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-create.html',
  styleUrls: ['./product-create.css'],
})
export class ProductCreate implements OnInit {
  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  product = {
    name: '',
    price: null as number | null,
    categoryId: null as number | null,
    brandId: null as number | null,
    image: '',
  };

  categories: Category[] = [];
  brands: Brand[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Category[]>('http://localhost:3000/categories').subscribe({
      next: (res) => (this.categories = res),
      error: () => {
        this.notyf.error('Không thể tải danh sách danh mục');
      },
    });

    this.http.get<Brand[]>('http://localhost:3000/brands').subscribe({
      next: (res) => (this.brands = res),
      error: () => {
        this.notyf.error('Không thể tải danh sách thương hiệu');
      },
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(form: NgForm): void {
    const isValidName = this.product.name.trim() !== '';
    const isValidPrice =
      typeof this.product.price === 'number' &&
      !isNaN(this.product.price) &&
      this.product.price >= 0;
    const isValidCategory =
      this.product.categoryId !== null && this.product.categoryId !== undefined;
    const isValidBrand =
      this.product.brandId !== null && this.product.brandId !== undefined;
    const isValidImage = this.product.image.trim() !== '';

    if (
      form.valid &&
      isValidName &&
      isValidPrice &&
      isValidCategory &&
      isValidBrand &&
      isValidImage
    ) {
      const newProduct = {
        name: this.product.name.trim(),
        price: this.product.price!,
        categoryId: this.product.categoryId!,
        brandId: this.product.brandId!,
        image: this.product.image,
      };

      this.http.post('http://localhost:3000/products', newProduct).subscribe({
        next: () => {
          this.notyf.success('Sản phẩm đã được thêm thành công!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Lỗi khi thêm sản phẩm:', err);
          this.notyf.error('Thêm sản phẩm thất bại.');
        },
      });
    } else {
      const missing: string[] = [];
      if (!isValidName) missing.push('tên');
      if (!isValidPrice) {
        if (
          typeof this.product.price === 'number' &&
          !isNaN(this.product.price) &&
          this.product.price < 0
        ) {
          missing.push('giá (không được là số âm)');
        } else {
          missing.push('giá');
        }
      }
      if (!isValidCategory) missing.push('danh mục');
      if (!isValidBrand) missing.push('thương hiệu');
      if (!isValidImage) missing.push('ảnh');

      const msg =
        missing.length > 0
          ? `Thiếu hoặc không hợp lệ: ${missing.join(', ')}.`
          : 'Vui lòng kiểm tra lại form.';

      this.notyf.open({ type: 'info', message: msg });
    }
  }
}
