import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService, Brand } from '../service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-brand-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './brand-edit.html',
  styleUrls: ['./brand-edit.css'],
})
export class BrandEdit implements OnInit {
  brand: Brand | null = null;
  brandName = '';
  errorMessage = '';

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.brandService.getBrandById(id).subscribe({
        next: (data) => {
          this.brand = data;
          this.brandName = data.name;
        },
        error: (err) => {
          console.error('Lỗi tải thương hiệu:', err);
          this.errorMessage = 'Không tìm thấy thương hiệu này.';
        },
      });
    } else {
      this.errorMessage = 'ID thương hiệu không hợp lệ.';
    }
  }

  updateBrand(): void {
    if (!this.brand || !this.brandName.trim()) {
      this.errorMessage = 'Tên thương hiệu không được để trống.';
      return;
    }

    const trimmedName = this.brandName.trim();

    // Kiểm tra trùng tên trước khi cập nhật
    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        const isDuplicate = brands.some(
          (b) =>
            b.name.toLowerCase() === trimmedName.toLowerCase() &&
            b.id !== this.brand!.id
        );

        if (isDuplicate) {
          this.errorMessage = 'Tên thương hiệu đã tồn tại.';
        } else {
          const updatedBrand: Brand = {
            id: this.brand!.id,
            name: trimmedName,
          };

          this.brandService.updateBrand(updatedBrand.id, updatedBrand).subscribe({
            next: () => {
              alert('Cập nhật thương hiệu thành công!');
              this.router.navigate(['/brands']);
            },
            error: (err) => {
              console.error('Lỗi cập nhật thương hiệu:', err);
              this.errorMessage = 'Đã xảy ra lỗi khi cập nhật thương hiệu.';
            },
          });
        }
      },
      error: (err) => {
        console.error('Lỗi kiểm tra tên thương hiệu:', err);
        this.errorMessage = 'Không thể kiểm tra tên thương hiệu.';
      },
    });
  }
}
