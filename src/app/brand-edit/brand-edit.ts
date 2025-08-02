import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService, Brand } from '../service';
import { FormsModule, NgForm } from '@angular/forms';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

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

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

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
        error: () => {
          this.errorMessage = 'Không tìm thấy thương hiệu này.';
        },
      });
    } else {
      this.errorMessage = 'ID thương hiệu không hợp lệ.';
    }
  }

  updateBrand(form: NgForm): void {
    if (!this.brand || form.invalid || !this.brandName.trim()) {
      this.notyf.error('Tên thương hiệu không được để trống.');
      return;
    }

    const trimmedName = this.brandName.trim();

    // Kiểm tra trùng tên
    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        const isDuplicate = brands.some(
          (b) =>
            b.name.toLowerCase() === trimmedName.toLowerCase() &&
            b.id !== this.brand!.id
        );

        if (isDuplicate) {
          this.notyf.error('Tên thương hiệu đã tồn tại.');
        } else {
          const updatedBrand: Brand = {
            id: this.brand!.id,
            name: trimmedName,
          };

          this.brandService.updateBrand(updatedBrand.id, updatedBrand).subscribe({
            next: () => {
              this.notyf.success('Cập nhật thương hiệu thành công!');
              this.router.navigate(['/brands']);
            },
            error: () => {
              this.notyf.error('Đã xảy ra lỗi khi cập nhật thương hiệu.');
            },
          });
        }
      },
      error: () => {
        this.notyf.error('Không thể kiểm tra tên thương hiệu.');
      },
    });
  }
}
