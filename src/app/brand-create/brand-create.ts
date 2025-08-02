import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrandService, Brand } from '../service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-brand-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-create.html',
  styleUrls: ['./brand-create.css'],
})
export class BrandCreate {
  brandName = '';

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private brandService: BrandService,
    private router: Router
  ) {}

  handleSubmit(form: NgForm): void {
    if (form.invalid || !this.brandName.trim()) {
      this.notyf.error('Tên thương hiệu là bắt buộc.');
      return;
    }

    const trimmedName = this.brandName.trim();

    // Kiểm tra trùng tên
    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        const isDuplicate = brands.some(
          (b) => b.name.toLowerCase() === trimmedName.toLowerCase()
        );

        if (isDuplicate) {
          this.notyf.error('Tên thương hiệu đã tồn tại.');
          return;
        }

        const newBrand: Omit<Brand, 'id'> = { name: trimmedName };
        this.brandService.createBrand(newBrand).subscribe({
          next: () => {
            this.notyf.success('Tạo thương hiệu thành công!');
            this.router.navigate(['/brands']);
          },
          error: () => {
            this.notyf.error('Đã xảy ra lỗi khi tạo thương hiệu.');
          },
        });
      },
      error: () => {
        this.notyf.error('Không thể kiểm tra tên thương hiệu.');
      },
    });
  }
}
