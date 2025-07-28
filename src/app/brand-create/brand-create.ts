import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrandService, Brand } from '../service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-create.html',
  styleUrls: ['./brand-create.css'],
})
export class BrandCreate {
  brandName = '';
  errorMessage = '';

  constructor(private brandService: BrandService, private router: Router) {}

createBrand(): void {
  if (!this.brandName.trim()) {
    this.errorMessage = 'Tên danh mục không được để trống.';
    return;
  }

  const newBrand: Omit<Brand, 'id'> = { name: this.brandName.trim() };

  this.brandService.createBrand(newBrand).subscribe({
    next: () => {
      alert('Tạo danh mục thành công!');
      this.router.navigate(['/brands']);
    },
    error: (err: any) => {  // <-- thêm ': any' ở đây
      console.error('Lỗi tạo danh mục:', err);
      this.errorMessage = 'Đã xảy ra lỗi khi tạo danh mục.';
    },
  });
}
}
