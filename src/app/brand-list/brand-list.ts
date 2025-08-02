import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandService, Brand } from '../service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.html',
  styleUrls: ['./brand-list.css'],
})
export class BrandList implements OnInit {
  brands: Brand[] = [];

  private notyf = new Notyf({
    duration: 3000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
  });

  constructor(
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (data) => (this.brands = data),
      error: () => this.notyf.error('Không tải được danh sách thương hiệu.'),
    });
  }

  onDelete(brand: Brand): void {
    Swal.fire({
      title: 'Xác nhận',
      html: `Bạn có chắc chắn muốn xóa thương hiệu <strong>${brand.name}</strong> không?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.brandService.deleteBrand(brand.id.toString()).subscribe({
          next: () => {
            this.notyf.success(`Đã xóa thương hiệu "${brand.name}" thành công!`);
            this.loadBrands();
          },
          error: () => {
            this.notyf.error(`Xóa thương hiệu "${brand.name}" thất bại.`);
          },
        });
      }
    });
  }

  onEdit(id: string): void {
    this.router.navigate(['/brands', id, 'edit']);
  }
}
