import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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
      error: () => alert('Không thể tải danh sách danh mục'),
    });

    this.http.get<Brand[]>('http://localhost:3000/brands').subscribe({
      next: (res) => (this.brands = res),
      error: () => alert('Không thể tải danh sách thương hiệu'),
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
  console.log('Form valid:', form.valid);
  console.log('Product data before submit:', this.product);

  const isValidName = this.product.name.trim() !== '';
  const isValidPrice = typeof this.product.price === 'number' && !isNaN(this.product.price);
  const isValidCategory = this.product.categoryId !== null && this.product.categoryId !== undefined;
  const isValidBrand = this.product.brandId !== null && this.product.brandId !== undefined;
  const isValidImage = this.product.image.trim() !== '';

  console.log({
    isValidName,
    isValidPrice,
    isValidCategory,
    isValidBrand,
    isValidImage,
  });

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
        alert('Sản phẩm đã được thêm thành công!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Lỗi khi thêm sản phẩm:', err);
        alert('Thêm sản phẩm thất bại.');
      },
    });
  } else {
    alert('Vui lòng điền đầy đủ thông tin, chọn danh mục, thương hiệu và tải ảnh.');
  }
}
}
