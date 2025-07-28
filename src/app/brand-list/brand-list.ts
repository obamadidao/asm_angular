import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrandService, Brand } from '../service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brand-list.html',
  styleUrls: ['./brand-list.css'],
})
export class BrandList implements OnInit {
  brands: Brand[] = [];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getAllBrands().subscribe({
      next: (data) => (this.brands = data),
      error: (err) => console.error('Lỗi tải danh mục:', err),
    });
  }

  // Sửa id sang string
  deleteBrand(id: string): void {
    if (confirm('Bạn có chắc chắn muốn xóa thương hiệu này không?')) {
      this.brandService.deleteBrand(id).subscribe({
        next: () => {
          alert('Xóa thương hiệu thành công!');
          this.loadBrands(); // Tải lại danh sách sau khi xóa
        },
        error: (err) => {
          console.error('Lỗi khi xóa thương hiệu:', err);
          alert('Xóa thương hiệu thất bại.');
        },
      });
    }
  }
}
