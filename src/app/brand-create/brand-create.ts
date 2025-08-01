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
    const trimmedName = this.brandName.trim();

    if (!trimmedName) {
      this.errorMessage = 'Tên thương hiệu không được để trống.';
      return;
    }

    // Kiểm tra trùng tên trước khi tạo
    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        const isDuplicate = brands.some(
          (b) => b.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
          this.errorMessage = 'Tên thương hiệu đã tồn tại.';
        } else {
          const newBrand: Omit<Brand, 'id'> = { name: trimmedName };
          this.brandService.createBrand(newBrand).subscribe({
            next: () => {
              alert('Tạo thương hiệu thành công!');
              this.router.navigate(['/brands']);
            },
            error: (err: any) => {
              console.error('Lỗi tạo thương hiệu:', err);
              this.errorMessage = 'Đã xảy ra lỗi khi tạo thương hiệu.';
            },
          });
        }
      },
      error: (err) => {
        console.error('Lỗi kiểm tra thương hiệu:', err);
        this.errorMessage = 'Không thể kiểm tra tên thương hiệu.';
      },
    });
  }
}
