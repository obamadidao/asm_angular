import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface Category {
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
    image: '',
  };

  categories: Category[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Category[]>('http://localhost:3000/categories').subscribe({
      next: (res) => (this.categories = res),
      error: () => alert('Không thể tải danh sách danh mục'),
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
  const { name, price, categoryId, image } = this.product;

  const isValidName = name.trim() !== '';
  const isValidPrice = price !== null && !isNaN(Number(price));
  const isValidCategory = categoryId !== null && !isNaN(Number(categoryId));
  const isValidImage = image.trim() !== '';

  if (form.valid && isValidName && isValidPrice && isValidCategory && isValidImage) {
    const newProduct = {
      name: name.trim(),
      price: Number(price),
      categoryId: Number(categoryId),
      image,
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
    alert('Vui lòng điền đầy đủ thông tin, chọn danh mục và tải ảnh.');
  }
}

}
